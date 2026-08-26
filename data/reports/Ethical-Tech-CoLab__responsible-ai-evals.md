# Ethical-Tech-CoLab/responsible-ai-evals

> Shared ASSERT and B3IQ responsible AI evaluation tooling for Ethical Tech CoLab

[https://github.com/Ethical-Tech-CoLab/responsible-ai-evals](https://github.com/Ethical-Tech-CoLab/responsible-ai-evals) · ★0 · Python · analyzed 2026-08-26

## Axis scores

- **Agent-based simulation** `··········` 4/100
- **Synthetic data generation** `··········` 0/100
- **LLM-based behavioral modeling** `██········` 17/100
- **Reinforcement learning / policy search** `··········` 0/100
- **Evaluation & validation rigor** `████······` 44/100
- **Context isolation** `█·········` 10/100

Agentic-behavior relevance: **13/100** (primary axis: LLM-based behavioral modeling)

## Evidence

### Agent-based simulation

- **Multi-agent framing in prose** — `RESPONSIBLEAI-HOW-TO-GUIDE.md:80`

### LLM-based behavioral modeling

- **Persona/profile conditioning** — `RESPONSIBLEAI-HOW-TO-GUIDE.md:84`
- **Memory/retrieval layer** — `RESPONSIBLEAI-HOW-TO-GUIDE.md:251`

### Evaluation & validation rigor

- **Test suite present** — `tests/test_b3iq_proxy.py`
- **Distributional fidelity metrics** — `RESPONSIBLEAI-HOW-TO-GUIDE.md:22`
- **Validation practice** — `RESPONSIBLEAI-HOW-TO-GUIDE.md:343`

### Context isolation

- **Context scoped or isolated per agent** — `RESPONSIBLEAI-HOW-TO-GUIDE.md:201`

## Population dimensions modeled

`age`

## Models referenced

- `gpt-4o-mini` (3 mentions)
