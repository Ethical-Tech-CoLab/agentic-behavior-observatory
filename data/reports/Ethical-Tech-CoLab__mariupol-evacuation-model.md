# Ethical-Tech-CoLab/mariupol-evacuation-model

> Daily severity model for civilian evacuation during the siege of Mariupol (Mar–May 2022) — open data, IHL-anchored, interactive briefing tool.

[https://github.com/Ethical-Tech-CoLab/mariupol-evacuation-model](https://github.com/Ethical-Tech-CoLab/mariupol-evacuation-model) · ★0 · HTML · analyzed 2026-08-26

## Axis scores

- **Agent-based simulation** `█·········` 11/100
- **Synthetic data generation** `█·········` 9/100
- **LLM-based behavioral modeling** `··········` 0/100
- **Reinforcement learning / policy search** `··········` 0/100
- **Evaluation & validation rigor** `█████·····` 52/100
- **Context isolation** `█·········` 10/100

Agentic-behavior relevance: **9/100** (primary axis: Agent-based simulation)

## Evidence

### Agent-based simulation

- **Discrete simulation time** — `severity-standalone.html:480`
- **Agents differentiated by demographic mix** — `teresa.html:421`

### Synthetic data generation

- **Real microdata used as a seed** — `Mariupol-Severity-Model-Paper.md:475`

### Evaluation & validation rigor

- **Distributional fidelity metrics** — `Mariupol-Severity-Model-Paper.md:482`
- **Validation practice** — `Mariupol-Severity-Model-Paper.md:606`
- **Seeded, reproducible runs** — `teresa.html:298`
- **Documentation or write-up** — `docs/METHODOLOGY.md`

### Context isolation

- **Explicit rules for what each agent may see** — `peer-review/mariupol-severity-model-Peer-Review.md:47`

## Population dimensions modeled

`vulnerability`, `party`, `elderly`, `disabled`, `child`, `political`, `disability`, `geography`, `urban`, `literacy`, `displacement`, `refugee`, `age`, `sex`, `occupation`, `religion`
