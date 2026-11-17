import fs from 'fs';
import path from 'path';

function runValidation() {
    const rootDir = process.cwd();
    let hasErrors = false;

    function reportError(msg) {
        console.error(`[FAIL] ${msg}`);
        hasErrors = true;
    }

    function reportSuccess(msg) {
        console.log(`[PASS] ${msg}`);
    }

    // 1. Check README.md and LICENSE
    ['README.md', 'LICENSE'].forEach(file => {
        const p = path.join(rootDir, file);
        if (fs.existsSync(p)) {
            reportSuccess(`${file} exists`);
        } else {
            reportError(`${file} is missing in repository root`);
        }
    });

    // 2. Validate SKILL.md
    const skillPath = path.join(rootDir, 'philologica', 'SKILL.md');
    if (!fs.existsSync(skillPath)) {
        reportError('philologica/SKILL.md does not exist');
    } else {
        const skillContent = fs.readFileSync(skillPath, 'utf8');
        const lines = skillContent.split(/\r?\n/);

        if (!skillContent.startsWith('---')) {
            reportError('SKILL.md does not begin with YAML frontmatter delimiter (---)');
        } else {
            reportSuccess('SKILL.md starts with frontmatter delimiter (---)');
        }

        const frontmatterEnd = skillContent.indexOf('---', 3);
        if (frontmatterEnd === -1) {
            reportError('SKILL.md frontmatter is not properly terminated');
        } else {
            const frontmatter = skillContent.slice(3, frontmatterEnd);
            const nameMatch = frontmatter.match(/name:\s*([^\r\n]+)/);
            const descMatch = frontmatter.match(/description:\s*([^\r\n]+)/);

            if (!nameMatch || nameMatch[1].trim() !== 'philologica') {
                reportError(`SKILL.md frontmatter name must be 'philologica', found: '${nameMatch ? nameMatch[1].trim() : 'none'}'`);
            } else {
                reportSuccess("SKILL.md frontmatter name is 'philologica'");
            }

            if (!descMatch || descMatch[1].trim().length === 0) {
                reportError('SKILL.md frontmatter description is missing or empty');
            } else {
                reportSuccess('SKILL.md frontmatter description is present');
            }
        }

        if (lines.length > 500) {
            reportError(`SKILL.md exceeds 500 lines limit (${lines.length} lines)`);
        } else {
            reportSuccess(`SKILL.md length is concise (${lines.length} lines <= 500)`);
        }

        // Check relative references
        const refMatches = [...skillContent.matchAll(/references\/([a-zA-Z0-9_\-]+\.md)/g)];
        refMatches.forEach(match => {
            const refFileName = match[1];
            const fullRefPath = path.join(rootDir, 'philologica', 'references', refFileName);
            if (fs.existsSync(fullRefPath)) {
                reportSuccess(`Referenced document exists: references/${refFileName}`);
            } else {
                reportError(`Referenced file does not exist: references/${refFileName}`);
            }
        });
    }

    // 3. Validate mcp-config JSON files
    const mcpConfigDir = path.join(rootDir, 'mcp-config');
    if (!fs.existsSync(mcpConfigDir)) {
        reportError('mcp-config directory does not exist');
    } else {
        const jsonFiles = fs.readdirSync(mcpConfigDir).filter(f => f.endsWith('.json'));
        if (jsonFiles.length === 0) {
            reportError('No JSON files found in mcp-config directory');
        } else {
            jsonFiles.forEach(file => {
                const filePath = path.join(mcpConfigDir, file);
                try {
                    const content = fs.readFileSync(filePath, 'utf8');
                    JSON.parse(content);
                    if (content.includes('https://mcp.philologica.com/v1/agent/mcp')) {
                        reportSuccess(`mcp-config/${file} is valid JSON and references production MCP endpoint`);
                    } else {
                        reportError(`mcp-config/${file} does not contain https://mcp.philologica.com/v1/agent/mcp`);
                    }
                } catch (e) {
                    reportError(`mcp-config/${file} parsing error: ${e.message}`);
                }
            });
        }
    }

    if (hasErrors) {
        console.error('\nValidation failed.');
        process.exit(1);
    } else {
        console.log('\nAll checks passed successfully.');
    }
}

runValidation();
