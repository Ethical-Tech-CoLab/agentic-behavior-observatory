# Ethical-Tech-CoLab/agentic-behavior-observatory

> Agentic Behavior Observatory - paste a GitHub repo URL and get a live, evidence-linked analysis of how it models agentic behavior: agent-based simulation, synthetic populations, LLM-based behavioral modeling, reinforcement learning and evaluation rigor, plus the demographic dimensions and model versions it rests on.

[https://github.com/Ethical-Tech-CoLab/agentic-behavior-observatory](https://github.com/Ethical-Tech-CoLab/agentic-behavior-observatory) · ★0 · Python · analyzed 2026-10-13

## Axis scores

- **Agent-based simulation** `██████····` 62/100
- **Synthetic data generation** `██████····` 56/100
- **LLM-based behavioral modeling** `█████·····` 51/100
- **Reinforcement learning / policy search** `████······` 45/100
- **Evaluation & validation rigor** `████████··` 80/100
- **Context isolation** `█████████·` 92/100

Agentic-behavior relevance: **60/100** (primary axis: Agent-based simulation)

## Evidence

### Agent-based simulation

- **NetLogo model referenced** — `data/reports/Ethical-Tech-CoLab__agentic-behavior-observatory.md:22`
- **Repast ABM toolkit referenced** — `data/reports/Ethical-Tech-CoLab__agentic-behavior-observatory.md:23`
- **Agent class defined in source** — `data/reports/Ethical-Tech-CoLab__agentic-behavior-observatory.json:45`
- **Simulation step/tick loop** — `data/reports/Ethical-Tech-CoLab__agentic-behavior-observatory.json:52`
- **A population of agents held and iterated** — `data/reports/Ethical-Tech-CoLab__agentic-behavior-observatory.json:59`
- **Simulation constructor** — `data/reports/Ethical-Tech-CoLab__agentic-behavior-observatory.json:66`
- **Discrete simulation time** — `data/reports/Ethical-Tech-CoLab__agentic-behavior-observatory.md:25`
- **Agents differentiated by demographic mix** — `data/reports/Ethical-Tech-CoLab__agentic-behavior-observatory.json:80`
- **ABM scheduler** — `data/reports/Ethical-Tech-CoLab__agentic-behavior-observatory.json:87`
- **Spatial environment** — `data/reports/Ethical-Tech-CoLab__agentic-behavior-observatory.json:94`
- **Multi-agent framing in prose** — `data/reports/Ethical-Tech-CoLab__agentic-behavior-observatory.json:101`

### Synthetic data generation

- **Gretel synthetic data platform** — `data/reports/Ethical-Tech-CoLab__agentic-behavior-observatory.md:36`
- **Explicit population synthesis** — `data/reports/Ethical-Tech-CoLab__agentic-behavior-observatory.md:37`
- **Real microdata used as a seed** — `data/reports/Ethical-Tech-CoLab__agentic-behavior-observatory.md:38`
- **Privacy protection of synthetic output** — `README.md:54`
- **Sampling machinery** — `data/reports/Ethical-Tech-CoLab__agentic-behavior-observatory.json:138`
- **Generation at population scale** — `README.md:9`

### LLM-based behavioral modeling

- **Persona/profile conditioning** — `data/reports/Ethical-Tech-CoLab__agentic-behavior-observatory.md:45`
- **Generative-agents architecture** — `data/reports/joonspk-research__generative_agents.md:3`
- **LLMs standing in for human respondents** — `data/reports/Ethical-Tech-CoLab__agentic-behavior-observatory.json:168`
- **Tool-using agents** — `data/reports/Ethical-Tech-CoLab__agentic-behavior-observatory.json:171`
- **Memory/retrieval layer** — `data/reports/Ethical-Tech-CoLab__agentic-behavior-observatory.md:49`

### Reinforcement learning / policy search

- **Named RL algorithm** — `data/reports/Farama-Foundation__PettingZoo.md:24`
- **Reward machinery** — `data/reports/Ethical-Tech-CoLab__agentic-behavior-observatory.json:198`
- **Preference-based alignment training** — `README.md:56`
- **Environment reset/step API** — `data/reports/Ethical-Tech-CoLab__agentic-behavior-observatory.json:52`

### Evaluation & validation rigor

- **Distributional fidelity metrics** — `data/reports/Ethical-Tech-CoLab__agentic-behavior-observatory.md:60`
- **Validation practice** — `README.md:57`
- **Seeded, reproducible runs** — `data/reports/Ethical-Tech-CoLab__agentic-behavior-observatory.json:235`
- **Experiment tracking / sweeps** — `data/reports/Ethical-Tech-CoLab__agentic-behavior-observatory.json:242`
- **Fairness/representativeness checking** — `data/reports/Ethical-Tech-CoLab__agentic-behavior-observatory.md:64`
- **Documentation or write-up** — `docs/.nojekyll`

### Context isolation

- **Per-agent private state the other agents are not given** — `data/reports/AgentTorch__AgentTorch.md:58`
- **Explicit rules for what each agent may see** — `README.md:58`
- **Context scoped or isolated per agent** — `data/reports/Ethical-Tech-CoLab__agentic-behavior-observatory.md:14`
- **State cleared between runs rather than carried over** — `data/reports/AgentTorch__AgentTorch.json:251`
- **Runs treated as independent replications** — `data/reports/Ethical-Tech-CoLab__agentic-behavior-observatory.md:71`
- **Guards against the model answering as itself rather than the persona** — `data/reports/Ethical-Tech-CoLab__agentic-behavior-observatory.json:286`
- **Guards against the model's own training reaching the scenario** — `data/reports/Ethical-Tech-CoLab__AI-Models-Research.json:222`
- **Explicit contamination or leakage checking** — `data/reports/Ethical-Tech-CoLab__AI-Models-Research.md:55`
- **Evaluation kept blind to what it is judging** — `README.md:58`

## Population dimensions modeled

`party`, `age`, `child`, `disabled`, `region`, `vulnerability`, `political`, `disability`, `elderly`, `migration`, `household`, `gender`, `race`, `occupation`, `displacement`, `refugee`, `religion`, `education`, `ethnicity`, `urban`

## Models referenced

- `gpt-4o-mini` (24 mentions)
- `gpt-4o` (14 mentions)
- `qwen` (14 mentions)
- `o3-mini` (12 mentions)
- `deepseek-r1` (12 mentions)
- `gpt-3.5-turbo` (11 mentions)
- `gpt-4` (11 mentions)
- `gpt-4.1` (9 mentions)
- `llama3.2` (9 mentions)
- `claude-assisted` (9 mentions)
- `claude-opus-4-8` (8 mentions)
- `claude-haiku-4-5` (8 mentions)
- `claude-haiku-4-5-20251001` (8 mentions)
- `qwen3` (8 mentions)
- `qwen3-27b` (8 mentions)
- `llama3` (7 mentions)
- `gemini-api` (7 mentions)
- `o1-preview` (6 mentions)
- `o4-mini` (5 mentions)
- `qwen2` (5 mentions)
