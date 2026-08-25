# sdv-dev/SDV

> Synthetic data generation for tabular data

[https://github.com/sdv-dev/SDV](https://github.com/sdv-dev/SDV) · ★3549 · Python · analyzed 2026-08-25

## Axis scores

- **Agent-based simulation** `··········` 0/100
- **Synthetic data generation** `███·······` 33/100
- **LLM-based behavioral modeling** `··········` 0/100
- **Reinforcement learning / policy search** `█·········` 11/100
- **Evaluation & validation rigour** `█████·····` 48/100

Agentic-behavior relevance: **24/100** (primary axis: Synthetic data generation)

## Evidence

### Synthetic data generation

- **SDV synthetic data vault** — `dependencies`
- **Tabular synthesis (CTGAN family)** — `dependencies`
- **Real microdata used as a seed** — `EVALUATION.md:128`

### Reinforcement learning / policy search

- **Reward machinery** — `tests/unit/constraints/test_tabular.py:86`

### Evaluation & validation rigour

- **Test suite present** — `tests/__init__.py`
- **Distributional fidelity metrics** — `pyproject.toml:113`
- **Seeded, reproducible runs** — `sdv/single_table/base.py:882`
- **Documentation or write-up** — `docs/Makefile`

## Population dimensions modeled

`age`, `gender`, `region`, `sex`, `occupation`, `party`
