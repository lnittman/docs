---
title: "Developer"
sidebarTitle: "Developer"
description: "Centralized knowledge base optimized for AI-assisted development"
---

# Developer Documentation Hub
**Version**: 1.0.0  
**Last Updated**: 2025-01-02  
**Purpose**: Centralized knowledge base optimized for AI-assisted development

## 🎯 Overview

This repository serves as your personal development knowledge base, optimized for use with Claude Code and other AI development tools. It contains reusable prompts, documentation standards, tool guides, and project patterns.

## 📁 Directory Structure

```
~/Developer/docs/
├── apps/                    # Application documentation standards
│   ├── docs.md             # Documentation repository specification
│   └── patterns.md         # Common application patterns
├── design/                 # Design assets and patterns
│   ├── images/             # Logos and UI components
│   └── prompts/            # Design-specific prompts
├── fonts/                  # Typography collection (Git LFS)
│   ├── alcala/             # Alcala trial family
│   ├── stuart/             # Stuart family
│   └── ...                 # Other font families
├── prompts/                # Reusable prompt templates
│   ├── ai/                 # AI integration prompts
│   │   └── mastra.xml      # Mastra framework prompts
│   ├── audit/              # Code audit prompts
│   │   └── turbo.md        # Turborepo audit
│   ├── code/               # Code generation prompts
│   │   ├── code-review.xml # Code review template
│   │   ├── execute.xml     # Execution patterns
│   │   └── sandbox.xml     # Sandbox testing
│   ├── docs/               # Documentation prompts
│   │   ├── document.xml    # General documentation
│   │   ├── document-turborepo.xml
│   │   └── vision.xml      # Vision documents
│   ├── reference/          # Reference materials
│   │   └── v0-prompt.txt   # v0 integration
│   └── state/              # State management
│       ├── state.xml       # State documentation
│       └── state-turborepo.xml
├── tools/                  # Tool-specific documentation
│   ├── anthropic/          # Anthropic official docs
│   ├── claude-code.md      # Claude Code guide
│   ├── claude-code-power-user.md
│   └── codex.md            # OpenAI Codex guide
├── reference/              # Quick reference guides
│   ├── commands.md         # Common commands
│   ├── shortcuts.md        # Keyboard shortcuts
│   └── patterns.md         # Design patterns
└── README.md              # This file
```

## 🚀 Quick Start

### For Claude Code Users

1. **Reference in CLAUDE.md**:
   ```markdown
   # Import documentation standards
   @~/Developer/docs/apps/docs.md
   
   # Import specific patterns
   @~/Developer/docs/apps/patterns.md#state-management
   ```

2. **Use in Commands**:
   ```bash
   # Reference documentation
   @~/Developer/docs/prompts/code/code-review.xml
   "Review this implementation"
   ```

3. **Create Custom Commands**:
   ```bash
   # Reference docs in custom commands
   cat > ~/.claude/commands/standards.md << 'EOF'
   # Apply Documentation Standards
   
   Apply our documentation standards to the current project.
   
   @~/Developer/docs/apps/docs.md
   
   $ARGUMENTS
   EOF
   ```

## 📚 Content Guidelines

### 1. Prompts Directory (`/prompts`)

**Purpose**: Reusable, tested prompts for common tasks

**Format**:
- XML for structured prompts
- Markdown for narrative prompts
- Include examples and expected outputs

**Example Structure**:
```xml
<prompt_name>
  <description>What this prompt accomplishes</description>
  <context>When to use this prompt</context>
  <template>
    The actual prompt template with $PLACEHOLDERS
  </template>
  <examples>
    <example>
      <input>Sample input</input>
      <output>Expected output</output>
    </example>
  </examples>
</prompt_name>
```

### 2. Apps Directory (`/apps`)

**Purpose**: Application development standards and patterns

**Key Documents**:
- `docs.md`: Comprehensive documentation repository specification
- `patterns.md`: Reusable code patterns and architectures
- Project-specific guides

### 3. Tools Directory (`/tools`)

**Purpose**: Tool-specific guides and documentation

**Organization**:
- Official documentation (e.g., `/anthropic/`)
- Power user guides
- Integration patterns
- Tips and tricks

### 4. Reference Directory (`/reference`)

**Purpose**: Quick lookup information

**Content Types**:
- Command cheatsheets
- Keyboard shortcuts
- Common patterns
- Decision matrices

## 🔧 Usage Patterns

### 1. As Context in Claude Code

```bash
# Import entire document
@~/Developer/docs/apps/docs.md

# Import specific section
@~/Developer/docs/tools/claude-code-power-user.md#memory-management

# Chain multiple contexts
@~/Developer/docs/apps/patterns.md
@~/Developer/docs/prompts/code/execute.xml
"Implement using our patterns"
```

### 2. In Project CLAUDE.md Files

```markdown
# Project Name

## Import Standards
@~/Developer/docs/apps/docs.md
@~/Developer/docs/apps/patterns.md

## Project-Specific Rules
- Additional rules here
```

### 3. For Team Sharing

```bash
# Share specific patterns
cp ~/Developer/docs/apps/patterns.md ./team-docs/

# Create team-specific version
cat ~/Developer/docs/apps/docs.md | \
  sed 's/\[projectName\]/OurProject/g' > ./team-docs/our-standards.md
```

## 🎯 Best Practices

### 1. Keep It Modular
- One concept per file
- Use clear, descriptive names
- Link related documents
- Avoid duplication

### 2. Version Control
- Track all changes in git
- Use meaningful commit messages
- Tag stable versions
- Branch for experiments

### 3. Regular Maintenance
- Review monthly for accuracy
- Update with new learnings
- Archive outdated content
- Solicit team feedback

### 4. Optimize for AI
- Use consistent formatting
- Include examples
- Provide context
- Explain the "why"

## 🤖 AI Tool Integration

### Claude Code Optimization

1. **Memory Hierarchy**:
   ```
   Project CLAUDE.md → ~/Developer/docs/ → Tool Memory
   ```

2. **Import Strategy**:
   - Import only what's needed
   - Use section links for specificity
   - Keep imports under 5 levels deep

3. **Custom Commands**:
   ```bash
   # Create commands that reference docs
   ~/.claude/commands/[command].md → @~/Developer/docs/...
   ```

### GitHub Copilot Integration

1. **Comments Reference**:
   ```python
   # Following patterns from ~/Developer/docs/apps/patterns.md
   def implement_pattern():
       pass
   ```

2. **Documentation Comments**:
   ```javascript
   /**
    * @see ~/Developer/docs/apps/patterns.md#error-handling
    */
   ```

## 📈 Maintenance Schedule

### Daily
- [ ] Add new patterns discovered
- [ ] Update command shortcuts used

### Weekly
- [ ] Review and organize new content
- [ ] Update tool documentation
- [ ] Commit changes

### Monthly
- [ ] Audit for outdated information
- [ ] Reorganize if needed
- [ ] Update README
- [ ] Share learnings with team

### Quarterly
- [ ] Major reorganization if needed
- [ ] Archive obsolete content
- [ ] Update all version references
- [ ] Team knowledge sharing session

## 🚧 Contributing

### Adding New Content

1. **Determine correct location** based on content type
2. **Follow existing patterns** in that directory
3. **Include metadata** (date, version, purpose)
4. **Add examples** where applicable
5. **Update relevant indexes** (this README, category READMEs)
6. **Test with AI tools** before committing

### Quality Standards

- ✅ Clear, concise writing
- ✅ Working code examples
- ✅ Proper categorization
- ✅ Cross-references to related content
- ✅ Version compatibility noted
- ✅ Last updated date current

## 🔗 Quick Links

### Most Used Documents
- [Documentation Standards](./apps/docs.md)
- [Claude Code Power User Guide](./tools/claude-code-power-user.md)
- [Common Patterns](./apps/patterns.md)

### Prompt Templates
- [Code Review](./prompts/code/code-review.xml)
- [Documentation Generation](./prompts/docs/document.xml)
- [State Analysis](./prompts/state/state.xml)

### References
- [Command Cheatsheet](./reference/commands.md)
- [Keyboard Shortcuts](./reference/shortcuts.md)

### Inspiration & Philosophy
- [Design & Development Philosophy](./inspo/)
- [Design Thinking Prompts](./prompts/philosophy/design-thinking.md)
- [John Maeda's Simplicity](./inspo/design-and-aesthetics/john-maeda/)
- [Software 2.0 Paradigm](./inspo/ai-and-modern-development/andrej-karpathy/)

---

*This documentation hub is a living resource. Contribute your learnings to help the entire team level up!*