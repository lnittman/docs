import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  title: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      className={cn(
        'flex items-center gap-1 font-mono text-gray-600 text-xs',
        className
      )}
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight className="h-3 w-3" />}
          {item.href ? (
            <Link
              className="lowercase transition-colors hover:text-black"
              href={item.href}
            >
              {item.title.toLowerCase()}
            </Link>
          ) : (
            <span className="font-medium text-black lowercase">
              {item.title.toLowerCase()}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
