#!/usr/bin/env python3
"""Collect data/reports/*.json into docs/data/index.json for the dashboard."""

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(Path(__file__).resolve().parent))
from signals import AXES, SIGNALS, DEMOGRAPHIC_TERMS, MODEL_PATTERNS  # noqa: E402
REPORTS = ROOT / "data" / "reports"
OUT = ROOT / "docs" / "data"


def export_signals():
    """Publish the taxonomy so the browser analyzer shares one source of truth."""
    (OUT / "signals.json").write_text(json.dumps({
        "axes": AXES,
        "signals": [{"axis": a, "key": k, "kind": kind, "pattern": pat,
                     "weight": w, "label": lab}
                    for a, k, kind, pat, w, lab in SIGNALS],
        "demographics": DEMOGRAPHIC_TERMS,
        "model_patterns": MODEL_PATTERNS,
    }, indent=1) + "\n")


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    export_signals()
    reports = []
    for f in sorted(REPORTS.glob("*.json")):
        r = json.loads(f.read_text())
        reports.append(r)
        (OUT / f.name).write_text(json.dumps(r, separators=(",", ":")))
    index = [{k: r[k] for k in ("repo", "url", "description", "stars", "language",
                                "scores", "primary_axis", "relevance", "analyzed_at")}
             | {"dimensions": list(r["dimensions"])[:12],
                "models": [m["model"] for m in r["models"][:8]],
                "file": r["repo"].replace("/", "__") + ".json"}
             for r in reports]
    index.sort(key=lambda r: -r["relevance"])
    (OUT / "index.json").write_text(json.dumps(index, indent=1) + "\n")
    print(f"indexed {len(index)} report(s) → docs/data/index.json")


if __name__ == "__main__":
    main()
