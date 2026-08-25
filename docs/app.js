const AXES = {
  abm: ["Agent-based sim", "var(--abm)"],
  synth: ["Synthetic data", "var(--synth)"],
  llm_behaviour: ["LLM behaviour", "var(--llm)"],
  rl: ["Reinforcement", "var(--rl)"],
  eval: ["Evaluation", "var(--eval)"],
};

const $ = (s) => document.querySelector(s);
const state = { data: [], q: "", axis: null, sort: "relevance" };

// --- theme --------------------------------------------------------------
try {
  const saved = localStorage.getItem("abo-theme");
  if (saved) document.documentElement.dataset.theme = saved;
} catch {}
$("#theme").onclick = () => {
  const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem("abo-theme", next); } catch {}
};

// --- analyse box --------------------------------------------------------
$("#go").onclick = () => {
  const v = $("#url").value.trim();
  const cmd = $("#cmd");
  if (!/github\.com\/[^/]+\/[^/]+/.test(v) && !/^[\w.-]+\/[\w.-]+$/.test(v)) {
    cmd.hidden = false;
    cmd.textContent = "Enter a GitHub repository URL, e.g. https://github.com/owner/repo";
    return;
  }
  cmd.hidden = false;
  cmd.textContent = `python analyzer/analyze.py ${v}`;
};
$("#url").addEventListener("keydown", (e) => { if (e.key === "Enter") $("#go").click(); });

// --- render -------------------------------------------------------------
const bar = (label, value, color) => `
  <div class="axis"><span>${label}</span>
    <div class="track"><div class="fill" style="width:${value}%;background:${color}"></div></div>
    <b>${value}</b></div>`;

function cardHTML(r, i) {
  return `<article class="card" data-i="${i}" tabindex="0">
    <header><h3>${r.repo}</h3>
      <span class="score" style="color:${AXES[r.primary_axis][1]}">${r.relevance}</span></header>
    <p>${r.description || "No description."}</p>
    <div class="axes">${Object.keys(AXES).map((a) =>
      bar(AXES[a][0], r.scores[a], AXES[a][1])).join("")}</div>
    <div class="tags">${[...(r.dimensions || []).slice(0, 4), ...(r.models || []).slice(0, 2)]
      .map((t) => `<span class="tag">${t}</span>`).join("")}</div>
  </article>`;
}

function counts(field) {
  const c = new Map();
  for (const r of state.data) for (const v of r[field] || []) c.set(v, (c.get(v) || 0) + 1);
  return [...c].sort((a, b) => b[1] - a[1]).slice(0, 12);
}

function bars(el, rows, color) {
  const max = rows.length ? rows[0][1] : 1;
  el.innerHTML = rows.length
    ? rows.map(([k, n]) => `<div class="bar"><span title="${k}">${k}</span>
        <div class="track"><div class="fill" style="width:${(n / max) * 100}%;background:${color}"></div></div>
        <b>${n}</b></div>`).join("")
    : `<p class="hint">No data yet.</p>`;
}

function render() {
  const q = state.q.toLowerCase();
  let rows = state.data.filter((r) => {
    const hay = [r.repo, r.description, ...(r.dimensions || []), ...(r.models || [])]
      .join(" ").toLowerCase();
    return (!q || hay.includes(q)) && (!state.axis || r.primary_axis === state.axis);
  });
  const s = state.sort;
  rows.sort((a, b) => (s === "repo" ? a.repo.localeCompare(b.repo)
    : s === "analysed_at" ? b.analysed_at.localeCompare(a.analysed_at)
    : (b[s] || 0) - (a[s] || 0)));

  window._rows = rows;
  $("#grid").innerHTML = rows.map(cardHTML).join("");
  $("#empty").hidden = rows.length > 0;
  $("#empty").textContent = state.data.length
    ? "Nothing matches that filter."
    : "No reports yet — run analyzer/analyze.py on a repository, then analyzer/build_index.py.";

  const avg = (a) => state.data.length
    ? Math.round(state.data.reduce((t, r) => t + r.scores[a], 0) / state.data.length) : 0;
  $("#stats").innerHTML = [
    ["Repositories", state.data.length],
    ["Median relevance", state.data.length
      ? [...state.data].sort((a, b) => a.relevance - b.relevance)[Math.floor(state.data.length / 2)].relevance : 0],
    ["Dimensions seen", new Set(state.data.flatMap((r) => r.dimensions || [])).size],
    ["Model versions", new Set(state.data.flatMap((r) => r.models || [])).size],
    ["Avg. evaluation", avg("eval")],
  ].map(([k, v]) => `<div class="stat"><b>${v}</b><span>${k}</span></div>`).join("");

  bars($("#dims"), counts("dimensions"), "var(--synth)");
  bars($("#models"), counts("models"), "var(--llm)");
}

// --- detail sheet -------------------------------------------------------
async function openSheet(r) {
  const sheet = $("#sheet"), inner = sheet.firstElementChild;
  sheet.hidden = false;
  inner.innerHTML = `<p class="hint">Loading ${r.repo}…</p>`;
  let full;
  try { full = await (await fetch(`data/${r.file}`)).json(); }
  catch { inner.innerHTML = `<p class="hint">Could not load the full report.</p>`; return; }

  const evidence = Object.entries(AXES).map(([a, [label, color]]) => {
    const hits = full.signals[a] || [];
    if (!hits.length) return "";
    return `<h3 style="color:${color};margin-top:20px">${label} — ${full.scores[a]}/100</h3>` +
      hits.map((h) => `<div class="ev">${h.label}<code>${h.where}</code></div>`).join("");
  }).join("");

  inner.innerHTML = `
    <button class="ghost" id="close" style="float:right">Close</button>
    <h2>${full.repo}</h2>
    <p class="hint">${full.description || ""}</p>
    <p class="hint"><a href="${full.url}" target="_blank" rel="noopener">${full.url}</a> ·
      ★${full.stars} · ${full.language || "n/a"} · ${full.license || "no licence"} ·
      ${full.files_read}/${full.files_total} files read · analysed ${full.analysed_at.slice(0, 10)}</p>
    <div class="axes" style="margin:18px 0">${Object.keys(AXES).map((a) =>
      bar(AXES[a][0], full.scores[a], AXES[a][1])).join("")}</div>
    <h3>Population dimensions</h3>
    <div class="tags">${Object.entries(full.dimensions).map(([k, v]) =>
      `<span class="tag" title="${v.files.join(', ')}">${k} · ${v.count}</span>`).join("") ||
      '<span class="hint">none detected</span>'}</div>
    <h3 style="margin-top:18px">Models referenced</h3>
    <div class="tags">${full.models.map((m) =>
      `<span class="tag">${m.model} · ${m.mentions}</span>`).join("") ||
      '<span class="hint">none detected</span>'}</div>
    <h3 style="margin-top:18px">Evidence</h3>${evidence || '<p class="hint">No signals fired.</p>'}`;
  $("#close").onclick = () => { sheet.hidden = true; };
}

$("#sheet").onclick = (e) => { if (e.target.id === "sheet") e.target.hidden = true; };
document.addEventListener("keydown", (e) => { if (e.key === "Escape") $("#sheet").hidden = true; });
$("#grid").addEventListener("click", (e) => {
  const c = e.target.closest(".card"); if (c) openSheet(window._rows[+c.dataset.i]);
});
$("#grid").addEventListener("keydown", (e) => {
  const c = e.target.closest(".card");
  if (c && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openSheet(window._rows[+c.dataset.i]); }
});

// --- controls -----------------------------------------------------------
$("#axisChips").innerHTML = Object.entries(AXES).map(([a, [label, color]]) =>
  `<button class="chip" data-axis="${a}" aria-pressed="false" style="color:${color}">${label}</button>`).join("");
$("#axisChips").onclick = (e) => {
  const b = e.target.closest(".chip"); if (!b) return;
  state.axis = state.axis === b.dataset.axis ? null : b.dataset.axis;
  [...$("#axisChips").children].forEach((c) =>
    c.setAttribute("aria-pressed", String(c.dataset.axis === state.axis)));
  render();
};
$("#q").oninput = (e) => { state.q = e.target.value; render(); };
$("#sort").onchange = (e) => { state.sort = e.target.value; render(); };

fetch("data/index.json")
  .then((r) => (r.ok ? r.json() : []))
  .then((d) => { state.data = d; render(); })
  .catch(() => render());
