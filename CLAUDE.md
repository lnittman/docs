# Developer Documentation Hub - Claude Code Context

## Project Overview

This is a meta-repository containing documentation, patterns, and prompts designed to accelerate development with AI tools. It serves as a centralized knowledge base that can be imported into any development project.

**Version**: 1.0.0  
**Type**: Documentation Repository  
**Purpose**: AI-optimized developer knowledge base

## Architecture

- **Structure**: Modular documentation system with cross-references
- **Format**: Markdown with AI-optimized metadata and structure
- **Integration**: Designed for `@path/to/file` imports in Claude Code

## Key Directories

- `/apps/` - Application documentation standards and patterns
- `/prompts/` - Reusable prompt templates (XML and Markdown)
- `/tools/` - Tool-specific guides and power user documentation
- `/reference/` - Quick reference guides and cheatsheets
- `/inspo/` - Design philosophy and thought leadership from masters

## Usage Patterns

### Importing Documentation

```markdown
# Import full documents

@~/Developer/docs/apps/docs.md

# Import specific sections

@~/Developer/docs/tools/claude-code-power-user.md#memory-management

# Chain multiple contexts

@~/Developer/docs/apps/patterns.md
@~/Developer/docs/prompts/code/execute.xml
```

### Creating Project CLAUDE.md

When creating CLAUDE.md files for new projects, import relevant standards:

```markdown
# Project Name

## Import Standards

@~/Developer/docs/apps/docs.md
@~/Developer/docs/apps/patterns.md

## Project-Specific Rules

- Additional rules here
```

## Documentation Standards

- All files include version, date, and purpose metadata
- Consistent formatting following CommonMark specification
- Example-driven with practical code samples
- Progressive disclosure: overview → details → examples → edge cases
- Cross-reference rich with related content links

## Maintenance Guidelines

- Review and update documentation monthly
- Archive outdated content to `/archive/`
- Version control all changes with meaningful commits
- Test all code examples before documenting

## Current Focus

- Building comprehensive AI-first documentation system
- Creating reusable patterns for common development tasks
- Optimizing for Claude Code and other AI tool consumption

## Missing Components

- [ ] .docindex.json for machine-readable navigation
- [ ] Architecture diagrams and visual documentation
- [ ] Automated validation system for code examples
- [ ] Version compatibility matrix

## Quick Commands

```bash
# Search for patterns
grep -r "pattern-name" .

# Find all prompts
find ./prompts -name "*.xml" -o -name "*.md"

# List recent updates
git log --oneline -10
```

