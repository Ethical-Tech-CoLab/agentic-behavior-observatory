# Ethical-Tech-CoLab/CERAI_AR

> Alana's CERAI Evacuation Model 

[https://github.com/Ethical-Tech-CoLab/CERAI_AR](https://github.com/Ethical-Tech-CoLab/CERAI_AR) · ★0 · HTML · analyzed 2026-08-26

## Axis scores

- **Agent-based simulation** `█·········` 12/100
- **Synthetic data generation** `··········` 0/100
- **LLM-based behavioral modeling** `··········` 0/100
- **Reinforcement learning / policy search** `··········` 0/100
- **Evaluation & validation rigor** `███·······` 31/100
- **Context isolation** `████······` 42/100

Agentic-behavior relevance: **9/100** (primary axis: Agent-based simulation)

## Evidence

### Agent-based simulation

- **Simulation constructor** — `index.html:539`
- **Agents differentiated by demographic mix** — `index.html:958`

### Evaluation & validation rigor

- **Distributional fidelity metrics** — `index.html:1236`
- **Validation practice** — `CERAI-Paper.md:257`

### Context isolation

- **Per-agent private state the other agents are not given** — `PEER-REVIEW.md:23`
- **State cleared between runs rather than carried over** — `index.html:935`
- **Runs treated as independent replications** — `CERAI-Paper.md:257`
- **Explicit contamination or leakage checking** — `index.html:739`

## Population dimensions modeled

`vulnerability`, `displacement`, `refugee`, `party`, `political`, `elderly`, `gender`, `occupation`, `child`, `mobility`, `ethnicity`, `household`, `region`, `urban`, `religion`, `nationality`, `pregnant`, `disabled`, `age`, `migration`

## Models referenced

- `claude-assisted` (2 mentions)
