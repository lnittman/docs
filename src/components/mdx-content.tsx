import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import React from "react"

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  children?: React.ReactNode
}

type ElementProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode
}

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  children?: React.ReactNode
}

type CodeProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode
  className?: string
}

// Custom MDX components for documentation
const Card = ({ title, icon, href, children, color }: any) => (
  <a href={href} className="block p-4 border-2 border-black hover:bg-gray-50 transition-colors mb-4">
    <h3 className="font-bold mb-2">{title}</h3>
    <p className="text-sm">{children}</p>
  </a>
)

const CardGroup = ({ children, cols }: any) => (
  <div className="grid gap-4 mb-8" style={{ gridTemplateColumns: `repeat(${cols || 1}, 1fr)` }}>
    {children}
  </div>
)

const Tip = ({ children }: any) => (
  <div className="p-4 bg-blue-50 border-l-4 border-blue-500 mb-4">
    <p className="font-semibold mb-1">Tip</p>
    {children}
  </div>
)

const Warning = ({ children }: any) => (
  <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 mb-4">
    <p className="font-semibold mb-1">Warning</p>
    {children}
  </div>
)

const Note = ({ children }: any) => (
  <div className="p-4 bg-gray-50 border-l-4 border-gray-500 mb-4">
    <p className="font-semibold mb-1">Note</p>
    {children}
  </div>
)

const components = {
  // Custom components
  Card,
  CardGroup,
  Tip,
  Warning,
  Note,
  // Standard HTML elements
  h1: ({ children, ...props }: HeadingProps) => (
    <h1 className="text-3xl font-bold mb-6 mt-8 lowercase" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: HeadingProps) => (
    <h2 className="text-2xl font-bold mb-4 mt-6 lowercase" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: HeadingProps) => (
    <h3 className="text-xl font-bold mb-3 mt-4 lowercase" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }: ElementProps) => (
    <p className="mb-4 leading-relaxed" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: ElementProps) => (
    <ul className="mb-4 ml-6 list-disc space-y-1" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: ElementProps) => (
    <ol className="mb-4 ml-6 list-decimal space-y-1" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: ElementProps) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  code: ({ children, className, ...props }: CodeProps) => {
    const isInline = !className
    return isInline ? (
      <code className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 font-mono text-sm" {...props}>
        {children}
      </code>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    )
  },
  pre: ({ children, ...props }: ElementProps) => (
    <pre className="mb-4 p-4 bg-gray-100 border-2 border-black overflow-x-auto font-mono text-sm" {...props}>
      {children}
    </pre>
  ),
  blockquote: ({ children, ...props }: ElementProps) => (
    <blockquote className="mb-4 pl-4 border-l-4 border-black italic" {...props}>
      {children}
    </blockquote>
  ),
  table: ({ children, ...props }: ElementProps) => (
    <div className="mb-4 overflow-x-auto">
      <table className="min-w-full border-2 border-black" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: ElementProps) => (
    <th className="border border-black px-4 py-2 bg-gray-100 font-bold text-left" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: ElementProps) => (
    <td className="border border-black px-4 py-2" {...props}>
      {children}
    </td>
  ),
  a: ({ children, href, ...props }: AnchorProps) => (
    <a
      className="underline hover:no-underline transition-all"
      href={href}
      {...props}
    >
      {children}
    </a>
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-t-2 border-black" {...props} />
  ),
}

interface MDXContentProps {
  content: string
}

export function MDXContent({ content }: MDXContentProps) {
  return (
    <MDXRemote 
      source={content}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: "wrap" }],
            rehypeHighlight,
          ],
        },
      }}
    />
  )
}