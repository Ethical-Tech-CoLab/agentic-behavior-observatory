# Ethical-Tech-CoLab/diplomatic-simulator

> Diplomatic Simulator — interactive multi-party diplomatic negotiation simulation (Ethical Tech CoLab)

[https://github.com/Ethical-Tech-CoLab/diplomatic-simulator](https://github.com/Ethical-Tech-CoLab/diplomatic-simulator) · ★0 · HTML · analyzed 2026-08-26

## Axis scores

- **Agent-based simulation** `█·········` 9/100
- **Synthetic data generation** `█·········` 9/100
- **LLM-based behavioral modeling** `█·········` 11/100
- **Reinforcement learning / policy search** `··········` 0/100
- **Evaluation & validation rigor** `█████·····` 47/100
- **Context isolation** `███████···` 73/100

Agentic-behavior relevance: **10/100** (primary axis: LLM-based behavioral modeling)

## Evidence

### Agent-based simulation

- **Simulation step/tick loop** — `live.html:148`
- **Discrete simulation time** — `live.html:148`

### Synthetic data generation

- **Real microdata used as a seed** — `DiplomaticSimulator-Paper.md:269`

### LLM-based behavioral modeling

- **Persona/profile conditioning** — `BACKLOG.md:22`

### Evaluation & validation rigor

- **Distributional fidelity metrics** — `DiplomaticSimulator-Paper.md:375`
- **Validation practice** — `DiplomaticSimulator-Paper.md:32`
- **Fairness/representativeness checking** — `DiplomaticSimulator-Paper.md:42`

### Context isolation

- **Per-agent private state the other agents are not given** — `DiplomaticSimulator-Paper.md:16`
- **Explicit rules for what each agent may see** — `sim/scenarios/arctic/transcript.md:40`
- **Context scoped or isolated per agent** — `DiplomaticSimulator-Paper.md:26`
- **Runs treated as independent replications** — `DiplomaticSimulator-Paper.md:236`
- **Guards against the model answering as itself rather than the persona** — `DiplomaticSimulator-Paper.md:375`
- **Guards against the model's own training reaching the scenario** — `sim/scenarios/cyprus/transcript.md:8`
- **Explicit contamination or leakage checking** — `DiplomaticSimulator-Paper.md:400`

## Population dimensions modeled

`party`, `region`, `political`, `citizenship`, `refugee`, `child`, `disabled`, `occupation`, `geography`, `vulnerability`, `gender`, `ethnicity`, `religion`

## Models referenced

- `claude-opus-4-8` (1 mentions)
