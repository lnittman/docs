'use client';

import { Diamond, Github, Search, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-40',
        'border-black border-b-4 bg-white',
        'font-mono',
        className
      )}
    >
      <div className="w-full">
        <div className="flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
          {/* Logo */}
          <Link className="ml-12 flex items-center gap-2 md:ml-0" href="/">
            <Image
              alt="luke-docs"
              className="h-8 w-8"
              height={32}
              src="/assets/logo-2.png"
              width={32}
            />
            <span className="font-bold text-lg lowercase tracking-wider">
              luke-docs
            </span>
          </Link>

          {/* Navigation Tabs */}
          <nav className="hidden items-center gap-1 md:flex">
            <Button asChild size="sm" variant="ghost">
              <Link href="/docs">documentation</Link>
            </Button>
            <Button asChild size="sm" variant="ghost">
              <Link href="/prompts">prompts</Link>
            </Button>
            <Button asChild size="sm" variant="ghost">
              <Link href="/inspiration">inspiration</Link>
            </Button>
            <Button asChild size="sm" variant="ghost">
              <Link href="/ecosystem">ecosystem</Link>
            </Button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Diamond Search Button with kbd */}
            <button
              className="relative flex items-center gap-2 px-3 py-1.5 border-2 border-black bg-white hover:bg-gray-50 transition-colors"
              onClick={() => {
                // TODO: Open command menu for search
                console.log('Open search/command menu');
              }}
              type="button"
            >
              <Diamond className="h-4 w-4 fill-current" />
              <span className="text-sm">Search</span>
              <kbd className="ml-2 px-1.5 py-0.5 text-xs border border-gray-300 rounded bg-gray-50">
                ⌘K
              </kbd>
            </button>

            {/* AI Sparkle Button with kbd */}
            <button
              className="relative flex items-center gap-1 p-2 border-2 border-black bg-white hover:bg-gray-50 transition-colors"
              onClick={() => {
                // TODO: Open AI command menu
                console.log('Open AI command menu');
              }}
              title="AI Assistant (Press /)"
              type="button"
            >
              <Sparkles className="h-4 w-4" />
              <kbd className="absolute -bottom-1 -right-1 px-1 py-0.5 text-xs border border-gray-300 rounded bg-white">
                /
              </kbd>
            </button>

            {/* GitHub Icon Button */}
            <a
              className="p-2 border-2 border-black bg-white hover:bg-gray-50 transition-colors"
              href="https://github.com/lnittman/docs"
              rel="noopener noreferrer"
              target="_blank"
              title="View on GitHub"
            >
              <Github className="h-4 w-4 fill-current" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
