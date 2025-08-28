import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { DocsLayout } from '@/app/docs-layout';
import { MDXContent } from '@/components/mdx-content';

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'content');
  const paths: { slug: string[] }[] = [];

  function readDirectory(dir: string, parentPath: string[] = []) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        readDirectory(filePath, [...parentPath, file]);
      } else if (file.endsWith('.mdx')) {
        const slug =
          file === 'index.mdx'
            ? parentPath
            : [...parentPath, file.replace('.mdx', '')];

        paths.push({ slug });
      }
    }
  }

  readDirectory(contentDir);
  paths.push({ slug: [] }); // Add root path

  return paths;
}

async function getMDXContent(slug: string[]) {
  const contentDir = path.join(process.cwd(), 'content');

  // Handle root path
  if (slug.length === 0) {
    const indexPath = path.join(contentDir, 'index.mdx');
    if (fs.existsSync(indexPath)) {
      const content = fs.readFileSync(indexPath, 'utf8');
      return matter(content);
    }
  }

  // Try direct file path
  const mdxPath = `${path.join(contentDir, ...slug)}.mdx`;
  if (fs.existsSync(mdxPath)) {
    const content = fs.readFileSync(mdxPath, 'utf8');
    return matter(content);
  }

  // Try index file in directory
  const indexPath = path.join(contentDir, ...slug, 'index.mdx');
  if (fs.existsSync(indexPath)) {
    const content = fs.readFileSync(indexPath, 'utf8');
    return matter(content);
  }

  // Try README.mdx in directory
  const readmePath = path.join(contentDir, ...slug, 'README.mdx');
  if (fs.existsSync(readmePath)) {
    const content = fs.readFileSync(readmePath, 'utf8');
    return matter(content);
  }

  return null;
}

function extractTOC(content: string) {
  const lines = content.split('\n');
  const tocItems: Array<{ id: string; title: string; level: number }> = [];
  const idCounts = new Map<string, number>();

  for (const line of lines) {
    const match = line.match(/^(#{1,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const title = match[2];
      let baseId = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

      // Make ID unique if it already exists
      const count = idCounts.get(baseId) || 0;
      const id = count > 0 ? `${baseId}-${count}` : baseId;
      idCounts.set(baseId, count + 1);

      tocItems.push({ id, title, level });
    }
  }

  return tocItems;
}

function generateBreadcrumbs(slug: string[]) {
  const breadcrumbs: Array<{ title: string; href?: string }> = [
    { title: 'docs', href: '/' },
  ];
  let currentPath = '';

  for (let i = 0; i < slug.length; i++) {
    currentPath += `/${slug[i]}`;
    if (i === slug.length - 1) {
      breadcrumbs.push({
        title: slug[i].replace(/-/g, ' '),
      });
    } else {
      breadcrumbs.push({
        title: slug[i].replace(/-/g, ' '),
        href: currentPath,
      });
    }
  }

  return breadcrumbs;
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];
  const mdxData = await getMDXContent(slug);

  if (!mdxData) {
    notFound();
  }

  const tocItems = extractTOC(mdxData.content);
  const breadcrumbs = generateBreadcrumbs(slug);

  return (
    <DocsLayout breadcrumbs={breadcrumbs} tocItems={tocItems}>
      <MDXContent content={mdxData.content} />
    </DocsLayout>
  );
}

export const dynamicParams = false;
