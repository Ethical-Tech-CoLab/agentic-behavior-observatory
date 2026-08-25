# Agentic Behavior Observatory

Paste a GitHub repository URL and get a live, evidence-linked analysis of how
that repository models agentic behavior — agent-based simulation, synthetic
populations, LLM-driven behavioral modeling — scored on five axes, with the
demographic dimensions and model versions it rests on pulled out.

The question it exists to answer: **when someone builds a system that generates or
evaluates synthetic populations at scale, what are they actually modeling — and
what are they leaving out?**

- **Dashboard** → https://ethical-tech-colab.github.io/agentic-behavior-observatory/
- **Definitions** → what reinforcement behavior, agentic behavior, and synthetic populations mean here ([Definitions tab](https://ethical-tech-colab.github.io/agentic-behavior-observatory/#definitions))
- **Methodology** → the full scoring method, in the open ([Methodology tab](https://ethical-tech-colab.github.io/agentic-behavior-observatory/))
- **Reports** → [`data/reports/`](data/reports/), JSON + Markdown, one pair per repository

## Two ways to run it

**In the browser.** Open the dashboard, paste a URL, press Analyze. The analysis
runs client-side: two calls to the GitHub API for metadata and the file tree,
then every file body from `raw.githubusercontent.com`, which is CORS-open and not
rate limited. That is about thirty repositories an hour with no token at all. A
token (stored in your browser only) is needed only for private repositories or if
you exhaust the unsigned limit. Results are kept in your browser and marked
*live*; download the JSON to contribute one to the shared corpus.

**From the CLI**, which is what writes the committed corpus:

```bash
python analyzer/analyze.py https://github.com/owner/repo
python analyzer/analyze.py projectmesa/mesa sdv-dev/SDV joonspk-research/generative_agents
```

Each run writes `data/reports/owner__repo.json` and `.md`, then rebuilds
`docs/data/index.json`. No clone, no dependencies — standard library only,
Python 3.9+. It picks up a `GITHUB_TOKEN`, or the `gh` CLI's token automatically.

Preview the dashboard locally (the browser analyzer is an ES module, so it needs
a server rather than `file://`):

```bash
python -m http.server -d docs 8000
```

## The five axes

Every repository is scored 0–100 on each axis by how much of that axis's signal
set it covers.

| Axis | What it detects |
| --- | --- |
| **Agent-based simulation** | Mesa, AgentPy, PettingZoo, NetLogo, Repast, SimPy; agent classes, schedulers, step loops, spatial environments |
| **Synthetic data generation** | SDV, CTGAN, synthcity, Faker, Gretel; population synthesis and IPF, census/microdata seeds, differential privacy, generation at scale |
| **LLM-based behavioral modeling** | Anthropic/OpenAI SDKs, LangGraph, AutoGen, CrewAI, DSPy, local runtimes; personas, memory streams, generative-agent architectures, silicon sampling |
| **Reinforcement learning** | Gymnasium, Stable-Baselines3, RLlib, TorchRL; named algorithms, reward machinery, RLHF/DPO, the reset/step contract |
| **Evaluation & validation** | Tests, fidelity metrics (KS, Wasserstein, TSTR), sensitivity analysis and ablations, seeded runs, experiment tracking, bias and representativeness audits |

The headline **relevance** score uses only the three *subject* axes:

```
relevance = 0.6 × max(subject axes) + 0.4 × mean(subject axes)
```

The `max` term keeps a purely agent-based or purely synthetic-data repository
squarely in scope; the `mean` term rewards work that spans them. Reinforcement
learning and evaluation describe *how* the work is done, so they shape the
profile without setting the headline.

Every point is traceable: each report records the file and line where each signal
fired, and the dashboard shows that evidence beside the score. A score is signal
coverage, not a quality judgment — a small, sharp repository can and should
score lower than a sprawling framework.

## Population lab

Two things the dashboard surfaces across the whole analyzed corpus:

- **Dimensions modeled** — which demographic attributes (age, income, education,
  region, migration, disability, caste, literacy, …) appear in the code and prose
  of each repository. A dimension nobody models is a population nobody simulates,
  and an unmodeled dimension is an implicit claim that it does not matter.
- **Models & versions referenced** — every `claude-*`, `gpt-*`, `gemini-*`,
  `llama-*` identifier found, with mention counts. Behavioral findings drift
  between model versions; this makes the version each study rests on visible
  rather than buried in a config file.

## Teaching it something new

[`analyzer/signals.py`](analyzer/signals.py) is the whole taxonomy: axes,
signals, weights, demographic terms, model-id patterns. Adding a framework is one
tuple:

```python
("abm", "vadere", "dep", r"^vadere$", 10, "Vadere crowd simulation"),
#  axis   key      kind   pattern     weight  human-readable label
```

`kind` is `dep` (declared dependencies), `path` (file paths), or `text` (source
and prose). `build_index.py` exports the taxonomy to `docs/data/signals.json`,
which the browser analyzer loads — so the CLI and the dashboard score
identically, and one edit updates both.

## Layout

```
analyzer/analyze.py       fetch, score, and write reports
analyzer/signals.py       the taxonomy — edit this to extend coverage
analyzer/build_index.py   collect reports + export the taxonomy for the browser
data/reports/             per-repository JSON + Markdown
docs/                     static dashboard (Observatory · Definitions · Methodology)
docs/analyzer.js          browser port of the analyzer, scoring identically
```

## Limits worth stating

- Up to 120 files per repository are read, chosen by a heuristic favoring
  manifests, prose, and modeling-core filenames. Large repositories are sampled,
  not read whole; `files_read` / `files_total` in every report says by how much.
- Regular expressions match vocabulary, not meaning. A repository that discusses
  differential privacy without implementing it fires that signal — which is why
  every signal links to its evidence.
- Scores compare a repository against the taxonomy, never against another
  repository's scientific merit.
- The demographic vocabulary is a fixed English list, so it under-reports
  populations described in other terms. That limit is itself a finding.

---

Ethical Tech CoLab · MIT licensed.
