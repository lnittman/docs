import { MDXRemote } from "next-mdx-remote/rsc"
import { mdxComponents } from "@/components/mdx"
import { DocsLayout } from "./docs-layout-client"

const introductionContent = `# introduction

a high-performance, terminal-inspired documentation system built for developers who value simplicity and speed.

## get started

if you're new to the system, start here to learn the essentials and make your first API call.

### quick links

- **[quick start](/docs/quick-start)** - set up your development environment
- **[architecture](/docs/architecture)** - learn about the system design
- **[API reference](/docs/api/configuration)** - explore the API documentation

## key features

our documentation system is designed with developer experience in mind:

### terminal aesthetic
embrace the simplicity of terminal interfaces with monospace fonts, sharp corners, and high contrast design.

### MDX support
write documentation in markdown with the power of React components for interactive examples and rich content.

### fast navigation
navigate through documentation with keyboard shortcuts, instant search, and smart linking.

### code highlighting
syntax highlighting for all major programming languages with copy-to-clipboard functionality.

### responsive design
optimized for all screen sizes from mobile to ultra-wide displays.

## core principles

our design philosophy focuses on four key principles:

### 1. dense, not sparse
maximize information density while maintaining readability. every pixel serves a purpose.

### 2. explicit over implicit
clear, unambiguous communication. no hidden behaviors or magic.

### 3. flat navigation
shallow hierarchy for quick access to any documentation page.

### 4. performance first
sub-second page loads, instant search, and smooth interactions.

## example code

here's a simple example to get you started:

\`\`\`javascript
// initialize the client
import { Client } from '@company/sdk'

const client = new Client({
  apiKey: process.env.API_KEY,
  environment: 'production'
})

// make your first request
async function main() {
  const response = await client.getData({
    limit: 10,
    orderBy: 'created_at'
  })
  
  console.log('data:', response.data)
}

main().catch(console.error)
\`\`\`

## configuration

configure the system using environment variables:

\`\`\`bash
# .env.local
API_KEY=your_api_key_here
API_URL=https://api.example.com
ENVIRONMENT=development
\`\`\`

## architecture overview

the system follows a modular architecture:

\`\`\`
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │────▶│     API     │────▶│   Database  │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                    │
       ▼                   ▼                    ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    Cache    │     │   Workers   │     │   Storage   │
└─────────────┘     └─────────────┘     └─────────────┘
\`\`\`

## support

need help? here are your options:

- **[documentation](/docs)** - comprehensive guides and references
- **[github issues](https://github.com)** - report bugs and request features
- **[discord community](https://discord.gg)** - connect with other developers

## next steps

ready to dive deeper? explore these resources:

- **[building your first app](/docs/tutorials/first-app)** - step-by-step tutorial
- **[best practices](/docs/best-practices)** - recommended patterns and conventions
- **[API reference](/docs/api)** - complete API documentation
`

const tocItems = [
  { id: 'get-started', title: 'get started', level: 2 },
  { id: 'key-features', title: 'key features', level: 2 },
  { id: 'core-principles', title: 'core principles', level: 2 },
  { id: 'example-code', title: 'example code', level: 2 },
  { id: 'configuration', title: 'configuration', level: 2 },
  { id: 'architecture-overview', title: 'architecture overview', level: 2 },
  { id: 'support', title: 'support', level: 2 },
  { id: 'next-steps', title: 'next steps', level: 2 },
]

const breadcrumbs = [
  { title: 'docs', href: '/' },
  { title: 'introduction' },
]

export default function HomePage() {
  return (
    <DocsLayout tocItems={tocItems} breadcrumbs={breadcrumbs}>
      <article className="prose prose-lg max-w-none">
        <MDXRemote
          source={introductionContent}
          components={mdxComponents}
        />
      </article>
    </DocsLayout>
  )
}

export const metadata = {
  title: 'introduction - docs',
  description: 'terminal-inspired documentation system',
}