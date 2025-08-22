import { MDXRemote } from "next-mdx-remote/rsc"
import { mdxComponents } from "@/components/mdx"

const introductionContent = `# introduction

documentation for the system.

## features

- terminal aesthetic
- MDX support
- fast navigation
- code highlighting
- responsive design

## principles

1. dense, not sparse
2. explicit over implicit
3. flat navigation
4. performance first

## getting started

see [quick start](/docs/quick-start) to begin.

\`\`\`javascript
// example
function greet(name) {
  console.log(\`hello, \${name}\`);
}

greet("world");
\`\`\`

> terminal aesthetic demonstration.

### lists

- item one with **bold**
- item two with *italic*
- item three with \`code\`

### table

| feature | status | notes |
|---------|--------|-------|
| MDX | ✅ | ready |
| terminal | ✅ | ready |
| search | 🚧 | soon |
| AI | 🚧 | soon |
`

export async function IntroductionContent() {
  return (
    <MDXRemote
      source={introductionContent}
      components={mdxComponents}
    />
  )
}