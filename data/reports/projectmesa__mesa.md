# projectmesa/mesa

> Mesa is an open-source Python library for agent-based modeling, ideal for simulating complex systems and exploring emergent behaviors.

[https://github.com/mesa/mesa](https://github.com/mesa/mesa) · ★3806 · Python · analyzed 2026-08-25

## Axis scores

- **Agent-based simulation** `██████····` 63/100
- **Synthetic data generation** `··········` 0/100
- **LLM-based behavioral modeling** `█·········` 6/100
- **Reinforcement learning / policy search** `██········` 18/100
- **Evaluation & validation rigor** `███████···` 69/100

Agentic-behavior relevance: **47/100** (primary axis: Agent-based simulation)

## Evidence

### Agent-based simulation

- **Mesa agent-based modeling framework** — `dependencies`
- **NetLogo model referenced** — `HISTORY.md:1591`
- **Repast ABM toolkit referenced** — `README.md:19`
- **Agent class defined in source** — `docs/migration_guide.md:479`
- **Simulation step/tick loop** — `docs/overview.md:28`
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
- **Seeded, reproducible runs** — `docs/migration_guide.md:49`
- **Experiment tracking / sweeps** — `docs/tutorials/5_collecting_data.ipynb:480`
- **Documentation or write-up** — `docs/GSoC.md`

## Population dimensions modeled

`wealth`, `migration`, `income`, `age`, `race`, `ethnicity`, `occupation`, `gender`, `sex`, `education`, `region`, `urban`, `religion`, `political`, `disability`, `nationality`, `caste`
