'use client';

import Image from 'next/image';
import Link from 'next/link';
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
            <Button
              asChild
              className="hidden sm:inline-flex"
              size="sm"
              variant="outline"
            >
              <a
                href="https://github.com/lnittman/docs"
                rel="noopener noreferrer"
                target="_blank"
              >
                github
              </a>
            </Button>
            <Button
              onClick={() => {
                // Open current page content in Claude
                const content =
                  document.querySelector('article')?.innerText || '';
                const url = `https://claude.ai/new?q=${encodeURIComponent(content.substring(0, 1000))}`;
                window.open(url, '_blank');
              }}
              size="sm"
              variant="default"
            >
              open in claude
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
