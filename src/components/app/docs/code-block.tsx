'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
// Button import removed - using plain buttons for now

interface CodeBlockProps {
  children: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
  className?: string
}

export function CodeBlock({ 
  children, 
  language = 'text',
  filename,
  showLineNumbers = true,
  className 
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleOpenInClaude = () => {
    // Implement Claude API integration
    console.log('Opening in Claude...')
  }

  const lines = children.split('\n')

  return (
    <div className={cn(
      'border-2 border-black bg-black text-[#00ff00]',
      'font-mono text-sm',
      className
    )}>
      {/* Header */}
      <div className="border-b-2 border-[#00ff00] px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {filename && (
            <span className="text-xs uppercase tracking-wider">{filename}</span>
          )}
          <span className="text-xs opacity-60">{language}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="text-xs uppercase tracking-wider hover:text-white transition-colors"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={handleOpenInClaude}
            className="text-xs uppercase tracking-wider hover:text-white transition-colors"
          >
            Open in Claude
          </button>
        </div>
      </div>

      {/* Code */}
      <div className="p-4 overflow-x-auto">
        <pre className="m-0">
          {lines.map((line, index) => (
            <div key={index} className="flex">
              {showLineNumbers && (
                <span className="opacity-40 mr-4 select-none">
                  {String(index + 1).padStart(3, ' ')}
                </span>
              )}
              <code>{line || ' '}</code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  )
}