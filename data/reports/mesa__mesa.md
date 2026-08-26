# mesa/mesa

> Mesa is an open-source Python library for agent-based modeling, ideal for simulating complex systems and exploring emergent behaviors.

[https://github.com/mesa/mesa](https://github.com/mesa/mesa) · ★3810 · Python · analyzed 2026-08-26

## Axis scores

- **Agent-based simulation** `██████····` 65/100
- **Synthetic data generation** `··········` 0/100
- **LLM-based behavioral modeling** `█·········` 6/100
- **Reinforcement learning / policy search** `██········` 18/100
- **Evaluation & validation rigor** `███████···` 69/100
- **Context isolation** `████······` 42/100

Agentic-behavior relevance: **48/100** (primary axis: Agent-based simulation)

## Evidence

### Agent-based simulation

- **Mesa agent-based modeling framework** — `dependencies`
- **NetLogo model referenced** — `HISTORY.md:1591`
- **Repast ABM toolkit referenced** — `README.md:19`
- **Agent class defined in source** — `docs/migration_guide.md:479`
- **Simulation step/tick loop** — `docs/overview.md:28`
- **A population of agents held and iterated** — `tests/test_agentset.py:62`
- **Simulation constructor** — `mesa/model.py:296`
- **Discrete simulation time** — `mesa/examples/experimental/tram_model/Readme.md:7`
- **ABM scheduler** — `HISTORY.md:1099`
- **Spatial environment** — `HISTORY.md:348`
- **Multi-agent framing in prose** — `docs/tutorials/2_agent_activation.ipynb:138`

### LLM-based behavioral modeling

- **Memory/retrieval layer** — `HISTORY.md:370`

### Reinforcement learning / policy search

- **Reward machinery** — `tests/experimental/test_scenarios.py:426`
- **Environment reset/step API** — `docs/overview.md:28`

### Evaluation & validation rigor

- **Test suite present** — `tests/__init__.py`
- **Analysis notebooks** — `docs/tutorials/0_first_model.ipynb`
- **Distributional fidelity metrics** — `pyproject.toml:98`
- **Seeded, reproducible runs** — `HISTORY.md:837`
- **Experiment tracking / sweeps** — `docs/tutorials/5_collecting_data.ipynb:480`
- **Documentation or write-up** — `docs/GSoC.md`

### Context isolation

- **Per-agent private state the other agents are not given** — `CODE_OF_CONDUCT.md:36`
- **Explicit rules for what each agent may see** — `HISTORY.md:3044`
- **Context scoped or isolated per agent** — `HISTORY.md:1117`
- **Runs treated as independent replications** — `HISTORY.md:437`

## Population dimensions modeled

`wealth`, `migration`, `income`, `age`, `disabled`, `race`, `ethnicity`, `occupation`, `child`, `gender`, `sex`, `education`, `region`, `urban`, `religion`, `political`, `disability`, `nationality`, `caste`
