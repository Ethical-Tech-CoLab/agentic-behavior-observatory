# Ethical-Tech-CoLab/ercf

> ERCF — Evacuation Risk and Cost Framework: decision-support tool estimating the human and financial cost of civilian evacuation in armed conflict

[https://github.com/Ethical-Tech-CoLab/ercf](https://github.com/Ethical-Tech-CoLab/ercf) · ★0 · Python · analyzed 2026-08-26

## Axis scores

- **Agent-based simulation** `██········` 20/100
- **Synthetic data generation** `███·······` 27/100
- **LLM-based behavioral modeling** `██········` 18/100
- **Reinforcement learning / policy search** `█·········` 13/100
- **Evaluation & validation rigor** `█████·····` 52/100
- **Context isolation** `█████·····` 54/100

Agentic-behavior relevance: **25/100** (primary axis: Synthetic data generation)

## Evidence

### Agent-based simulation

- **Simulation step/tick loop** — `rics/main.py:141`
- **A population of agents held and iterated** — `rics/static/app.js:253`
- **Simulation constructor** — `reference/india-evac/ARCHITECTURE.md:37`
- **Discrete simulation time** — `reference/india-evac/ARCHITECTURE.md:31`

### Synthetic data generation

- **Real microdata used as a seed** — `docs/snapshot/index.json:415`
- **Privacy protection of synthetic output** — `rics/DESIGN.md:182`
- **Generation at population scale** — `docs/snapshot/index.json:2128`

### LLM-based behavioral modeling

- **Anthropic SDK** — `dependencies`
- **Tool-using agents** — `reference/india-evac/index.html:499`

### Reinforcement learning / policy search

- **Named RL algorithm** — `world_risk.py:93`

### Evaluation & validation rigor

- **Distributional fidelity metrics** — `ERCF-Paper.md:75`
- **Validation practice** — `ERCF-Paper.md:705`
- **Seeded, reproducible runs** — `reference/india-evac/ARCHITECTURE.md:33`
- **Documentation or write-up** — `docs/after-the-corridor.pdf`

### Context isolation

- **Per-agent private state the other agents are not given** — `static/index.html:1889`
- **Explicit rules for what each agent may see** — `static/index.html:239`
- **Context scoped or isolated per agent** — `docs/snapshot/index.json:3209`
- **Runs treated as independent replications** — `rics/DESIGN.md:6`
- **Explicit contamination or leakage checking** — `docs/snapshot/index.json:696`

## Population dimensions modeled

`displacement`, `region`, `vulnerability`, `mobility`, `nationality`, `cohort`, `migration`, `elderly`, `refugee`, `disabled`, `urban`, `child`, `party`, `disability`, `political`, `rural`, `age`, `household`, `pregnant`, `income`

## Models referenced

- `claude-haiku-4-5` (3 mentions)
- `claude-haiku-4-5-20251001` (1 mentions)
