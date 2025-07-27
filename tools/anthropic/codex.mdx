# OpenAI Codex Best Practices

## Overview
OpenAI Codex powers AI coding assistants by understanding project context through AGENTS.md files. These files provide project-specific rules and guidelines that help Codex generate code that aligns with your team's standards and patterns.

## AGENTS.md File Structure

### YAML Frontmatter
```yaml
---
description: Project-specific coding rules and guidelines
globs: "**/*.{ts,tsx,js,jsx}"  # Target specific file types
alwaysApply: true              # Apply to all matching files
scope: project                 # Can be: project, directory, or file
priority: 100                  # Higher numbers override lower ones
---
```

### Hierarchical File Organization
```
project-root/
├── AGENTS.md              # Root-level rules (priority: 100)
├── src/
│   ├── AGENTS.md         # Source-specific rules (priority: 200)
│   └── components/
│       └── AGENTS.md     # Component-specific rules (priority: 300)
```

**Precedence Rules:**
- Deeper files override parent files
- Higher priority numbers take precedence
- More specific glob patterns win

## Content Guidelines

### 1. Project Context Section
```markdown
# Project Overview
This is a TypeScript monorepo using Next.js and React. We follow strict type safety and functional programming principles.

## Architecture
- Frontend: Next.js 14 with App Router
- State Management: Zustand
- Styling: Tailwind CSS with CSS Modules

## Key Conventions
- Functional components only (no class components)
- Custom hooks for shared logic
- Composition over inheritance
```

### 2. Coding Standards
```markdown
# Coding Standards

## TypeScript Rules
- Always use explicit return types for functions
- Prefer interfaces over type aliases for object shapes
- No `any` types without explicit justification
- Use strict null checks

## React Patterns
- Use function components with TypeScript
- Implement error boundaries for all routes
- Prefer controlled components
- Extract complex logic into custom hooks

## File Organization
- One component per file
- Group by feature, not by file type
```

### 3. Rule Writing Best Practices

**Use Imperative Mood:**
```markdown
✅ Use async/await instead of promises
✅ Implement error boundaries for all page components

❌ You should use async/await
❌ Error boundaries should be implemented
```

**Be Specific and Measurable:**
```markdown
✅ Functions must not exceed 50 lines
✅ Components must have TypeScript prop interfaces
✅ API calls must include timeout of 30 seconds

❌ Keep functions small
❌ Use TypeScript properly
❌ Handle timeouts appropriately
```

### 4. Development Workflow
```markdown
# Development Workflow

## Getting Started
1. Run `pnpm install` to install dependencies
2. Copy `.env.example` to `.env.local`
3. Run `pnpm dev` to start development server

## Common Commands
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm lint` - Run linter
- `pnpm format` - Format code

## Git Workflow
1. Create feature branch from main
2. Make changes with atomic commits
4. Create PR with description template
5. Ensure CI passes before merging
```
## Advanced Patterns

### 1. Glob Pattern Usage
```yaml
---
globs:
  - "src/components/**/*.tsx"  # React components
  - "src/api/**/*.ts"          # API routes
  - "!**/node_modules/**"      # Exclude dependencies
---
```

### 2. Multi-Section Organization
```markdown
# Component Development
Rules specific to React components...

# API Development  
Rules specific to API endpoints...

# Database Operations
Rules specific to database queries...

# Performance Guidelines
Rules specific to performance optimization...
```

### 3. Example-Driven Rules
```markdown
## API Error Handling

Always wrap API routes with error handling:

```typescript
// ✅ Good: Comprehensive error handling
export async function GET(request: Request) {
  try {
    const data = await fetchData();
    return NextResponse.json(data);
  } catch (error) {
    logger.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// ❌ Bad: No error handling
export async function GET(request: Request) {
  const data = await fetchData();
  return NextResponse.json(data);
}
```
```

### 4. Troubleshooting Section
```markdown
# Common Issues and Solutions

## TypeScript Errors
- "Cannot find module": Check tsconfig paths
- "Type 'any' is not assignable": Enable strict mode
- "Property does not exist": Add proper type definitions

## Build Failures
- Clear `.next` directory and rebuild
- Check for circular dependencies
- Verify environment variables are set
```

## Integration Tips

### 1. Progressive Enhancement
Start with basic rules and gradually add more specific ones:
```markdown
Week 1: Basic style rules
Week 2: Add architectural patterns
Week 3: Include performance guidelines
Week 4: Add troubleshooting guides
```

### 2. Team Collaboration
```markdown
# Contributing to AGENTS.md
1. Propose changes in team meeting
2. Create PR with rule changes
3. Get review from 2 team members
4. Update after team feedback
5. Monitor AI compliance
```

### 3. Validation
```markdown
# Validating Rules
- Use linters to enforce rules programmatically
- Regular code reviews to check compliance
- Metrics tracking for rule effectiveness
```

### 4. Performance Considerations
```markdown
# Optimizing AGENTS.md
- Keep file under 10KB for fast parsing
- Use clear section headers
- Avoid repetitive content
- Link to detailed docs instead of embedding
- Regular cleanup of outdated rules
```

## Best Practices Summary

1. **Structure**: Use YAML frontmatter and clear sections
2. **Scope**: Leverage hierarchical files for different contexts
3. **Clarity**: Write rules in imperative mood with examples
4. **Specificity**: Make rules measurable and actionable
5. **Maintenance**: Regular reviews and updates
6. **Integration**: Include workflow and troubleshooting info
7. **Validation**: Use automated tools to enforce rules

## Key Differences from Claude Code

| Feature | AGENTS.md (Codex) | CLAUDE.md (Claude) |
|---------|-------------------|-------------------|
| Format | YAML frontmatter + Markdown | Pure Markdown |
| Location | Multiple files with hierarchy | Single file with imports |
| Scope | Glob patterns | Import syntax |
| Structure | Rule-focused | Context + instructions |
| Caching | File-based precedence | XML cache control |
