# Farama-Foundation/PettingZoo

> A standard API for multi-agent reinforcement learning environments, with popular reference environments and related utilities

[https://github.com/Farama-Foundation/PettingZoo](https://github.com/Farama-Foundation/PettingZoo) · ★3496 · Python · analyzed 2026-08-25

## Axis scores

- **Agent-based simulation** `██········` 23/100
- **Synthetic data generation** `█·········` 7/100
- **LLM-based behavioral modeling** `██········` 20/100
- **Reinforcement learning / policy search** `█████████·` 87/100
- **Evaluation & validation rigour** `████······` 45/100

Agentic-behavior relevance: **20/100** (primary axis: Agent-based simulation)

## Evidence

### Agent-based simulation

- **PettingZoo multi-agent environments** — `dependencies`
- **Agent class defined in source** — `pettingzoo/sisl/pursuit/utils/discrete_agent.py:11`
- **Simulation step/tick loop** — `docs/tutorials/agilerl/DQN.md:406`

### Synthetic data generation

- **Sampling machinery** — `docs/tutorials/agilerl/DQN.md:638`

### LLM-based behavioral modeling

- **OpenAI SDK** — `dependencies`
- **LLM agent orchestration framework** — `dependencies`

### Reinforcement learning / policy search

- **Gym/Gymnasium environments** — `dependencies`
- **Stable-Baselines3 agents** — `dependencies`
- **Ray RLlib** — `dependencies`
- **RL research library** — `dependencies`
- **Named RL algorithm** — `docs/environments/third_party_envs.md:148`
- **Reward machinery** — `docs/tutorials/agilerl/DQN.md:80`
- **Environment reset/step API** — `docs/tutorials/agilerl/DQN.md:406`

### Evaluation & validation rigour

- **Test suite present** — `pettingzoo/test/__init__.py`
- **Seeded, reproducible runs** — `docs/environments/atari.md:60`
- **Experiment tracking / sweeps** — `docs/tutorials/agilerl/DQN.md:60`
- **Documentation or write-up** — `docs/.gitignore`

## Population dimensions modeled

`party`, `race`, `migration`, `age`, `gender`, `region`, `religion`, `disability`
