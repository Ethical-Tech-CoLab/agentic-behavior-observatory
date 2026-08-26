# Ethical-Tech-CoLab/Evac-Sim-Melanie

> Evacuation Simulator — an agent-based model of how information spread and demographics shape community evacuation behavior

[https://github.com/Ethical-Tech-CoLab/Evac-Sim-Melanie](https://github.com/Ethical-Tech-CoLab/Evac-Sim-Melanie) · ★0 · JavaScript · analyzed 2026-08-26

## Axis scores

- **Agent-based simulation** `██········` 21/100
- **Synthetic data generation** `··········` 0/100
- **LLM-based behavioral modeling** `··········` 0/100
- **Reinforcement learning / policy search** `··········` 0/100
- **Evaluation & validation rigor** `████······` 36/100
- **Context isolation** `████······` 40/100

Agentic-behavior relevance: **15/100** (primary axis: Agent-based simulation)

## Evidence

### Agent-based simulation

- **A population of agents held and iterated** — `src/EvacuationSim.jsx:213`
- **Simulation constructor** — `ARCHITECTURE.md:83`
- **Discrete simulation time** — `peer-review/evacuation-simulation-Peer-Review.md:13`
- **Agents differentiated by demographic mix** — `ARCHITECTURE.md:229`

### Evaluation & validation rigor

- **Distributional fidelity metrics** — `EvacSim-Paper.md:548`
- **Seeded, reproducible runs** — `src/EvacuationSim.jsx:92`
- **Documentation or write-up** — `docs/assets/index-D3N-WJ4P.js`

### Context isolation

- **Explicit rules for what each agent may see** — `UX_SUGGESTIONS.md:68`
- **Context scoped or isolated per agent** — `src/AboutPage.jsx:1214`
- **Runs treated as independent replications** — `peer-review/evacuation-simulation-Peer-Review.md:23`
- **Evaluation kept blind to what it is judging** — `peer-review/evacuation-simulation-Peer-Review.md:32`

## Population dimensions modeled

`household`, `child`, `pregnant`, `mobility`, `vulnerability`, `displacement`, `age`, `party`, `family size`, `migration`, `elderly`, `disabled`, `region`, `literacy`, `political`, `disability`
