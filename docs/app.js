import { analyzeRepo, parseRepoUrl, getToken, setToken } from "./analyzer.js";

const AXES = {
  abm: ["Agent-based sim", "var(--abm)"],
  synth: ["Synthetic data", "var(--synth)"],
  llm_behavior: ["LLM behavior", "var(--llm)"],
  rl: ["Reinforcement", "var(--rl)"],
  eval: ["Evaluation", "var(--eval)"],
};
const LIVE_KEY = "abo-live-reports";

const $ = (s) => document.querySelector(s);
const state = { corpus: [], live: [], q: "", axis: null, etc: false, sort: "relevance" };
const ETC = "Ethical-Tech-CoLab/";
const fullReports = new Map();   // repo -> full report, for the detail sheet

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

// --- tabs ---------------------------------------------------------------
function showView(name, scroll = true) {
  let matched = false;
  for (const tab of document.querySelectorAll(".tab")) {
    const on = tab.dataset.view === name;
    matched = matched || on;
    tab.setAttribute("aria-selected", String(on));
    $(`#view-${tab.dataset.view}`).hidden = !on;
  }
  if (!matched) return showView("observatory", false);
  if (location.hash.slice(1) !== name) history.replaceState(null, "", `#${name}`);
  if (scroll) window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelector(".tabs").onclick = (e) => {
  const t = e.target.closest(".tab");
  if (t) showView(t.dataset.view);
};
window.addEventListener("hashchange", () => showView(location.hash.slice(1) || "observatory"));
showView(location.hash.slice(1) || "observatory", false);

// --- live analysis ------------------------------------------------------
function loadLive() {
  try {
    const saved = JSON.parse(localStorage.getItem(LIVE_KEY) || "[]");
    state.live = saved;
    for (const r of saved) fullReports.set(r.repo, r);
  } catch { state.live = []; }
}
function saveLive() {
  try { localStorage.setItem(LIVE_KEY, JSON.stringify(state.live.slice(0, 25))); } catch {}
}

function status(msg, kind = "work") {
  const el = $("#status");
  el.hidden = false;
  el.className = `status ${kind}`;
  el.textContent = msg;
}

async function runAnalysis() {
  const value = $("#url").value.trim();
  if (!value) return;
  try { parseRepoUrl(value); }
  catch { return status("That is not a GitHub repository URL. Try https://github.com/owner/repo", "bad"); }

  const btn = $("#go");
  btn.disabled = true;
  btn.textContent = "Analyzing…";
  try {
    const report = await analyzeRepo(value, (m) => status(m));
    fullReports.set(report.repo, report);
    state.live = [report, ...state.live.filter((r) => r.repo !== report.repo)];
    saveLive();
    render();
    status(`${report.repo} — relevance ${report.relevance}/100, primary axis ` +
           `${AXES[report.primary_axis][0]}, ${report.files_read} of ${report.files_total} files read.`, "good");
    openSheet(report.repo);
  } catch (err) {
    status(err.message || String(err), "bad");
  } finally {
    btn.disabled = false;
    btn.textContent = "Analyze";
  }
}

$("#go").onclick = runAnalysis;
$("#url").addEventListener("keydown", (e) => { if (e.key === "Enter") runAnalysis(); });
$("#token").value = getToken();
$("#saveTok").onclick = () => {
  setToken($("#token").value.trim());
  status($("#token").value.trim() ? "Token saved in this browser." : "Token cleared.", "good");
};

// --- render -------------------------------------------------------------
const bar = (label, value, color) => `
  <div class="axis"><span>${label}</span>
    <div class="track"><div class="fill" style="width:${value}%;background:${color}"></div></div>
    <b>${value}</b></div>`;

const dimsOf = (r) => (Array.isArray(r.dimensions) ? r.dimensions : Object.keys(r.dimensions || {}));
const modelsOf = (r) => (r.models || []).map((m) => (typeof m === "string" ? m : m.model));

function cardHTML(r, i) {
  return `<article class="card" data-i="${i}" tabindex="0">
    <header><h3>${r.repo.startsWith(ETC) ? `<span class="badge">ETC</span> ${r.repo.slice(ETC.length)}` : r.repo}${
      r.source === "browser" ? ' <span class="live">live</span>' : ""}</h3>
      <span class="score" style="color:${AXES[r.primary_axis][1]}">${r.relevance}</span></header>
    <p>${r.description || "No description."}</p>
    <div class="axes">${Object.keys(AXES).map((a) =>
      bar(AXES[a][0], r.scores[a], AXES[a][1])).join("")}</div>
    <div class="tags">${[...dimsOf(r).slice(0, 4), ...modelsOf(r).slice(0, 2)]
      .map((t) => `<span class="tag">${t}</span>`).join("")}</div>
  </article>`;
}

function counts(rows, pick) {
  const c = new Map();
  for (const r of rows) for (const v of pick(r)) c.set(v, (c.get(v) || 0) + 1);
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
  const all = [...state.live, ...state.corpus.filter((c) => !state.live.some((l) => l.repo === c.repo))];
  const q = state.q.toLowerCase();
  const rows = all.filter((r) => {
    const hay = [r.repo, r.description, ...dimsOf(r), ...modelsOf(r)].join(" ").toLowerCase();
    return (!q || hay.includes(q)) && (!state.axis || r.primary_axis === state.axis)
      && (!state.etc || r.repo.startsWith(ETC));
  });
  const s = state.sort;
  rows.sort((a, b) => (s === "repo" ? a.repo.localeCompare(b.repo)
    : s === "analyzed_at" ? String(b.analyzed_at).localeCompare(String(a.analyzed_at))
    : (b[s] || 0) - (a[s] || 0)));

  window._rows = rows;
  $("#grid").innerHTML = rows.map(cardHTML).join("");
  $("#empty").hidden = rows.length > 0;
  $("#empty").textContent = all.length
    ? "Nothing matches that filter."
    : "No reports yet — paste a repository URL above to run one.";

  const avg = (a) => (all.length ? Math.round(all.reduce((t, r) => t + r.scores[a], 0) / all.length) : 0);
  const median = all.length
    ? [...all].sort((a, b) => a.relevance - b.relevance)[Math.floor(all.length / 2)].relevance : 0;
  $("#stats").innerHTML = [
    ["Repositories", all.length],
    ["ETC projects", all.filter((r) => r.repo.startsWith(ETC)).length],
    ["Median relevance", median],
    ["Dimensions seen", new Set(all.flatMap(dimsOf)).size],
    ["Model versions", new Set(all.flatMap(modelsOf)).size],
    ["Avg. evaluation", avg("eval")],
  ].map(([k, v]) => `<div class="stat"><b>${v}</b><span>${k}</span></div>`).join("");

  bars($("#dims"), counts(all, dimsOf), "var(--synth)");
  bars($("#models"), counts(all, modelsOf), "var(--llm)");
}

// --- detail sheet -------------------------------------------------------
async function openSheet(repo) {
  const sheet = $("#sheet"), inner = sheet.firstElementChild;
  sheet.hidden = false;
  inner.innerHTML = `<p class="hint">Loading ${repo}…</p>`;

  let full = fullReports.get(repo);
  if (!full) {
    try {
      full = await (await fetch(`data/${repo.replace("/", "__")}.json`)).json();
      fullReports.set(repo, full);
    } catch {
      inner.innerHTML = `<p class="hint">Could not load the full report for ${repo}.</p>`;
      return;
    }
  }

  const evidence = Object.entries(AXES).map(([a, [label, color]]) => {
    const hits = full.signals[a] || [];
    if (!hits.length) return "";
    return `<h3 style="color:${color};margin-top:20px">${label} — ${full.scores[a]}/100</h3>` +
      hits.map((h) => `<div class="ev">${h.label}<code>${h.where}</code></div>`).join("");
  }).join("");

  inner.innerHTML = `
    <div class="sheet-bar">
      <button class="ghost" id="dl" type="button">Download JSON</button>
      <button class="ghost" id="close" type="button">Close</button>
    </div>
    <h2>${full.repo}${full.source === "browser" ? ' <span class="live">live</span>' : ""}</h2>
    <p class="hint">${full.description || ""}</p>
    <p class="hint"><a href="${full.url}" target="_blank" rel="noopener">${full.url}</a> ·
      ★${full.stars} · ${full.language || "n/a"} · ${full.license || "no license"} ·
      ${full.files_read} of ${full.files_eligible ?? full.files_total} readable files
      (${full.files_total} in repo) · analyzed ${String(full.analyzed_at).slice(0, 10)}</p>
    <div class="axes" style="margin:18px 0">${Object.keys(AXES).map((a) =>
      bar(AXES[a][0], full.scores[a], AXES[a][1])).join("")}</div>
    <p class="hint">Relevance <b>${full.relevance}/100</b> — 0.6 × strongest subject axis + 0.4 × their mean.</p>
    <h3 style="margin-top:18px">Population dimensions</h3>
    <div class="tags">${Object.entries(full.dimensions).map(([k, v]) =>
      `<span class="tag" title="${v.files.join(", ")}">${k} · ${v.count}</span>`).join("") ||
      '<span class="hint">none detected</span>'}</div>
    <h3 style="margin-top:18px">Models referenced</h3>
    <div class="tags">${full.models.map((m) =>
      `<span class="tag">${m.model} · ${m.mentions}</span>`).join("") ||
      '<span class="hint">none detected</span>'}</div>
    <h3 style="margin-top:18px">Evidence</h3>${evidence || '<p class="hint">No signals fired.</p>'}`;

  $("#close").onclick = () => { sheet.hidden = true; };
  $("#dl").onclick = () => {
    const blob = new Blob([JSON.stringify(full, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${full.repo.replace("/", "__")}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
}

$("#sheet").onclick = (e) => { if (e.target.id === "sheet") e.target.hidden = true; };
document.addEventListener("keydown", (e) => { if (e.key === "Escape") $("#sheet").hidden = true; });
$("#grid").addEventListener("click", (e) => {
  const c = e.target.closest(".card"); if (c) openSheet(window._rows[+c.dataset.i].repo);
});
$("#grid").addEventListener("keydown", (e) => {
  const c = e.target.closest(".card");
  if (c && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openSheet(window._rows[+c.dataset.i].repo); }
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
$("#etcOnly").onclick = (e) => {
  state.etc = !state.etc;
  e.currentTarget.setAttribute("aria-pressed", String(state.etc));
  render();
};
$("#q").oninput = (e) => { state.q = e.target.value; render(); };
$("#sort").onchange = (e) => { state.sort = e.target.value; render(); };

loadLive();
render();
fetch("data/index.json")
  .then((r) => (r.ok ? r.json() : []))
  .then((d) => { state.corpus = d; render(); })
  .catch(() => {});
