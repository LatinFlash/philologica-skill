# Philologica Workflows Guide

Practical execution guides for integrating Philologica tools into academic editing workflows.

---

## Workflow 1: Anti-Hallucination Citation Audit

**Goal**: Verify assertions in a paper draft to prevent phantom citations or overstatements.

1. **Extraction**: Identify key factual or quantitative claims in the manuscript.
2. **Support Verification**:
   ```json
   {
     "tool": "citations.check_support",
     "arguments": {
       "claim": "The treatment increased survival by 24% over 5 years (Smith et al., 2021).",
       "source_text": "Across the 5-year study, overall survival improved from 51% to 63% in the intervention arm.",
       "doi": "10.1016/j.sample.2021.05.002"
     }
   }
   ```
3. **Assessment**:
   - If `supported`: Keep assertion.
   - If `partial`: Edit claim to reflect exact percentages and time windows.
   - If `unsupported`: Run `citations.verify_reference` to check if the reference was misquoted.

---

## Workflow 2: Journal Submission Preflight

**Goal**: Rapid, deterministic manuscript review before submitting to peer-reviewed journals.

1. **Run Preflight**:
   ```json
   {
     "tool": "manuscript.preflight.v2",
     "arguments": {
       "content": "<FULL_OR_SECTION_TEXT>",
       "options": {
         "expected_citation_style": "author_date",
         "language_hint": "auto"
       }
     }
   }
   ```
2. **Address Diagnostic Findings**:
   - Resolve mixed numbering or unreferenced bibliography entries.
   - Clean up problematic invisible Unicode characters.
   - Review qualitative warnings before sending to reviewers.

---

## Workflow 3: Argument Strength & Non-Sequitur Check

**Goal**: Inspect discussion sections for logical integrity.

1. **Extract Core Argument Section**.
2. **Execute Inspection**:
   ```json
   {
     "tool": "arguments.inspect",
     "arguments": {
       "text": "<PARAGRAPH_OR_SECTION_TEXT>"
     }
   }
   ```
3. **Report Dialectical Leaps**:
   - Highlight claims flagged as `unsupported_leaps`.
   - Formulate constructive bridging statements or hedges to strengthen the paper.

---

## Recommended Two-Step Strategy for Long Manuscripts

When evaluating lengthy papers, monographs, or dissertations, agents should adopt a cost- and latency-optimized **two-step strategy**:

1. **Step 1 — Broad Textual Diagnostic (`manuscript.preflight.v2`)**:
   - Run a single comprehensive pass on the whole manuscript or main sections.
   - This deterministically uncovers global anomalies: unreferenced citations, orphan bibliography entries, mixed citation conventions, and hidden Unicode character artifacts across all chapters.
2. **Step 2 — Targeted Semantic Deep Dive (`citations.check_support` & `arguments.inspect`)**:
   - Rather than sending entire multi-chapter documents to expensive LLM inference, isolate specific problematic paragraphs or suspect claims flagged in Step 1.
   - Execute focused verification calls (`citations.check_support` for empirical claims and `arguments.inspect` for controversial discussion passages).
   - This maximizes analytical precision while keeping latency low and conserving PU credits.
