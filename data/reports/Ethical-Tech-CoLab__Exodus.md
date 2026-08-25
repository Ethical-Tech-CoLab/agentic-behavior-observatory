# Ethical-Tech-CoLab/Exodus

> Civilian Evacuation Risk Platform — one FastAPI app unifying the EII crisis map, ERCF scenario model, and CERAI risk assessment

[https://github.com/Ethical-Tech-CoLab/Exodus](https://github.com/Ethical-Tech-CoLab/Exodus) · ★0 · HTML · analyzed 2026-08-25

## Axis scores

- **Agent-based simulation** `██········` 21/100
- **Synthetic data generation** `██········` 16/100
- **LLM-based behavioral modeling** `██········` 18/100
- **Reinforcement learning / policy search** `█·········` 13/100
- **Evaluation & validation rigor** `████······` 44/100

Agentic-behavior relevance: **20/100** (primary axis: Agent-based simulation)

## Evidence

### Agent-based simulation

- **Simulation step/tick loop** — `main.py:210`
- **A population of agents held and iterated** — `static/crisis_map.html:1529`
- **Simulation constructor** — `static/risk_assessment.html:538`
- **Agents differentiated by demographic mix** — `static/risk_assessment.html:957`

### Synthetic data generation

- **Real microdata used as a seed** — `static/crisis_map.html:1623`
- **Generation at population scale** — `historical_data.py:1858`

### LLM-based behavioral modeling

- **Anthropic SDK** — `dependencies`
- **Tool-using agents** — `static/routes_sim.html:503`

### Reinforcement learning / policy search

- **Named RL algorithm** — `world_risk.py:93`

### Evaluation & validation rigor

- **Distributional fidelity metrics** — `static/risk_assessment.html:1235`
- **Validation practice** — `static/risk_assessment.html:536`
- **Seeded, reproducible runs** — `static/routes_sim.html:834`

## Population dimensions modeled

`mobility`, `vulnerability`, `political`, `child`, `household`, `region`, `rural`, `party`, `displacement`, `urban`, `migration`, `elderly`, `refugee`, `age`, `occupation`, `disability`, `pregnant`, `disabled`, `gender`, `ethnicity`

## Models referenced

- `claude-assisted` (1 mentions)
- `claude-haiku-4-5-20251001` (1 mentions)
- `claude-haiku-4-5` (1 mentions)
