# Ethical-Tech-CoLab/race-condition-mod

> Race Condition fork: DTSF twin backend, GitHub Pages frontend workflow, self-hosted system design

[https://github.com/Ethical-Tech-CoLab/race-condition-mod](https://github.com/Ethical-Tech-CoLab/race-condition-mod) · ★0 · n/a · analyzed 2026-08-26

## Axis scores

- **Agent-based simulation** `██········` 15/100
- **Synthetic data generation** `██········` 16/100
- **LLM-based behavioral modeling** `████······` 37/100
- **Reinforcement learning / policy search** `█·········` 11/100
- **Evaluation & validation rigor** `█████·····` 48/100
- **Context isolation** `██████····` 62/100

Agentic-behavior relevance: **31/100** (primary axis: LLM-based behavioral modeling)

## Evidence

### Agent-based simulation

- **Agent class defined in source** — `web/frontend/src/app/agent-gateway-updates.ts:149`
- **Discrete simulation time** — `agents/utils/README.md:55`
- **Multi-agent framing in prose** — `README.upstream.md:49`

### Synthetic data generation

- **Real microdata used as a seed** — `web/frontend/public/scenarios/nyc/README.md:13`
- **Generation at population scale** — `README.upstream.md:243`

### LLM-based behavioral modeling

- **Persona/profile conditioning** — `docs/guides/adk-agent-performance-optimization.md:206`
- **Generative-agents architecture** — `web/frontend/src/app/components/a2ui/docs/a2ui_angular_rendering_findings.md:220`
- **Tool-using agents** — `agents/planner/skills/gis-spatial-engineering/SKILL.md:45`
- **Memory/retrieval layer** — `agents/planner_with_memory/README.md:17`

### Reinforcement learning / policy search

- **Reward machinery** — `docs/guides/adk-agent-performance-optimization.md:332`

### Evaluation & validation rigor

- **Test suite present** — `agents/planner/tests/test_financial_guardrail.py`
- **Distributional fidelity metrics** — `pyproject.toml:91`
- **Seeded, reproducible runs** — `docs/guides/adk-agent-performance-optimization.md:57`
- **Documentation or write-up** — `docs/AUTONOMOUS-RUN-REPORT-P0-P2.md`

### Context isolation

- **Per-agent private state the other agents are not given** — `web/frontend/docs/code-of-conduct.md:29`
- **Explicit rules for what each agent may see** — `web/frontend/src/app/components/a2ui/docs/A2UI_Generative_Architecture.md:38`
- **Context scoped or isolated per agent** — `docs/guides/adk-agent-performance-optimization.md:283`
- **State cleared between runs rather than carried over** — `docs/guides/adk-agent-performance-optimization.md:469`
- **Runs treated as independent replications** — `docs/P7-MARIUPOL-PREP.md:56`
- **Explicit contamination or leakage checking** — `agents/tests/test_simulation_isolation_e2e.py:686`

## Population dimensions modeled

`race`, `child`, `disabled`, `education`, `region`, `household`, `cohort`, `elderly`, `age`, `gender`, `ethnicity`, `geography`, `religion`, `political`, `disability`, `migration`, `nationality`, `vulnerability`, `party`, `displacement`

## Models referenced

- `gemini-3-flash-preview` (16 mentions)
- `gemini-3.1-flash-lite-preview` (8 mentions)
- `gemini-embedding-001` (8 mentions)
- `gemini-3.1-pro-preview` (3 mentions)
- `gemini-flash-lite-latest` (2 mentions)
- `gemini-backed` (2 mentions)
- `gemini-api` (1 mentions)
- `llama3.2` (1 mentions)
- `gemini-3-flash-lite-preview` (1 mentions)
- `gemini-enriched` (1 mentions)
- `gemini-generated` (1 mentions)
