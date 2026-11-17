# Philologica MCP Error Handling & Metering

Guidelines for managing API errors, quotas, and retries.

---

## 1. Metering & Philologica Units (PU)

Every tool invocation deducts a fixed number of Philologica Units (PU) based on computational complexity:

| Tier | Tools | PU per Call |
| :--- | :--- | :--- |
| **Lookup / Graph Read** | `bibliography.lookup`, `graph.get_source`, `graph.get_evidence` | 1 PU |
| **Verification / Normalization** | `citations.verify_reference`, `bibliography.normalize`, `terminology.check`, `graph.get_claim`, `graph.trace_claim`, `graph.find_unsupported_claims`, `graph.find_citation_gaps`, `graph.get_argument_map` | 2 PU |
| **Evidence Analysis** | `citations.check_support` | 3 PU |
| **Argument Inspection** | `arguments.inspect` | 4 PU |
| **Fragment Review** | `fragments.review` | 5 PU |
| **Manuscript Preflight** | `manuscript.preflight`, `manuscript.preflight.v2` | 20 PU |

---

## 2. Standard Error Codes

When `isError: true` is returned, the JSON response contains an `error` object with one of the following codes:

### `AUTH_REQUIRED` / `INVALID_API_KEY`
- **Cause**: Missing or invalid `PHILOLOGICA_API_KEY`.
- **Action**: Alert the user to check their API key in their MCP client configuration.

### `SCOPE_DENIED`
- **Cause**: The key does not have the necessary scope (e.g., `citations:read`, `manuscript:review`).
- **Action**: Inform the user about the missing permission scope.

### `RATE_LIMITED`
- **Cause**: Request frequency exceeded tier limits.
- **Payload**: Contains `retry_after_seconds`.
- **Action**: The agent should wait for the specified duration before re-executing the call.

### `USAGE_EXCEEDED` / `INSUFFICIENT_FUNDS`
- **Cause**: Account balance depleted of PU credits.
- **Action**: Report to the user that their Philologica quota is exhausted.

### `PAYLOAD_TOO_LARGE`
- **Cause**: Text exceeds the payload limit (e.g. 500 KB for preflight).
- **Action**: Split the text by section or chapter and process incrementally.

### `INVALID_INPUT`
- **Cause**: Missing required parameter (e.g. calling `graph.get_claim` without `claim_id`).
- **Action**: Validate parameters against `references/tool-reference.md`.
