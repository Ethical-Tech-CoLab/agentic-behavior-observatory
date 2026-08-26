# Ethical-Tech-CoLab/India-EvacSimulation

> Evacuation Readiness & Uncertainty Simulator — models how field-intelligence uncertainty degrades civilian evacuation decisions in armed conflict

[https://github.com/Ethical-Tech-CoLab/India-EvacSimulation](https://github.com/Ethical-Tech-CoLab/India-EvacSimulation) · ★0 · HTML · analyzed 2026-08-26

## Axis scores

- **Agent-based simulation** `█·········` 11/100
- **Synthetic data generation** `··········` 0/100
- **LLM-based behavioral modeling** `█·········` 7/100
- **Reinforcement learning / policy search** `··········` 0/100
- **Evaluation & validation rigor** `██████····` 56/100
- **Context isolation** `██········` 19/100

Agentic-behavior relevance: **9/100** (primary axis: Agent-based simulation)

## Evidence

### Agent-based simulation

- **Simulation constructor** — `ARCHITECTURE.md:43`
- **Discrete simulation time** — `ARCHITECTURE.md:37`

### LLM-based behavioral modeling

- **Tool-using agents** — `ERUS-Paper.md:106`

### Evaluation & validation rigor

- **Test suite present** — `tests/engine.test.js`
- **Distributional fidelity metrics** — `ERUS-Paper.md:319`
- **Validation practice** — `PEER-REVIEW.md:15`
- **Seeded, reproducible runs** — `ERUS-Paper.md:233`

### Context isolation

- **Context scoped or isolated per agent** — `engine.js:269`
- **Runs treated as independent replications** — `ERUS-Paper.md:30`

## Population dimensions modeled

`mobility`, `vulnerability`, `elderly`, `pregnant`, `refugee`, `child`, `household`, `region`, `political`, `party`, `disability`, `displacement`
