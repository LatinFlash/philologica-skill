# Philologica MCP Tool Reference

This document provides technical schemas, parameters, and return types for all Philologica MCP tools.

---

## 1. Stateless Tools

### `citations.check_support`
Evaluates whether a target source text or DOI supports a specific academic claim.
- **Billing**: 3 PU
- **Input Parameters**:
  - `claim` (string, required): The assertion to verify.
  - `source_text` (string, optional): Relevant excerpt from the source.
  - `doi` (string, optional): Target DOI for lookup.
- **Output (`ClaimFindingV1`)**:
  - `support_level`: `"supported"` | `"partial"` | `"unsupported"` | `"scope_mismatch"`
  - `confidence`: number (0.0 - 1.0)
  - `explanation`: string
  - `evidence_excerpt`: string
  - `human_review_required`: boolean

---

### `citations.verify_reference`
Checks if a reference exists in authoritative indexes (Crossref, OpenAlex).
- **Billing**: 2 PU
- **Input Parameters**:
  - `reference` (string, required): Raw citation string or metadata object.
- **Output (`ReferenceVerificationV1`)**:
  - `recoverability`: `"indexed"` | `"unindexed"` | `"ambiguous"`
  - `matched_source`: object with DOI, title, authors, container.
  - `doi_valid`: boolean

---

### `manuscript.preflight.v2`
Performs deterministic textual preflight check before journal submission.
- **Billing**: 20 PU
- **Input Parameters**:
  - `content` (string, required): Full manuscript text in UTF-8.
  - `options` (object, optional):
    - `expected_citation_style`: `"numeric"` | `"author_date"` | `"auto"` (default: `"auto"`)
    - `language_hint`: `"es"` | `"en"` | `"de"` | `"fr"` | `"pt"` | `"auto"` (default: `"auto"`)
- **Output (`ManuscriptPreflightV2`)**:
  - `citation_patterns`: summary of detected citation structures.
  - `unicode_health`: flags unexpected control characters or mixed scripts.
  - `multilingual_segmentation`: detects language switches in bibliography.
  - `qualitative_audit`: editorial risk indicators.

---

### `arguments.inspect`
Analyzes argument structure, premises, and logical leaps.
- **Billing**: 4 PU
- **Input Parameters**:
  - `text` (string, required): Text section to examine.
  - `context` (string, optional): Surrounding contextual information.
- **Output (`ArgumentInspectionV1`)**:
  - `claims`: array of extracted claims.
  - `premises`: underlying premises.
  - `unsupported_leaps`: identified logical jumps without bridge evidence.
  - `dialectical_vulnerabilities`: potential counterarguments.

---

### `terminology.check`
Detects inconsistent or ambiguous technical terminology usage.
- **Billing**: 2 PU
- **Input Parameters**:
  - `text` (string, required): Manuscript text.
  - `domain` (string, optional, default: `"general"`): Subject domain.
- **Output (`TerminologyCheckV1`)**:
  - `inconsistencies`: terms used in conflicting senses.
  - `suggestions`: standardization recommendations.

---

### `bibliography.normalize`
Formats raw bibliographic strings into structured CSL-JSON.
- **Billing**: 2 PU
- **Input Parameters**:
  - `references` (array of strings, required): List of raw references.
  - `style` (string, optional, default: `"APA7"`): Target citation format.
- **Output (`BibliographyNormalizationV1`)**:
  - `normalized_entries`: array of formatted strings.
  - `csl_records`: structured CSL-JSON items.

---

### `bibliography.lookup`
Searches open access indexes for citation metadata.
- **Billing**: 1 PU
- **Input Parameters**:
  - `query` (string, required): Search query or title keywords.
  - `limit` (number, optional, default: 5): Max results to return.
- **Output (`BibliographyLookupResultV1`)**:
  - `results`: matching records with DOI, author, title, container, year.

---

## 2. Evidence Graph Tools (Project-Scoped)

All graph tools require `project_id`.

| Tool Name | Required Parameters | Optional Parameters | Description |
| :--- | :--- | :--- | :--- |
| `graph.get_claim` | `project_id`, `claim_id` | - | Fetches claim node and linked findings |
| `graph.get_source` | `project_id`, `source_id` | - | Fetches bibliographic source node |
| `graph.get_evidence` | `project_id`, `evidence_id` | - | Fetches literal evidence excerpt node |
| `graph.trace_claim` | `project_id`, `claim_id` | - | Traces end-to-end evidence path |
| `graph.find_unsupported_claims` | `project_id` | - | Lists claims with weak/missing support |
| `graph.find_citation_gaps` | `project_id` | - | Detects claims lacking bibliographic citations |
| `graph.get_argument_map` | `project_id` | - | Returns dialectic graph structure |
