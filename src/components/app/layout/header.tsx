'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface HeaderProps {
  className?: string
  onChatClick?: () => void
}

export function Header({ className, onChatClick }: HeaderProps) {
  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-40',
      'bg-white border-b-4 border-black',
      'font-mono',
      className
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black" />
            <span className="text-lg font-bold lowercase tracking-wider">
              docs
            </span>
          </Link>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/docs">documentation</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/prompts">prompts</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/inspiration">inspiration</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/ecosystem">ecosystem</Link>
            </Button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {onChatClick && (
              <Button variant="outline" size="sm" onClick={onChatClick}>
                ai chat
              </Button>
            )}
            <Button variant="outline" size="sm" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                github
              </a>
            </Button>
            <Button 
              variant="default" 
              size="sm"
              onClick={() => {
                // Open current page content in Claude
                const content = document.querySelector('article')?.innerText || ''
                const url = `https://claude.ai/new?q=${encodeURIComponent(content.substring(0, 1000))}`
                window.open(url, '_blank')
              }}
            >
              open in claude
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}