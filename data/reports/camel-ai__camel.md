# camel-ai/camel

> 🐫 CAMEL: The first and the best multi-agent framework. Finding the Scaling Law of Agents. https://www.camel-ai.org

[https://github.com/camel-ai/camel](https://github.com/camel-ai/camel) · ★17645 · Python · analyzed 2026-08-26

## Axis scores

- **Agent-based simulation** `██········` 19/100
- **Synthetic data generation** `█·········` 13/100
- **LLM-based behavioral modeling** `██████····` 62/100
- **Reinforcement learning / policy search** `███·······` 32/100
- **Evaluation & validation rigor** `███████···` 72/100
- **Context isolation** `████······` 38/100

Agentic-behavior relevance: **50/100** (primary axis: LLM-based behavioral modeling)

## Evidence

### Agent-based simulation

- **Agent class defined in source** — `docs/reference/camel.agents.chat_agent.md:115`
- **Simulation step/tick loop** — `docs/reference/camel.agents.chat_agent.md:1148`
- **Discrete simulation time** — `docs/key_modules/browsertoolkit.md:388`
- **Multi-agent framing in prose** — `docs/cookbooks/multi_agent_society/workforce_judge_committee.md:367`

### Synthetic data generation

- **Sampling machinery** — `docs/cookbooks/data_generation/self_improving_cot_generation.md:315`
- **Generation at population scale** — `docs/cookbooks/multi_agent_society/azure_openai_claude_society.md:519`

### LLM-based behavioral modeling

- **Anthropic SDK** — `dependencies`
- **OpenAI SDK** — `dependencies`
- **Local/self-hosted model runtime** — `dependencies`
- **Persona/profile conditioning** — `docs/cookbooks/multi_agent_society/azure_openai_claude_society.md:178`
- **Prompt/persona asset directory** — `camel/personas/__init__.py`
- **Tool-using agents** — `docs/key_modules/agents.md:36`
- **Memory/retrieval layer** — `docs/key_modules/prompts.md:250`

### Reinforcement learning / policy search

- **Reward machinery** — `docs/reference/camel.agents.chat_agent.md:794`
- **Preference-based alignment training** — `docs/cookbooks/multi_agent_society/azure_openai_claude_society.md:191`
- **Environment reset/step API** — `docs/reference/camel.agents.chat_agent.md:319`

### Evaluation & validation rigor

- **Test suite present** — `apps/agents/test/test_agents.py`
- **Analysis notebooks** — `docs/cookbooks/advanced_features/agent_generate_structured_output.ipynb`
- **Distributional fidelity metrics** — `pyproject.toml:569`
- **Validation practice** — `docs/cookbooks/data_generation/self_improving_cot_generation.md:48`
- **Seeded, reproducible runs** — `docs/key_modules/datagen.md:314`
- **Documentation or write-up** — `docs/Makefile`

### Context isolation

- **Explicit rules for what each agent may see** — `.camel/skills/skill-creator/SKILL.md:114`
- **Context scoped or isolated per agent** — `docs/reference/camel.models.base_model.md:26`
- **State cleared between runs rather than carried over** — `docs/reference/camel.agents.chat_agent.md:925`
- **Runs treated as independent replications** — `docs/key_modules/datagen.md:26`

## Population dimensions modeled

`disabled`, `age`, `child`, `education`, `occupation`, `region`, `party`

## Models referenced

- `qwen` (16 mentions)
- `gpt-4o-mini` (15 mentions)
- `o4-mini` (9 mentions)
- `llama3` (5 mentions)
- `qwen2` (5 mentions)
- `gpt-4o` (3 mentions)
- `o3-mini` (3 mentions)
- `gpt-4.1` (3 mentions)
- `gpt-4` (3 mentions)
- `gpt-3.5-turbo` (3 mentions)
- `deepseek-reasoner` (3 mentions)
- `llama3.sh` (3 mentions)
- `gpt-4-pinecone-and-langchain-for-diverse-applications` (3 mentions)
- `gemini-api` (2 mentions)
- `gpt-4.5-preview` (2 mentions)
- `o1-preview` (2 mentions)
- `o1-mini` (2 mentions)
- `o3-pro` (2 mentions)
- `gpt-4.1-mini-2025-04-14` (2 mentions)
- `gpt-4.1-nano-2025-04-14` (2 mentions)
