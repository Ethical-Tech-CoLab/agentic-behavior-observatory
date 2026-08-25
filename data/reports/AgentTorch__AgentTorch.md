# AgentTorch/AgentTorch

> large population models

[https://github.com/AgentTorch/AgentTorch](https://github.com/AgentTorch/AgentTorch) · ★643 · Jupyter Notebook · analyzed 2026-08-25

## Axis scores

- **Agent-based simulation** `███·······` 30/100
- **Synthetic data generation** `██········` 22/100
- **LLM-based behavioral modeling** `███·······` 28/100
- **Reinforcement learning / policy search** `███·······` 32/100
- **Evaluation & validation rigor** `████████··` 84/100

Agentic-behavior relevance: **29/100** (primary axis: Agent-based simulation)

## Evidence

### Agent-based simulation

- **Agent class defined in source** — `agent_torch/core/analyzer/agent_graph.py:47`
- **Simulation step/tick loop** — `docs/tutorials/creating-a-model/index.md:783`
- **A population of agents held and iterated** — `agent_torch/data/census/generate/base_pop.py:34`
- **Simulation constructor** — `docs/tutorials/simulation-and-calibration/index.md:34`
- **Discrete simulation time** — `docs/tutorials/calibrating-a-model/index.md:167`
- **Multi-agent framing in prose** — `agent_torch/examples/models/boids/README.md:183`

### Synthetic data generation

- **Explicit population synthesis** — `docs/tutorials/processing-a-population/index.md:232`
- **Real microdata used as a seed** — `docs/tutorials/processing-a-population/index.md:4`

### LLM-based behavioral modeling

- **LLM agent orchestration framework** — `dependencies`
- **Persona/profile conditioning** — `docs/tutorials/creating-archetypes/index.md:149`
- **Memory/retrieval layer** — `agent_torch/core/analyzer/agent_helpers.py:19`

### Reinforcement learning / policy search

- **Named RL algorithm** — `agent_torch/optim/p3o.py:30`
- **Reward machinery** — `docs/tutorials/optimizing-on-prompts/index.md:35`
- **Environment reset/step API** — `agent_torch/core/runner.py:80`

### Evaluation & validation rigor

- **Test suite present** — `tests/fixtures/behavior.py`
- **Analysis notebooks** — `agent_torch/models/macro_economics/scratch.ipynb`
- **Distributional fidelity metrics** — `docs/tutorials/calibrating-a-model/index.md:20`
- **Validation practice** — `docs/tutorials/optimizing-on-prompts/index.md:42`
- **Seeded, reproducible runs** — `agent_torch/models/macro_economics/trainer_calibnn.py:16`
- **Experiment tracking / sweeps** — `agent_torch/models/macro_economics/trainer_calibnn.py:46`
- **Documentation or write-up** — `agent_torch/models/predator_prey/docs/config-map.yaml`

## Population dimensions modeled

`age`, `region`, `gender`, `ethnicity`, `household`, `employment`, `income`, `urban`, `education`, `child`, `mobility`, `disabled`, `sex`, `race`, `rural`, `religion`, `political`, `party`, `disability`, `migration`

## Models referenced

- `gpt-3.5-turbo` (4 mentions)
- `gpt-4o-mini` (3 mentions)
