# Decision-model recommendation: evidence-linked signal adjudication

Date: 2026-10-11. Status: proposal, not implemented.
Scope: this repository. Public-source-only review.

## Existing system

Reviewed [README](https://github.com/Ethical-Tech-CoLab/agentic-behavior-observatory/blob/dbf685c511a16efafbd459a2e087bf42adfcad00/README.md),
revision `dbf685c511a16efafbd459a2e087bf42adfcad00`.
This is a README-led assessment, not a full analyzer audit.

The observatory reports deterministic source signals with file/line evidence
through a standard-library CLI and browser implementation. Headline relevance
is a formula over signal axes, not a quality grade. It is not already an
expensive LLM analysis pipeline.

## Recommendation

Keep deterministic retrieval and scores. Evaluate an optional semantic
adjudicator for evidence snippets already found:

- actual implementation evidence;
- documentation/example only;
- ambiguous;
- not supporting the detected signal.

Inputs should include bounded surrounding code, path, language and the claimed
signal. Outputs remain separately labeled model assessments with source
locations. Never infer execution or scientific validity from a keyword.

Do not replace the evidence index, compute a new hidden overall quality score,
or silently change parity between CLI and browser outputs.

## Models and deployment boundary

Compare current detections with an improved rule baseline, a local classifier,
Jev Choice, Microsoft-Decision-1 and Sage on the same public fixtures.
The [official TypeSafe authoring guide](https://docs.typesafe.ai/agent-skill.md)
can help identify bounded integration points; it is not a runtime requirement.

Hosted model use changes the privacy contract for private-repository analysis.
Do not forward repository snippets without explicit approval, and do not put
provider keys in browser code. Exact hosted model checkpoints are not available
locally; use a separately licensed local model if egress is disallowed.

## Evaluation

Curate real implementation, copied README examples, unused imports, comments,
test fixtures, generated code and misleading identifiers. Split by repository
or project family, not random snippets from the same project.

Measure precision/recall per signal, false suppression of genuine evidence,
calibration, unknown rate, source-location fidelity, analysis latency and added
cost. Include negated claims and adversarial comments. Compare derived
annotations without changing deterministic scores.

Initial gate: existing analyzer results and locations are unchanged when the
feature is disabled or unavailable. Model errors are explicit, never silently
converted into absence of evidence. Preserve complete deterministic output.

## Economic decision

The hypothesis is lower human false-positive review time, not cheaper model
inference than a pipeline that currently has no LLM. Proceed only after the
benefit exceeds hosted calls, data governance and maintenance costs. Start
offline, then opt-in shadow annotations; retain no-model mode indefinitely.
