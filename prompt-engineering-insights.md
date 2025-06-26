# Prompt Engineering Insights for Repository Rules

## Executive Summary
This document synthesizes best practices from Anthropic Claude and OpenAI Codex documentation for creating effective repository rules files that guide AI coding assistants. The key insight is that well-structured context combined with clear, actionable instructions significantly improves AI code generation quality.

## Core Principles

### 1. Structure Over Content
Both Claude and Codex benefit from well-organized information:
- **Hierarchical Organization**: Start broad, then narrow to specifics
- **Clear Sections**: Use headers and consistent formatting
- **Logical Flow**: Context → Rules → Examples → Troubleshooting

### 2. Specificity Drives Quality
Vague instructions yield inconsistent results:
- ❌ "Write good code"
- ✅ "Use TypeScript interfaces for all React component props"
- ✅ "Functions must not exceed 50 lines"
- ✅ "API responses must return within 200ms"

### 3. Examples Accelerate Understanding
Show, don't just tell:
```markdown
## Good Pattern
```typescript
// Clear error handling with context
try {
  const result = await apiCall();
  return { success: true, data: result };
} catch (error) {
  logger.error('API call failed', { error, context });
  return { success: false, error: error.message };
}
```

## Bad Pattern
```typescript
// Swallowing errors
try {
  return await apiCall();
} catch (e) {
  return null;
}
```
```

## Platform-Specific Optimizations

### Claude Code (CLAUDE.md)
**Strengths:**
- XML tag parsing for structured information
- Import system for modular documentation
- Chain of thought prompting
- Custom command integration

**Optimization Strategy:**
```xml
<claude_context>
  <project_info>Essential project context</project_info>
  <thinking_requirements>Step-by-step analysis</thinking_requirements>
  <code_patterns>Existing patterns to follow</code_patterns>
</claude_context>
```

### OpenAI Codex (AGENTS.md)
**Strengths:**
- YAML frontmatter for metadata
- Hierarchical file precedence
- Glob pattern targeting
- Rule-focused structure

**Optimization Strategy:**
```yaml
---
description: Focused, actionable rules
globs: ["src/**/*.{ts,tsx}"]
priority: 100
---
# Imperative rules that are measurable
```

## Universal Best Practices

### 1. Context Window Management
Both platforms have token limits:
- **Front-load critical information**: Most important rules first
- **Eliminate redundancy**: Don't repeat, reference
- **Use concise language**: Every word counts
- **Structure for scanning**: AI can quickly parse well-formatted content

### 2. Chain of Thought Integration
Encourage systematic thinking:
```markdown
## Before Implementation
1. Analyze existing codebase patterns
2. Identify all dependencies
3. Consider error scenarios
4. Plan test strategy
5. Validate against project conventions
```

### 3. Progressive Disclosure
Layer information by importance:
```markdown
# Critical Rules (Always Apply)
- No any types without justification
- All functions need explicit return types

# Important Guidelines (Usually Apply)
- Prefer composition over inheritance
- Use custom hooks for shared logic

# Suggestions (Consider)
- Consider memoization for expensive operations
- Evaluate need for error boundaries
```

## Advanced Techniques

### 1. Prompt Caching Strategies
Structure content for reuse:
```xml
<!-- Static content (rarely changes) -->
<architecture>Core architectural decisions</architecture>
<conventions>Coding standards</conventions>

<!-- Dynamic content (task-specific) -->
<current_task>Specific implementation details</current_task>
```

### 2. Multi-Modal Instructions
Combine different instruction types:
- **Declarative**: State what should exist
- **Imperative**: Command what to do
- **Interrogative**: Questions to consider
- **Conditional**: If-then scenarios

### 3. Feedback Loops
```markdown
## Validation Checklist
- [ ] Does the code follow existing patterns?
- [ ] Are all edge cases handled?
- [ ] Is the solution performant?
- [ ] Are tests comprehensive?
- [ ] Is documentation complete?
```

## Measuring Effectiveness

### Quality Indicators
1. **Consistency**: AI generates similar patterns for similar problems
2. **Completeness**: Solutions include error handling, tests, and docs
3. **Correctness**: Code follows specified rules without reminders
4. **Efficiency**: Minimal back-and-forth to achieve desired results

### Iteration Strategy
```markdown
Week 1: Baseline rules
- Measure current AI output quality

Week 2: Add examples
- Compare improvement in pattern matching

Week 3: Add troubleshooting
- Evaluate error reduction

Week 4: Optimize structure
- Assess time to correct solution
```

## Common Pitfalls and Solutions

### 1. Over-Specification
**Problem**: Too many rules overwhelm and contradict
**Solution**: Start minimal, add based on actual issues

### 2. Under-Specification
**Problem**: Vague rules lead to inconsistent output
**Solution**: Make rules measurable and provide examples

### 3. Poor Organization
**Problem**: AI can't find relevant information
**Solution**: Use clear hierarchy and consistent formatting

### 4. Static Content
**Problem**: Rules become outdated
**Solution**: Regular reviews and version control

## Implementation Roadmap

### Phase 1: Foundation (Week 1)
- Create basic structure
- Add essential rules
- Include project context

### Phase 2: Enhancement (Week 2)
- Add examples and anti-patterns
- Include troubleshooting guide
- Implement chain of thought

### Phase 3: Optimization (Week 3)
- Refine based on usage
- Add custom commands
- Optimize for caching

### Phase 4: Maintenance (Ongoing)
- Regular reviews
- Team feedback integration
- Performance monitoring

## Key Insights for Ultracite

### Current State
Ultracite currently provides 273 linting rules as a flat list. While comprehensive, this format doesn't leverage modern prompt engineering techniques.

### Recommended Enhancements
1. **Add Project Context**: Brief description of what Ultracite does
2. **Structure Rules**: Group by category with XML/YAML sections
3. **Include Workflow**: Common tasks and commands
4. **Add Examples**: Show good vs bad patterns
5. **Implement Thinking**: Add chain of thought requirements
6. **Provide Troubleshooting**: Common issues and solutions

### Expected Outcomes
- **Better First-Time Success**: AI understands context immediately
- **Fewer Iterations**: Clear examples reduce ambiguity
- **Consistent Quality**: Structured thinking improves output
- **Faster Development**: AI can self-correct using troubleshooting guide

## Conclusion

Effective repository rules combine three elements:
1. **Clear Structure**: Organized information is findable information
2. **Specific Instructions**: Measurable rules with examples
3. **Thinking Framework**: Systematic approach to problem-solving

By implementing these prompt engineering techniques, repository rules transform from simple lists into comprehensive guides that enable AI assistants to generate high-quality, consistent code that aligns with team standards and project requirements.