'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

// Button import removed - using plain buttons for now

interface CodeBlockProps {
  children: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({
  children,
  language = 'text',
  filename,
  showLineNumbers = true,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenInClaude = () => {};

  const lines = children.split('\n');

  return (
    <div
      className={cn(
        'border-2 border-black bg-black text-[#00ff00]',
        'font-mono text-sm',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-[#00ff00] border-b-2 px-4 py-2">
        <div className="flex items-center gap-4">
          {filename && (
            <span className="text-xs uppercase tracking-wider">{filename}</span>
          )}
          <span className="text-xs opacity-60">{language}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="text-xs uppercase tracking-wider transition-colors hover:text-white"
            onClick={handleCopy}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            className="text-xs uppercase tracking-wider transition-colors hover:text-white"
            onClick={handleOpenInClaude}
          >
            Open in Claude
          </button>
        </div>
      </div>

      {/* Code */}
      <div className="overflow-x-auto p-4">
        <pre className="m-0">
          {lines.map((line, index) => (
            <div className="flex" key={index}>
              {showLineNumbers && (
                <span className="mr-4 select-none opacity-40">
                  {String(index + 1).padStart(3, ' ')}
                </span>
              )}
              <code>{line || ' '}</code>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
