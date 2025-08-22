'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-40',
      'bg-white border-b-4 border-black',
      'font-mono',
      className
    )}>
      <div className="max-w-full px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 ml-12 md:ml-0">
            <div className="w-8 h-8 bg-black" />
            <span className="text-lg font-bold lowercase tracking-wider">
              docs
            </span>
          </Link>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1">
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
            <Button variant="outline" size="sm" asChild className="hidden sm:inline-flex">
              <a href="https://github.com/lnittman/docs" target="_blank" rel="noopener noreferrer">
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