/* Browser port of analyzer/analyze.py.
 *
 * Two calls hit api.github.com (repository metadata, then the file tree);
 * every file body comes from raw.githubusercontent.com, which is CORS-open and
 * not subject to the API's hourly limit. So a full analysis costs 2 API
 * requests — 30 repositories an hour with no token at all.
 *
 * The taxonomy is loaded from data/signals.json, generated from
 * analyzer/signals.py, so the browser and the CLI score identically. */

const TEXT_EXT = new Set(["py", "md", "txt", "ipynb", "r", "jl", "js", "mjs", "ts",
  "jsx", "tsx", "svelte", "vue", "html", "htm", "yaml", "yml", "toml", "cfg",
  "json", "nlogo", "java", "go", "rb", "rst"]);
const SKIP_DIR = /(^|\/)(node_modules|\.git|dist|build|vendor|\.venv|venv|site-packages|__pycache__|\.next)\//;
const MANIFESTS = new Set(["requirements.txt", "pyproject.toml", "setup.py",
  "environment.yml", "package.json", "Pipfile", "setup.cfg", "renv.lock", "Project.toml"]);
const CORE = /(agent|persona|character|model|simul|popul|synth|generat|behavio|env|reward|policy|prompt|survey)/i;
const MAX_FILES = 120;
const MAX_BYTES = 1000000;   // single-file HTML apps are routinely >200KB
const MINIFIED_LINE = 5000;  // a line this long means generated, not authored, code
const SKIP_FILE = /(\.min\.(js|css)$|(^|\/)assets\/index-[\w-]{6,}\.|(^|\/)(package-lock\.json|yarn\.lock|poetry\.lock)$)/;
const CONCURRENCY = 8;

let TAXONOMY = null;

export function parseRepoUrl(input) {
  const s = input.trim();
  let m = s.match(/github\.com[/:]([^/]+)\/([^/#?]+?)(?:\.git)?\/?$/);
  if (!m) m = s.match(/^([\w.-]+)\/([\w.-]+)$/);
  if (!m) throw new Error("Not a GitHub repository URL");
  return { owner: m[1], name: m[2] };
}

export function getToken() {
  try { return localStorage.getItem("abo-token") || ""; } catch { return ""; }
}
export function setToken(t) {
  try { t ? localStorage.setItem("abo-token", t) : localStorage.removeItem("abo-token"); } catch {}
}

async function api(path) {
  const headers = { Accept: "application/vnd.github+json" };
  const tok = getToken();
  if (tok) headers.Authorization = `Bearer ${tok}`;
  const res = await fetch(`https://api.github.com${path}`, { headers });
  if (res.status === 404) throw new Error("Repository not found (or private, and no token set).");
  if (res.status === 403 || res.status === 429) {
    throw new Error("GitHub rate limit reached. Add a personal access token below, or wait an hour.");
  }
  if (!res.ok) throw new Error(`GitHub returned ${res.status}`);
  return res.json();
}

async function taxonomy() {
  if (!TAXONOMY) {
    const raw = await (await fetch("data/signals.json")).json();
    TAXONOMY = {
      axes: raw.axes,
      signals: raw.signals.map((s) => ({ ...s, re: new RegExp(s.pattern, "im") })),
      demographics: raw.demographics.map((t) => ({
        term: t, re: new RegExp(`\\b${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}s?\\b`, "i"),
      })),
      modelRe: new RegExp(raw.model_patterns.map((p) => `(${p})`).join("|"), "gi"),
    };
  }
  return TAXONOMY;
}

/* Dependency names declared in a manifest. */
function depsFrom(name, text) {
  const found = new Set();
  if (name === "package.json") {
    try {
      const pkg = JSON.parse(text);
      for (const k of ["dependencies", "devDependencies", "peerDependencies"]) {
        Object.keys(pkg[k] || {}).forEach((d) => found.add(d.toLowerCase()));
      }
    } catch {}
    return found;
  }
  for (let line of text.split("\n")) {
    line = line.trim().replace(/^["',]+|["',]+$/g, "");
    if (!line || line.startsWith("#")) continue;
    const m = line.match(/^-?\s*([A-Za-z][\w.-]{1,60})\s*(?:[=<>!~[;].*)?$/);
    if (m) found.add(m[1].toLowerCase());
  }
  return found;
}

/* Run tasks with a bounded number in flight. */
async function pool(items, worker) {
  const out = [];
  let i = 0;
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
    while (i < items.length) {
      const idx = i++;
      out[idx] = await worker(items[idx], idx);
    }
  }));
  return out;
}

export async function analyzeRepo(input, onProgress = () => {}) {
  const tax = await taxonomy();
  const { owner, name } = parseRepoUrl(input);

  onProgress(`Reading ${owner}/${name}…`);
  const meta = await api(`/repos/${owner}/${name}`);
  const branch = meta.default_branch || "main";

  onProgress("Fetching the file tree…");
  const tree = await api(`/repos/${owner}/${name}/git/trees/${branch}?recursive=1`);
  const blobsList = (tree.tree || []).filter((e) => e.type === "blob" && !SKIP_DIR.test(`/${e.path}/`));
  const paths = blobsList.map((e) => e.path);
  const sizes = Object.fromEntries(blobsList.map((e) => [e.path, e.size || 0]));

  const readable = paths
    .filter((p) => TEXT_EXT.has((p.split(".").pop() || "").toLowerCase())
      && sizes[p] <= MAX_BYTES && !SKIP_FILE.test(p))
    .map((p) => {
      const base = p.split("/").pop();
      const tier = MANIFESTS.has(base) ? 0 : /\.(md|rst)$/i.test(p) ? 1 : 2;
      return { p, key: [tier, CORE.test(p) ? 0 : 1, -sizes[p]] };
    })
    .sort((a, b) => a.key[0] - b.key[0] || a.key[1] - b.key[1] || a.key[2] - b.key[2])
    .slice(0, MAX_FILES * 2)   // over-fetch: generated blobs are dropped below,
    .map((x) => x.p);          // and must not consume the quota of kept files

  onProgress(`Reading ${readable.length} of ${paths.length} files…`);
  let done = 0;
  const fetched = await pool(readable, async (p) => {
    let text = null;
    try {
      const res = await fetch(
        `https://raw.githubusercontent.com/${owner}/${name}/${branch}/${p.split("/").map(encodeURIComponent).join("/")}`
      );
      if (res.ok) text = await res.text();
    } catch {}
    if (++done % 20 === 0) onProgress(`Read ${done}/${readable.length} files…`);
    return { p, text };
  });

  const blobs = new Map();
  const deps = new Set();
  for (const { p, text } of fetched) {
    if (blobs.size >= MAX_FILES) break;
    if (text == null) continue;
    if (text.split("\n").reduce((m, ln) => Math.max(m, ln.length), 0) > MINIFIED_LINE) continue;
    blobs.set(p, text);
    const base = p.split("/").pop();
    if (MANIFESTS.has(base)) depsFrom(base, text).forEach((d) => deps.add(d));
  }

  onProgress("Scoring signals…");
  const hits = Object.fromEntries(Object.keys(tax.axes).map((a) => [a, []]));
  for (const sig of tax.signals) {
    let where = null, evidence = null;
    if (sig.kind === "dep") {
      for (const d of deps) if (sig.re.test(d)) { where = "dependencies"; evidence = d; break; }
    } else if (sig.kind === "path") {
      for (const p of paths) if (sig.re.test(p)) { where = p; evidence = p; break; }
    } else {
      for (const [p, t] of blobs) {
        const m = sig.re.exec(t);
        if (m) {
          const line = t.slice(0, m.index).split("\n").length;
          where = `${p}:${line}`;
          evidence = t.slice(Math.max(0, m.index - 60), m.index + m[0].length + 60).trim().replace(/\n/g, " ");
          break;
        }
      }
    }
    if (where) {
      hits[sig.axis].push({ signal: sig.key, label: sig.label, weight: sig.weight,
        where, evidence: (evidence || "").slice(0, 220) });
    }
  }

  const scores = {};
  for (const axis of Object.keys(tax.axes)) {
    const possible = tax.signals.filter((s) => s.axis === axis).reduce((t, s) => t + s.weight, 0);
    const earned = hits[axis].reduce((t, h) => t + h.weight, 0);
    scores[axis] = possible ? Math.round((100 * earned) / possible) : 0;
  }

  const core = ["abm", "synth", "llm_behavior"];
  const coreScores = core.map((a) => scores[a]);
  const relevance = Math.round(
    0.6 * Math.max(...coreScores) + 0.4 * (coreScores.reduce((a, b) => a + b, 0) / 3)
  );
  const primary = core.reduce((best, a) => (scores[a] > scores[best] ? a : best), core[0]);

  const dimensions = {};
  for (const { term, re } of tax.demographics) {
    const files = [...blobs.keys()].filter((p) => re.test(blobs.get(p)));
    if (files.length) dimensions[term] = { count: files.length, files: files.slice(0, 5) };
  }
  const sortedDims = Object.fromEntries(
    Object.entries(dimensions).sort((a, b) => b[1].count - a[1].count)
  );

  const modelCounts = new Map();
  for (const t of blobs.values()) {
    for (const m of t.matchAll(tax.modelRe)) {
      const k = m[0].toLowerCase().replace(/^[.-]+|[.-]+$/g, "");
      modelCounts.set(k, (modelCounts.get(k) || 0) + 1);
    }
  }
  const models = [...modelCounts].sort((a, b) => b[1] - a[1]).slice(0, 20)
    .map(([model, mentions]) => ({ model, mentions }));

  return {
    repo: `${owner}/${name}`,
    url: meta.html_url,
    description: meta.description || "",
    stars: meta.stargazers_count || 0,
    language: meta.language,
    license: meta.license ? meta.license.spdx_id : null,
    pushed_at: meta.pushed_at,
    analyzed_at: new Date().toISOString().slice(0, 19) + "+00:00",
    files_total: paths.length,
    files_eligible: readable.length,
    files_read: blobs.size,
    dependencies: [...deps].sort().slice(0, 200),
    scores,
    primary_axis: primary,
    relevance,
    signals: hits,
    dimensions: sortedDims,
    models,
    source: "browser",
  };
}
