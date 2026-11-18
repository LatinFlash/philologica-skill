---
name: philologica
description: Open-source Agent Skill to operate Philologica academic integrity, citation checking, and evidence graph tools via MCP.
---

# Philologica Agent Skill

This skill guides intelligent agents in evaluating academic texts, verifying citations, inspecting dialectical arguments, and querying the Philologica evidence graph via the Model Context Protocol (MCP) using a catalog of **16 production tools**.

## Onboarding & Setup

Before executing tasks, verify that the Philologica MCP server is configured:
- Target endpoint: `https://mcp.philologica.com/v1/agent/mcp`
- Authentication header: `Authorization: Bearer <PHILOLOGICA_API_KEY>`
- Pre-made client configurations are located in `mcp-config/` (Claude Desktop, Cursor, Antigravity, Codex).

If the server is unreachable or reports `AUTH_REQUIRED`, notify the user to provide a valid API key.

---

## Decision Matrix: Stateless Tools vs. Project Evidence Graph

When operating on user files, determine whether the task requires stateless verification or persistent graph queries:

### 1. Stateless Operations (Local Files: `.tex`, `.md`, `.docx`, plain text)
No `project_id` required. Use these for direct in-editor auditing:
- **`citations.check_support`**: Test if a citation or excerpt confirms an assertion.
- **`citations.verify_reference`**: Check if a bibliographic reference exists in Crossref / OpenAlex.
- **`manuscript.preflight.v2`**: Perform a deterministic audit of the manuscript before journal submission.
- **`arguments.inspect`**: Detect unstated assumptions, non sequiturs, and dialectical gaps.
- **`terminology.check`**: Check consistency of specialized vocabulary across chapters.
- **`bibliography.normalize`**: Format raw references into CSL-JSON (APA7, IEEE, Chicago).

### 2. Evidence Graph Operations (Project-Scoped)
Requires a valid `project_id` corresponding to a registered Philologica project:
- **`graph.get_claim`**: Retrieve a claim node and its linked evidence (`project_id`, `claim_id`).
- **`graph.get_source`**: Retrieve bibliographic source details (`project_id`, `source_id`).
- **`graph.get_evidence`**: Retrieve literal text excerpt and locator (`project_id`, `evidence_id`).
- **`graph.trace_claim`**: Trace a complete chain: Claim -> Citation -> Source -> Evidence (`project_id`, `claim_id`).
- **`graph.find_unsupported_claims`**: Find claims lacking empirical backing (`project_id`).
- **`graph.find_citation_gaps`**: List claims with unreferenced assertions (`project_id`).
- **`graph.get_argument_map`**: Retrieve the full dialectic topology (`project_id`).

*Note:* If working on a local file and the user requests graph operations, check if they have provided a `project_id`. If not, ask them to supply their Philologica project ID or default to stateless tools.

---

## Core Workflows Summary

1. **Anti-Hallucination & Citation Check:**
   - Run `citations.check_support` on suspect claims.
   - If support is `unsupported` or `scope_mismatch`, run `citations.verify_reference`.

2. **Pre-Submission Journal Audit:**
   - Execute `manuscript.preflight.v2` on the manuscript text.
   - Review citation patterns, unicode integrity, and qualitative flags.

3. **Argument & Logic Review:**
   - Execute `arguments.inspect` on argument-heavy sections (discussion, results).
   - Use `terminology.check` to flag shifts in technical terms.

4. **CSL Bibliography Clean-up:**
   - Use `bibliography.lookup` for missing DOIs.
   - Use `bibliography.normalize` with target style (e.g. `APA7`).

---

## Progressive Disclosure

For detailed technical specifications, consult the reference files:
- [Tool Reference](references/tool-reference.md): Detailed parameter types, outputs, and constraints.
- [Workflows Guide](references/workflows.md): Detailed execution recipes for complex workflows.
- [Error Handling](references/error-handling.md): Handling rate limits, retry headers, and credit quotas.
- [Citation Standards](references/citation-standards.md): Philological evidence definitions and support tiers.
