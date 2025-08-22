import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { mdxComponents } from "@/components/mdx"

// for now, static content
const mockContent: Record<string, { title: string; content: string }> = {
  "installation": {
    title: "installation",
    content: `# installation

get started in minutes.

## prerequisites

- node.js 18+ or bun
- git

## setup

\`\`\`bash
# clone the repository
git clone https://github.com/yourusername/docs.git

# install dependencies
bun install

# run dev server
bun dev
\`\`\`

## configuration

create a \`docs.config.js\` file:

\`\`\`javascript
export default {
  title: 'docs',
  description: 'technical documentation',
  theme: 'terminal',
}
\`\`\`
`,
  },
  "quick-start": {
    title: "quick start",
    content: `# quick start

up and running in 5 minutes.

## create your first page

1. create a new MDX file in \`content/\`
2. add frontmatter
3. write your content

\`\`\`mdx
---
title: my first page
description: learning MDX
---

# my first page

this is my first documentation page.
\`\`\`

## deployment

deploy to vercel:

\`\`\`bash
vercel deploy
\`\`\`
`,
  },
  "architecture": {
    title: "architecture",
    content: `# architecture

system design and structure.

## overview

the documentation system is built with:

- next.js 15 - app router
- MDX - content authoring
- tailwind CSS - styling
- shadcn/ui - components

## directory structure

\`\`\`
.
├── app/           # next.js app router
├── components/    # react components
├── content/       # MDX documentation
├── lib/          # utilities
└── public/       # static assets
\`\`\`

## routing

all routes are file-based using the app router.
`,
  },
  "components": {
    title: "components",
    content: `# components

reusable UI components.

## button

\`\`\`jsx
<Button variant="default">click me</Button>
<Button variant="terminal">terminal style</Button>
\`\`\`

## input

\`\`\`jsx
<Input placeholder="type here..." />
<Input variant="terminal" placeholder="terminal input..." />
\`\`\`

## tabs

\`\`\`jsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">tab 1</TabsTrigger>
    <TabsTrigger value="tab2">tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">content 1</TabsContent>
  <TabsContent value="tab2">content 2</TabsContent>
</Tabs>
\`\`\`
`,
  },
  "styling": {
    title: "styling",
    content: `# styling

design system and theming.

## terminal aesthetic

- monospace fonts
- no rounded corners
- high contrast
- brutalist design

## colors

\`\`\`css
--background: white;
--foreground: black;
--terminal-green: #00ff00;
\`\`\`

## typography

all text uses monospace fonts:

- headings: uppercase, bold
- body: regular weight
- code: terminal green on black
`,
  },
  "api/configuration": {
    title: "configuration",
    content: `# configuration

system configuration options.

## docs.config.js

\`\`\`javascript
export default {
  // site title
  title: 'docs',
  
  // site description
  description: 'documentation',
  
  // theme
  theme: 'terminal',
  
  // navigation
  nav: [
    { label: 'docs', href: '/docs' },
    { label: 'API', href: '/api' },
  ],
}
\`\`\`

## environment variables

\`\`\`bash
# .env.local
NEXT_PUBLIC_SITE_URL=http://localhost:3000
\`\`\`
`,
  },
  "api/functions": {
    title: "functions",
    content: `# functions

utility functions and helpers.

## cn

class name utility:

\`\`\`typescript
import { cn } from '@/lib/utils'

cn('base-class', conditional && 'conditional-class')
\`\`\`

## getDocBySlug

fetch documentation by slug:

\`\`\`typescript
import { getDocBySlug } from '@/lib/docs'

const doc = getDocBySlug('introduction')
\`\`\`

## getAllDocs

get all documentation:

\`\`\`typescript
import { getAllDocs } from '@/lib/docs'

const docs = getAllDocs()
\`\`\`
`,
  },
  "api/hooks": {
    title: "hooks",
    content: `# hooks

react hooks for common patterns.

## useTheme

theme management:

\`\`\`typescript
const { theme, setTheme } = useTheme()

setTheme('terminal')
\`\`\`

## useSearch

search functionality:

\`\`\`typescript
const { query, setQuery, results } = useSearch()

setQuery('MDX')
\`\`\`

## useCopy

clipboard operations:

\`\`\`typescript
const { copy, copied } = useCopy()

copy('text to copy')
\`\`\`
`,
  },
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug: slugArray } = await params
  const slug = slugArray.join("/")
  const doc = mockContent[slug]

  if (!doc) {
    notFound()
  }

  return (
    <article className="prose prose-lg max-w-none">
      <MDXRemote 
        source={doc.content} 
        components={mdxComponents}
      />
    </article>
  )
}