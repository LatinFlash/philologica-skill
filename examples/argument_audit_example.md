# Example: Dialectical Argument Audit

This example demonstrates how an agent uses `arguments.inspect` to detect unwarranted inferential leaps.

### Request Payload
```json
{
  "text": "The sample size in region A was double that of region B. Therefore, public health policies in region A are inherently superior to those in region B."
}
```

### Expected Output
```json
{
  "claims": [
    "Sample size in region A was double region B",
    "Public health policies in region A are inherently superior"
  ],
  "unsupported_leaps": [
    {
      "from": "Sample size in region A was double region B",
      "to": "Public health policies in region A are superior",
      "critique": "Conflation between empirical observational cohort size and the substantive quality or efficacy of public policy."
    }
  ]
}
```
