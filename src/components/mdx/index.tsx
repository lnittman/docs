"use client"

import { cn } from "@/lib/utils"
import { Copy } from "lucide-react"
import React from "react"

const Pre = ({ className, children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
  const [copied, setCopied] = React.useState(false)
  
  const handleCopy = () => {
    const code = extractTextFromChildren(children)
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <div className="relative mb-4">
      <pre
        className={cn(
          "overflow-x-auto p-4 bg-black text-[#00ff00] border-2 border-black font-mono text-sm",
          className
        )}
        {...props}
      >
        {children}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 bg-black/80 hover:bg-black text-[#00ff00] transition-colors"
      >
        {copied ? (
          <span className="text-xs uppercase">Copied!</span>
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
    </div>
  )
}

export const mdxComponents = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "mt-8 mb-4 text-4xl font-bold uppercase tracking-wider font-mono",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "mt-8 mb-4 text-2xl font-bold uppercase tracking-wider font-mono border-b-2 border-black pb-2",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "mt-6 mb-3 text-xl font-bold uppercase tracking-wider font-mono",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "mt-4 mb-2 text-lg font-bold uppercase tracking-wider font-mono",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn("mb-4 leading-7", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn("mb-4 ml-6 list-disc space-y-2", className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn("mb-4 ml-6 list-decimal space-y-2", className)}
      {...props}
    />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <li
      className={cn("leading-7", className)}
      {...props}
    />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className={cn(
        "mb-4 border-l-4 border-black pl-4 italic",
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    // Check if this is inline code (parent is not pre)
    const isInline = props.children && typeof props.children === 'string'
    
    if (isInline) {
      return (
        <code
          className={cn(
            "px-1 py-0.5 bg-gray-100 border border-gray-300 font-mono text-sm",
            className
          )}
          {...props}
        />
      )
    }
    
    return <code className={cn("font-mono text-sm", className)} {...props} />
  },
  pre: Pre,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="mb-4 w-full overflow-auto">
      <table
        className={cn(
          "w-full border-2 border-black",
          className
        )}
        {...props}
      />
    </div>
  ),
  thead: ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead
      className={cn("bg-black text-white", className)}
      {...props}
    />
  ),
  tbody: ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody
      className={cn("[&_tr:nth-child(even)]:bg-gray-50", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "border border-gray-300 px-4 py-2 text-left font-bold uppercase tracking-wider font-mono text-sm",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "border border-gray-300 px-4 py-2",
        className
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn(
        "underline underline-offset-4 hover:text-gray-600 transition-colors",
        className
      )}
      {...props}
    />
  ),
  hr: ({ ...props }) => (
    <hr className="my-8 border-t-2 border-black" {...props} />
  ),
}

function extractTextFromChildren(children: React.ReactNode): string {
  if (typeof children === 'string') return children
  if (React.isValidElement(children)) {
    const props = children.props as { children?: React.ReactNode }
    if (props.children) {
      return extractTextFromChildren(props.children)
    }
  }
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join('')
  }
  return ''
}