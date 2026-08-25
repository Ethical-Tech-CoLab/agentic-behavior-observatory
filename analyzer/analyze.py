#!/usr/bin/env python3
"""Analyse a GitHub repository for agentic-behaviour research signals.

    python analyzer/analyze.py https://github.com/owner/repo

Reads the repository through the public GitHub API (no clone), scores it on
five axes, extracts the demographic dimensions and model versions it works
with, and writes a JSON report plus a Markdown brief. The dashboard in docs/
reads those JSON reports.

Authentication is optional but strongly recommended (60 vs 5000 requests/hour):
set GITHUB_TOKEN, or have the `gh` CLI logged in and the token is picked up.
"""

import argparse
import base64
import json
import os
import re
import subprocess
import sys
import urllib.error
import urllib.parse
import urllib.request
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from signals import AXES, SIGNALS, DEMOGRAPHIC_TERMS, MODEL_RE  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
API = "https://api.github.com"

# Files worth reading in full. Everything else is judged by its path alone.
TEXT_EXT = {".py", ".md", ".txt", ".ipynb", ".r", ".jl", ".js", ".ts", ".yaml",
            ".yml", ".toml", ".cfg", ".json", ".nlogo", ".java", ".rst"}
SKIP_DIR = re.compile(r"(^|/)(node_modules|\.git|dist|build|vendor|\.venv|venv|"
                      r"site-packages|__pycache__|\.next)/")
MAX_FILES = 120          # files fetched for content
MAX_BYTES = 200_000      # per file
MANIFESTS = ("requirements.txt", "pyproject.toml", "setup.py", "environment.yml",
             "package.json", "Pipfile", "setup.cfg", "renv.lock", "Project.toml")


# --- github plumbing ----------------------------------------------------

def token():
    tok = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
    if tok:
        return tok
    try:
        out = subprocess.run(["gh", "auth", "token"], capture_output=True,
                             text=True, timeout=10)
        if out.returncode == 0:
            return out.stdout.strip()
    except (OSError, subprocess.SubprocessError):
        pass
    return None


def api(path, tok):
    req = urllib.request.Request(f"{API}{path}",
                                 headers={"Accept": "application/vnd.github+json",
                                          "User-Agent": "etc-rl-analyzer"})
    if tok:
        req.add_header("Authorization", f"Bearer {tok}")
    with urllib.request.urlopen(req, timeout=45) as r:
        return json.load(r)


def parse_url(url):
    m = re.search(r"github\.com[/:]([^/]+)/([^/#?]+?)(?:\.git)?/?$", url.strip())
    if not m:
        m = re.match(r"^([\w.\-]+)/([\w.\-]+)$", url.strip())
    if not m:
        raise SystemExit(f"Not a GitHub repository URL: {url}")
    return m.group(1), m.group(2)


# --- dependency extraction ---------------------------------------------

def deps_from(name, text):
    """Return declared dependency names found in a manifest."""
    found = set()
    if name == "package.json":
        try:
            pkg = json.loads(text)
        except json.JSONDecodeError:
            return found
        for key in ("dependencies", "devDependencies", "peerDependencies"):
            found.update(pkg.get(key, {}))
        return found
    if name in ("requirements.txt", "Pipfile", "setup.cfg", "environment.yml",
                "pyproject.toml", "setup.py", "renv.lock", "Project.toml"):
        for line in text.splitlines():
            line = line.strip().strip('",\'')
            if not line or line.startswith("#"):
                continue
            m = re.match(r"^-?\s*([A-Za-z][\w.\-]{1,60})\s*(?:[=<>!~\[;].*)?$", line)
            if m:
                found.add(m.group(1).lower())
    return found


# --- scoring ------------------------------------------------------------

def score(paths, blobs, deps):
    """Fire signals and return per-axis results with evidence."""
    corpus = [(p, t) for p, t in blobs.items()]
    hits = {ax: [] for ax in AXES}
    for axis, key, kind, pattern, weight, label in SIGNALS:
        rx = re.compile(pattern, re.I | re.M)
        where, sample = None, None
        if kind == "dep":
            for d in deps:
                if rx.search(d):
                    where, sample = "dependencies", d
                    break
        elif kind == "path":
            for p in paths:
                if rx.search(p):
                    where, sample = p, p
                    break
        else:  # text
            for p, t in corpus:
                m = rx.search(t)
                if m:
                    line = t[:m.start()].count("\n") + 1
                    where = f"{p}:{line}"
                    sample = t[max(0, m.start() - 60):m.end() + 60].strip().replace("\n", " ")
                    break
        if where:
            hits[axis].append({"signal": key, "label": label, "weight": weight,
                               "where": where, "evidence": sample[:220]})

    scores = {}
    for axis in AXES:
        possible = sum(w for a, _, _, _, w, _ in SIGNALS if a == axis)
        earned = sum(h["weight"] for h in hits[axis])
        scores[axis] = round(100 * earned / possible) if possible else 0
    return scores, hits


def extract_dimensions(blobs):
    """Demographic attributes the repo appears to model, with where they occur."""
    found = {}
    for term in DEMOGRAPHIC_TERMS:
        rx = re.compile(rf"\b{re.escape(term)}s?\b", re.I)
        places = [p for p, t in blobs.items() if rx.search(t)]
        if places:
            found[term] = {"count": len(places), "files": sorted(places)[:5]}
    return dict(sorted(found.items(), key=lambda kv: -kv[1]["count"]))


def extract_models(blobs):
    counts = Counter()
    for text in blobs.values():
        for m in MODEL_RE.finditer(text):
            counts[m.group(0).lower().strip(".-")] += 1
    return [{"model": k, "mentions": v} for k, v in counts.most_common(20)]


# --- report -------------------------------------------------------------

def analyse(url, tok):
    owner, name = parse_url(url)
    meta = api(f"/repos/{owner}/{name}", tok)
    branch = meta.get("default_branch", "main")
    tree = api(f"/repos/{owner}/{name}/git/trees/{branch}?recursive=1", tok)
    if tree.get("truncated"):
        print("  ! tree truncated by GitHub; analysis covers the first ~100k entries",
              file=sys.stderr)

    paths = [e["path"] for e in tree.get("tree", []) if e["type"] == "blob"
             and not SKIP_DIR.search("/" + e["path"] + "/")]
    sizes = {e["path"]: e.get("size", 0) for e in tree.get("tree", [])}

    # Manifests first, then prose, then source. Within the source tier, prefer
    # paths whose names suggest the modelling core, then larger files over
    # near-empty ones — the opposite of alphabetical, which reads __init__.py.
    core = re.compile(r"(agent|persona|character|model|simul|popul|synth|"
                      r"generat|behavio|env|reward|policy|prompt|survey)", re.I)
    def rank(p):
        base = os.path.basename(p)
        tier = 0 if base in MANIFESTS else 1 if p.lower().endswith((".md", ".rst")) else 2
        return (tier, 0 if core.search(p) else 1, -sizes.get(p, 0))

    readable = [p for p in paths if os.path.splitext(p)[1].lower() in TEXT_EXT
                and sizes.get(p, 0) <= MAX_BYTES]
    readable.sort(key=rank)

    blobs, deps = {}, set()
    for p in readable[:MAX_FILES]:
        try:
            obj = api(f"/repos/{owner}/{name}/contents/{urllib.parse.quote(p)}?ref={branch}", tok)
            text = base64.b64decode(obj.get("content", "")).decode("utf-8", "replace")
        except (urllib.error.HTTPError, urllib.error.URLError, ValueError):
            continue
        blobs[p] = text
        if os.path.basename(p) in MANIFESTS:
            deps |= deps_from(os.path.basename(p), text)

    scores, hits = score(paths, blobs, deps)
    # The headline axis is the strongest *subject* axis; RL and evaluation
    # describe how the work is done, not what it is about.
    primary = max(("abm", "synth", "llm_behaviour"), key=lambda a: scores[a])
    # Relevance leans on the strongest of the three core axes — a repo may be
    # purely an ABM or purely a synthesiser and still be squarely in scope —
    # while still rewarding work that spans them.
    core_scores = [scores[a] for a in ("abm", "synth", "llm_behaviour")]
    overall = round(0.6 * max(core_scores) + 0.4 * (sum(core_scores) / 3))

    return {
        "repo": f"{owner}/{name}",
        "url": meta.get("html_url", url),
        "description": meta.get("description") or "",
        "stars": meta.get("stargazers_count", 0),
        "language": meta.get("language"),
        "license": (meta.get("license") or {}).get("spdx_id"),
        "pushed_at": meta.get("pushed_at"),
        "analysed_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "files_total": len(paths),
        "files_read": len(blobs),
        "dependencies": sorted(deps)[:200],
        "scores": scores,
        "primary_axis": primary,
        "relevance": overall,
        "signals": hits,
        "dimensions": extract_dimensions(blobs),
        "models": extract_models(blobs),
    }


def to_markdown(r):
    bar = lambda n: "█" * round(n / 10) + "·" * (10 - round(n / 10))  # noqa: E731
    out = [f"# {r['repo']}", ""]
    if r["description"]:
        out += [f"> {r['description']}", ""]
    out += [f"[{r['url']}]({r['url']}) · ★{r['stars']} · {r['language'] or 'n/a'}"
            f" · analysed {r['analysed_at'][:10]}", "",
            "## Axis scores", ""]
    for axis, label in AXES.items():
        out.append(f"- **{label}** `{bar(r['scores'][axis])}` {r['scores'][axis]}/100")
    out += ["", f"Agentic-behaviour relevance: **{r['relevance']}/100** "
            f"(primary axis: {AXES[r['primary_axis']]})", "", "## Evidence", ""]
    for axis, label in AXES.items():
        hs = r["signals"][axis]
        if not hs:
            continue
        out += [f"### {label}", ""]
        for h in hs:
            out.append(f"- **{h['label']}** — `{h['where']}`")
        out.append("")
    if r["dimensions"]:
        out += ["## Population dimensions modelled", "",
                ", ".join(f"`{k}`" for k in list(r["dimensions"])[:20]), ""]
    if r["models"]:
        out += ["## Models referenced", ""]
        out += [f"- `{m['model']}` ({m['mentions']} mentions)" for m in r["models"]]
        out.append("")
    return "\n".join(out)


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("urls", nargs="+", help="GitHub repository URLs or owner/name")
    ap.add_argument("--out", default=str(ROOT / "data" / "reports"))
    ap.add_argument("--no-index", action="store_true",
                    help="skip rebuilding docs/data/index.json")
    args = ap.parse_args()

    tok = token()
    if not tok:
        print("! no GitHub token found — rate limited to 60 requests/hour",
              file=sys.stderr)
    outdir = Path(args.out)
    outdir.mkdir(parents=True, exist_ok=True)

    for url in args.urls:
        print(f"→ {url}")
        try:
            report = analyse(url, tok)
        except urllib.error.HTTPError as e:
            print(f"  ! GitHub returned {e.code} — skipped", file=sys.stderr)
            continue
        slug = report["repo"].replace("/", "__")
        (outdir / f"{slug}.json").write_text(json.dumps(report, indent=2) + "\n")
        (outdir / f"{slug}.md").write_text(to_markdown(report))
        print(f"  relevance {report['relevance']}/100 · "
              f"primary {AXES[report['primary_axis']]} · "
              f"{report['files_read']}/{report['files_total']} files read")

    if not args.no_index:
        subprocess.run([sys.executable, str(Path(__file__).parent / "build_index.py")],
                       check=False)


if __name__ == "__main__":
    main()
