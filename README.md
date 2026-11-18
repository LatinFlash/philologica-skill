# Philologica Agent Skill

Open-source agent skill to operate **Philologica** via the Model Context Protocol (MCP).

Compatible with:
- **Claude Code** / **Claude Desktop**
- **Cursor IDE**
- **Google Antigravity** / **Gemini CLI**
- **OpenAI Codex** / Custom Agent Loops

---

## Quick Install

Install the skill into your project workspace with one command:

```bash
npx skills add LatinFlash/philologica-skill
```

Or manually copy the `philologica/` directory into your agent skills path:
```bash
mkdir -p .agents/skills
cp -r philologica .agents/skills/philologica
```

---

## What is Philologica?

Philologica provides academic integrity, citation verification, dialectical argument analysis, and CSL bibliography normalization. Unlike general-purpose LLMs, Philologica evaluates claims against real bibliographic sources (Crossref, OpenAlex) and evidence graphs without hallucinating citations.

---

## Repository Structure

```text
philologica-skill/
├── LICENSE                        # MIT License
├── README.md                      # This file
│
├── philologica/                   # Agent Skill Root (Agent Skills open standard)
│   ├── SKILL.md                   # Main instructions and workflow decision matrix
│   └── references/                # Progressive disclosure references
│       ├── tool-reference.md      # Tool schemas, parameters, and return types
│       ├── error-handling.md      # Rate limits, credits, and recovery strategies
│       ├── citation-standards.md  # Support levels and evidence criteria
│       └── workflows.md           # Step-by-step guides for common tasks
│
├── mcp-config/                    # Ready-to-use client configurations
│   ├── claude_desktop_config.json
│   ├── cursor_mcp.json
│   ├── antigravity_mcp.json
│   └── codex_config.json
│
└── examples/                      # Practical test cases
    ├── check_support_example.md
    ├── argument_audit_example.md
    └── preflight_sample.txt
```

---

## Installation & Setup

### 1. Get an API Key
Obtain an API key from the Philologica Developer Portal (`https://mcp.philologica.com` or your institutional portal).

Set the environment variable:
```bash
export PHILOLOGICA_API_KEY="philo_live_your_key_here"
```

### 2. Configure Your Client

#### Claude Desktop
Add to `claude_desktop_config.json` (see `mcp-config/claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "philologica": {
      "url": "https://mcp.philologica.com/v1/agent/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_PHILOLOGICA_API_KEY"
      }
    }
  }
}
```

#### Cursor IDE
Add to `.cursor/mcp.json` (see `mcp-config/cursor_mcp.json`):
```json
{
  "mcpServers": {
    "philologica": {
      "url": "https://mcp.philologica.com/v1/agent/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_PHILOLOGICA_API_KEY"
      }
    }
  }
}
```

#### Antigravity / Gemini CLI
Add to `~/.gemini/antigravity/mcp_servers.json` (see `mcp-config/antigravity_mcp.json`).

---

## Available Workflows

The skill provides access to Philologica's complete catalog of **16 specialized MCP tools**, structured across stateless editorial audits and persistent evidence graphs:

| Scenario | Primary Tool | When to Use |
| :--- | :--- | :--- |
| **Check Claim Support** | `citations.check_support` | Verify if a specific text excerpt supports an academic claim |
| **Verify Reference** | `citations.verify_reference` | Check if a cited paper actually exists in authoritative databases |
| **Manuscript Preflight** | `manuscript.preflight.v2` | Audit an entire paper for formatting, citation style, and Unicode issues |
| **Inspect Arguments** | `arguments.inspect` | Detect unjustified leaps and dialectical vulnerabilities |
| **Normalize Bibliography**| `bibliography.normalize` | Convert raw references to standard CSL-JSON (APA7, IEEE, Chicago) |
| **Evidence Graph** | `graph.trace_claim` | Trace a claim end-to-end to its original empirical source (`project_id` required) |

---

## Troubleshooting

### Windows / Corporate Antivirus SSL Errors (`unable to get local issuer certificate`)
When installing via `npx skills add LatinFlash/philologica-skill` on Windows systems behind corporate proxies or with SSL inspection antivirus software, Git may fail with `SSL certificate problem: unable to get local issuer certificate`.

Configure Git to use the native Windows Certificate Store (Schannel) instead of OpenSSL:
```bash
git config --global http.sslBackend schannel
```
Then re-run the installation command:
```bash
npx skills add LatinFlash/philologica-skill
```

---

## License

MIT License. See [LICENSE](LICENSE) for details.
