# Reinforcement Learning — Agentic Behaviour Observatory

Point it at a GitHub repository. It reads the repository through the GitHub API,
scores what kind of agentic-behaviour research the code actually does, pulls out
the population dimensions and model versions it works with, and publishes the
result to a browsable dashboard.

The question it exists to answer: **when someone builds a system that generates or
evaluates synthetic populations at scale, what are they actually modelling — and
what are they leaving out?**

- **Dashboard** → https://ethical-tech-colab.github.io/reinforcement-learning/
- **Reports** → [`data/reports/`](data/reports/) (JSON + Markdown, one pair per repository)

## Analyse a repository

```bash
python analyzer/analyze.py https://github.com/owner/repo
```

Several at once:

```bash
python analyzer/analyze.py projectmesa/mesa sdv-dev/SDV joonspk-research/generative_agents
```

Each run writes `data/reports/owner__repo.json` and `.md`, then rebuilds
`docs/data/index.json` so the dashboard picks it up. No clone, no install —
standard library only, Python 3.9+.

Authentication is optional but the unauthenticated GitHub API allows only 60
requests per hour, and one repository costs roughly 120. Set `GITHUB_TOKEN`, or
just be logged in to the `gh` CLI and the token is picked up automatically.

Preview the dashboard locally:

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
| **LLM-based behavioural modelling** | Anthropic/OpenAI SDKs, LangGraph, AutoGen, CrewAI, DSPy, local runtimes; personas, memory streams, generative-agent architectures, silicon sampling |
| **Reinforcement learning** | Gymnasium, Stable-Baselines3, RLlib, TorchRL; named algorithms, reward machinery, RLHF/DPO, the reset/step contract |
| **Evaluation & validation** | Tests, fidelity metrics (KS, Wasserstein, TSTR), sensitivity analysis and ablations, seeded runs, experiment tracking, bias and representativeness audits |

The headline **relevance** score weights the strongest of the three subject axes
(`0.6 × max + 0.4 × mean`), so a repository that is purely an ABM or purely a
synthesiser still reads as squarely in scope, while work that spans them scores
higher. Reinforcement learning and evaluation describe *how* the work is done,
so they inform the profile without setting the headline.

Every point is traceable: each report lists the file and line where each signal
fired, and the dashboard shows that evidence next to the score. A score is
signal coverage, not a quality judgement — a small, sharp repository can and
should score lower than a sprawling framework.

## Population lab

Two things the dashboard surfaces across the whole analysed corpus:

- **Dimensions modelled** — which demographic attributes (age, income, education,
  region, migration, disability, caste, …) appear in the code and prose of each
  repository. A dimension nobody models is a population nobody simulates.
- **Models & versions referenced** — every `claude-*`, `gpt-*`, `gemini-*`,
  `llama-*` identifier found, with mention counts. Behavioural findings drift
  between model versions; this makes the version each study rests on visible
  rather than buried in a config file.

Filter by axis, search across dimensions and models, and open any repository for
the full evidence trail.

## Teaching it something new

[`analyzer/signals.py`](analyzer/signals.py) is the whole taxonomy: axes,
signals, weights, demographic terms, model-id patterns. Adding a framework is one
tuple:

```python
("abm", "vadere", "dep", r"^vadere$", 10, "Vadere crowd simulation"),
#  axis   key      kind   pattern     weight  human-readable label
```

`kind` is `dep` (declared dependencies), `path` (file paths), or `text` (source
and prose content). Nothing else needs to change — re-run the analyser and the
dashboard reflects the new signal.

## Layout

```
analyzer/analyze.py       fetch, score, and write reports
analyzer/signals.py       the taxonomy — edit this to extend coverage
analyzer/build_index.py   collect reports into docs/data/ for the dashboard
data/reports/             per-repository JSON + Markdown
docs/                     static dashboard, served by GitHub Pages
```

## Limits worth stating

- It reads up to 120 files per repository, chosen by a heuristic that favours
  manifests, prose, and modelling-core filenames. Large repositories are sampled,
  not read whole; `files_read` / `files_total` in every report says by how much.
- Regular expressions match vocabulary, not meaning. A repository that discusses
  differential privacy without implementing it will fire that signal.
- Scores compare repositories against the taxonomy, never against each other's
  scientific merit.

---

Ethical Tech CoLab · MIT licensed.
