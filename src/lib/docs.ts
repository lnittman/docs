import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const docsDirectory = path.join(process.cwd(), 'content')

export interface DocMeta {
  title: string
  description?: string
  slug: string
  category?: string
  order?: number
}

export interface DocContent extends DocMeta {
  content: string
}

export function getDocSlugs(category?: string): string[] {
  const categoryPath = category ? path.join(docsDirectory, category) : docsDirectory
  
  if (!fs.existsSync(categoryPath)) {
    return []
  }

  const entries = fs.readdirSync(categoryPath, { withFileTypes: true })
  
  return entries
    .filter(entry => entry.isFile() && (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')))
    .map(entry => entry.name.replace(/\.mdx?$/, ''))
}

export function getDocBySlug(slug: string, category?: string): DocContent | null {
  const realSlug = slug.replace(/\.mdx?$/, '')
  const categoryPath = category ? path.join(docsDirectory, category) : docsDirectory
  
  // Try .mdx first, then .md
  let fullPath = path.join(categoryPath, `${realSlug}.mdx`)
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(categoryPath, `${realSlug}.md`)
  }
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug: realSlug,
    title: data.title || realSlug,
    description: data.description,
    category: category || data.category,
    order: data.order,
    content,
  }
}

export function getAllDocs(): DocContent[] {
  const categories = fs.readdirSync(docsDirectory, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)

  const docs: DocContent[] = []

  // Get docs from root
  const rootSlugs = getDocSlugs()
  rootSlugs.forEach(slug => {
    const doc = getDocBySlug(slug)
    if (doc) docs.push(doc)
  })

  // Get docs from categories
  categories.forEach(category => {
    const slugs = getDocSlugs(category)
    slugs.forEach(slug => {
      const doc = getDocBySlug(slug, category)
      if (doc) docs.push(doc)
    })
  })

  return docs.sort((a, b) => (a.order || 999) - (b.order || 999))
}

export function getDocCategories(): string[] {
  if (!fs.existsSync(docsDirectory)) {
    return []
  }

  return fs.readdirSync(docsDirectory, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
}