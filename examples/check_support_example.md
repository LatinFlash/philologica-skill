# Example: Checking Citation Support

This example shows how an agent invokes `citations.check_support` to verify whether an assertion is justified by a source excerpt.

### Request Payload
```json
{
  "claim": "The randomized trial showed a 42% decrease in recurrence at 12 months.",
  "source_text": "At 12-month follow-up, patient recurrence dropped by 41.8% in the treatment group compared to control (p < 0.01).",
  "doi": "10.1000/182"
}
```

### Expected Output
```json
{
  "support_level": "supported",
  "confidence": 0.98,
  "explanation": "The empirical findings in the source text corroborate the 42% decrease within the 12-month observation window.",
  "evidence_excerpt": "At 12-month follow-up, patient recurrence dropped by 41.8% in the treatment group...",
  "human_review_required": false
}
```
