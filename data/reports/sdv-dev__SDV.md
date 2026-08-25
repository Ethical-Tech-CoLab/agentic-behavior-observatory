# sdv-dev/SDV

> Synthetic data generation for tabular data

[https://github.com/sdv-dev/SDV](https://github.com/sdv-dev/SDV) · ★3549 · Python · analyzed 2026-08-25

## Axis scores

- **Agent-based simulation** `··········` 5/100
- **Synthetic data generation** `███·······` 33/100
- **LLM-based behavioral modeling** `··········` 0/100
- **Reinforcement learning / policy search** `█·········` 11/100
- **Evaluation & validation rigor** `█████·····` 48/100

Agentic-behavior relevance: **25/100** (primary axis: Synthetic data generation)

## Evidence

### Agent-based simulation

- **Discrete simulation time** — `tests/unit/sequential/test_par.py:76`

### Synthetic data generation

- **SDV synthetic data vault** — `dependencies`
- **Tabular synthesis (CTGAN family)** — `dependencies`
- **Real microdata used as a seed** — `EVALUATION.md:128`

### Reinforcement learning / policy search

- **Reward machinery** — `tests/unit/constraints/test_tabular.py:86`

### Evaluation & validation rigor

- **Test suite present** — `tests/__init__.py`
- **Distributional fidelity metrics** — `pyproject.toml:113`
- **Seeded, reproducible runs** — `tests/unit/single_table/test_base.py:1653`
- **Documentation or write-up** — `docs/Makefile`

## Population dimensions modeled

`child`, `age`, `gender`, `region`, `sex`, `occupation`, `party`
