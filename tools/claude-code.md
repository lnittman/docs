# Anthropic Claude Code Best Practices

## Overview
Claude Code is an agentic coding tool that operates directly in your terminal, designed to help developers code faster through natural language commands. It maintains project context awareness and can perform real coding operations.

## CLAUDE.md File Structure

### File Types and Locations
1. **Project Memory**: `./CLAUDE.md`
   - Version controlled, shared with team
   - Contains project-specific instructions
   - Loaded automatically when Claude Code launches

2. **Local Project Memory**: `./CLAUDE.local.md`
   - Gitignored for personal preferences
   - Overrides or extends project memory
   - Useful for individual workflow customizations

3. **User Memory**: `~/.claude/CLAUDE.md`
   - Global preferences across all projects
   - Personal coding style and shortcuts
   - Loaded for every Claude Code session

### Import Syntax
```markdown
# Project Overview
See @README.md for detailed project information

# Development Workflow
- Build commands: @package.json
- Git workflow: @docs/git-instructions.md
- Testing guide: @docs/testing.md
```

**Import Guidelines:**
- Use `@path/to/file` syntax
- Maximum 5 recursive import hops
- Imported files are attached to every prompt
- Be selective to avoid context bloat

## Advanced Prompt Engineering

### XML Tag Structure
```xml
<claude_instructions>
  <project_context>
    <description>Concise project purpose</description>
    <architecture>Key architectural decisions</architecture>
    <tech_stack>Primary technologies used</tech_stack>
  </project_context>
  
  <thinking_process>
    Before any implementation:
    1. Analyze existing patterns
    2. Consider dependencies
    3. Plan approach
    4. Validate against conventions
  </thinking_process>
  
  <code_generation>
    <style>Follow existing patterns in codebase</style>
    <documentation>Include JSDoc for public APIs</documentation>
    <testing>Write tests alongside implementation</testing>
  </code_generation>
</claude_instructions>
```

### Chain of Thought Prompting
```xml
<thinking_requirements>
  <analysis_phase>
    - Understand the request fully
    - Identify all affected components
    - Consider edge cases
    - Plan error handling
  </analysis_phase>
  
  <implementation_phase>
    - Follow existing patterns
    - Maintain consistency
    - Write self-documenting code
    - Include appropriate comments
  </implementation_phase>
  
  <validation_phase>
    - Verify correctness
    - Check style compliance
    - Ensure test coverage
    - Validate performance
  </validation_phase>
</thinking_requirements>
```

## Memory Optimization

### Context Window Management
- Claude 4 models support up to 200K context (≈500 pages)
- Use `/compact` command to manage context
- Structure information hierarchically
- Place frequently used info at the beginning

### Caching Strategies
```xml
<static_context cache_control="ephemeral">
  <!-- Rarely changing information -->
  <coding_standards>...</coding_standards>
  <architecture_patterns>...</architecture_patterns>
</static_context>

<dynamic_context>
  <!-- Task-specific instructions -->
  <current_task>...</current_task>
</dynamic_context>
```

## Custom Commands

### Command Structure
Store in `.claude/commands/` directory:

```bash
# .claude/commands/refactor.sh
#!/bin/bash
# Usage: refactor <component-name>
# Refactors a component to follow new patterns

COMPONENT=$ARGUMENTS

echo "Refactoring $COMPONENT..."
# Implementation steps
```

### Command Integration
```markdown
# Custom Commands
- `/refactor <name>` - Refactor component to new pattern
- `/test-coverage` - Check test coverage for current changes
- `/pr-ready` - Validate changes are ready for PR
```

## Best Practices

### 1. Be Specific
```markdown
❌ "Follow best practices"
✅ "Use 2-space indentation, semicolons required, prefer const over let"
```

### 2. Provide Examples
```xml
<examples>
  <good_pattern>
    <description>Async error handling</description>
    <code>
      try {
        const result = await fetchData();
        return processResult(result);
      } catch (error) {
        logger.error('Fetch failed:', error);
        throw new ApiError('Data unavailable', error);
      }
    </code>
  </good_pattern>
</examples>
```

### 3. Quick Memory Addition
- Prefix any message with `#` to add to memory
- Example: `# Always use pnpm instead of npm`

### 4. Regular Updates
- Use `/memory` to edit memory files
- Review and refine instructions periodically
- Remove outdated information

## Project-Specific Optimizations

### Development Workflow
```xml
<workflow>
  <feature_development>
    1. Create feature branch
    2. Implement with tests
    3. Run linter and formatter
    4. Verify all tests pass
    5. Create descriptive PR
  </feature_development>
  
  <code_review>
    - Self-review first
    - Check for patterns consistency
    - Verify test coverage
    - Validate documentation
  </code_review>
</workflow>
```

### Testing Requirements
```xml
<testing>
  <unit_tests>
    - Minimum 80% coverage
    - Test edge cases
    - Mock external dependencies
  </unit_tests>
  
  <integration_tests>
    - Test API endpoints
    - Verify database operations
    - Check error scenarios
  </integration_tests>
</testing>
```

## Key Takeaways

1. **Structure Matters**: Use clear organization with headers and XML tags
2. **Import Wisely**: Only import truly necessary files
3. **Think First**: Always include chain-of-thought requirements
4. **Stay Concise**: Every word counts toward context limit
5. **Iterate**: Continuously improve based on experience
6. **Cache Smartly**: Separate static from dynamic content
7. **Be Explicit**: Specific instructions yield better results