# Ethical-Tech-CoLab/AI-Models-Research

> Research knowledge base on AI models: architecture, training, evaluation, inference, hardware, and model profiles — an Ethical Tech CoLab project

[https://github.com/Ethical-Tech-CoLab/AI-Models-Research](https://github.com/Ethical-Tech-CoLab/AI-Models-Research) · ★0 · Python · analyzed 2026-08-26

## Axis scores

- **Agent-based simulation** `··········` 5/100
- **Synthetic data generation** `██········` 16/100
- **LLM-based behavioral modeling** `██········` 24/100
- **Reinforcement learning / policy search** `██········` 24/100
- **Evaluation & validation rigor** `██████····` 62/100
- **Context isolation** `██████····` 58/100

Agentic-behavior relevance: **20/100** (primary axis: LLM-based behavioral modeling)

## Evidence

### Agent-based simulation

- **Discrete simulation time** — `.github/PULL_REQUEST_TEMPLATE.md:15`

### Synthetic data generation

- **Real microdata used as a seed** — `limitations.md:39`
- **Sampling machinery** — `docs/04-training-and-post-training.md:8`

### LLM-based behavioral modeling

- **Persona/profile conditioning** — `glossary.md:101`
- **Tool-using agents** — `docs/model-profiles/other-models.md:69`
- **Memory/retrieval layer** — `docs/02-foundation-models.md:14`

### Reinforcement learning / policy search

- **Reward machinery** — `glossary.md:129`
- **Preference-based alignment training** — `glossary.md:61`

### Evaluation & validation rigor

- **Analysis notebooks** — `notebooks/benchmark-comparison.ipynb`
- **Distributional fidelity metrics** — `docs/20-model-selection-framework.md:40`
- **Validation practice** — `data-sources.md:120`
- **Fairness/representativeness checking** — `docs/09-benchmarking.md:14`
- **Documentation or write-up** — `docs/01-introduction.md`

### Context isolation

- **Explicit rules for what each agent may see** — `docs/02-foundation-models.md:55`
- **Context scoped or isolated per agent** — `docs/07-agentic-ai.md:22`
- **State cleared between runs rather than carried over** — `docs/javascripts/mathjax.js:21`
- **Runs treated as independent replications** — `research-methodology.md:66`
- **Guards against the model's own training reaching the scenario** — `docs/model-profiles/other-models.md:95`
- **Explicit contamination or leakage checking** — `docs/appendices/model-release-timeline.md:8`

## Population dimensions modeled

`region`, `party`, `age`, `disabled`, `race`, `child`, `vulnerability`

## Models referenced

- `gpt-5.6` (15 mentions)
- `qwen` (13 mentions)
- `gpt-5.6-sol` (6 mentions)
- `gemini-3-1-pro` (5 mentions)
- `qwen.md` (4 mentions)
- `claude-fable-5` (3 mentions)
- `claude-opus-4-8` (2 mentions)
- `claude-sonnet-5` (2 mentions)
- `deepseek-v4-pro` (2 mentions)
- `gpt-5.6-luna` (2 mentions)
- `gpt-5.6-terra` (2 mentions)
- `qwen2026realworld` (1 mentions)
- `qwen2026agent` (1 mentions)
- `deepseek-v4-flash` (1 mentions)
- `mistral-medium-3-5` (1 mentions)
- `mistral-small-4` (1 mentions)
- `qwen-3-6` (1 mentions)
- `gpt-example` (1 mentions)
