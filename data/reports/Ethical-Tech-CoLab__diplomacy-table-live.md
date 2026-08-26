# Ethical-Tech-CoLab/diplomacy-table-live

> Diplomacy Table - configuration & teaching console for the DTSF multi-party AI negotiation simulator. Static, reference-only build.

[https://github.com/Ethical-Tech-CoLab/diplomacy-table-live](https://github.com/Ethical-Tech-CoLab/diplomacy-table-live) · ★0 · HTML · analyzed 2026-08-26

## Axis scores

- **Agent-based simulation** `█·········` 9/100
- **Synthetic data generation** `··········` 0/100
- **LLM-based behavioral modeling** `█·········` 11/100
- **Reinforcement learning / policy search** `··········` 0/100
- **Evaluation & validation rigor** `█████·····` 47/100
- **Context isolation** `█████·····` 54/100

Agentic-behavior relevance: **9/100** (primary axis: LLM-based behavioral modeling)

## Evidence

### Agent-based simulation

- **Simulation step/tick loop** — `app.html:4671`
- **Discrete simulation time** — `README.md:23`

### LLM-based behavioral modeling

- **Persona/profile conditioning** — `app.html:733`

### Evaluation & validation rigor

- **Distributional fidelity metrics** — `index.html:503`
- **Validation practice** — `index.html:629`
- **Fairness/representativeness checking** — `index.html:1926`

### Context isolation

- **Per-agent private state the other agents are not given** — `app.html:300`
- **Explicit rules for what each agent may see** — `README.md:34`
- **Context scoped or isolated per agent** — `app.html:2906`
- **Guards against the model answering as itself rather than the persona** — `index.html:484`
- **Evaluation kept blind to what it is judging** — `README.md:49`

## Population dimensions modeled

`party`, `disabled`, `race`, `education`, `political`, `child`

## Models referenced

- `gpt-4o-mini` (7 mentions)
- `gpt-5-mini-class` (3 mentions)
- `gpt-5-nano-class` (3 mentions)
- `gpt-5` (3 mentions)
- `llama3.2` (2 mentions)
- `gpt-5-mini` (2 mentions)
- `gpt-5-nano` (2 mentions)
- `llama-3.3-70b-versatile` (1 mentions)
- `llama-3.3-70b-instruct-turbo` (1 mentions)
- `qwen` (1 mentions)
