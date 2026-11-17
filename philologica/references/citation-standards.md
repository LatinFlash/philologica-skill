# Philologica Citation Standards & Evidence Criteria

Philologica applies rigorous philological rules to prevent hallucinations and misattributions in academic writing.

---

## 1. Support Levels (`ClaimFindingV1`)

When evaluating a claim against a source text or DOI using `citations.check_support`, one of four levels is returned:

### `supported`
- **Definition**: The source text directly entails the core assertion.
- **Criteria**: Quantities, sample sizes, methodology, and conclusions match without exaggeration.
- **Agent Action**: Validate assertion as sound; cite without reservation.

### `partial`
- **Definition**: The source supports a portion of the assertion, but with narrower boundaries.
- **Example**: Source tested a 7-day period; manuscript claims a 14-day effect.
- **Agent Action**: Recommend softening or scoping the claim to match the source exactly.

### `unsupported`
- **Definition**: The source does not support the claim, or the findings directly contradict it.
- **Agent Action**: Flag as a critical citation defect; ask the author to provide the correct source.

### `scope_mismatch`
- **Definition**: The source discusses the broader topic but does not investigate or establish the specific claim.
- **Agent Action**: Advise replacing with a direct primary source.

---

## 2. Unindexed vs. Nonexistent References

In `citations.verify_reference`, Philologica adheres to an essential epistemological principle:

> **Absence of evidence in an index is NOT evidence of nonexistence.**

Many valid humanities sources, archival manuscripts, non-DOI monographs, and regional periodicals do not appear in Crossref or OpenAlex.
- If a reference returns `recoverability: "unindexed"`, the agent must not assume it is fabricated.
- The agent should mark it as needing manual author review rather than deleting it.
