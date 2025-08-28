'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { cn } from '@/lib/utils';

interface SidebarItem {
  title: string;
  href?: string;
  items?: SidebarItem[];
}

interface SidebarProps {
  items: SidebarItem[];
  className?: string;
}

export function Sidebar({ items, className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'fixed top-16 bottom-0 left-0 w-64',
        'border-black border-r-4 bg-white',
        'font-mono text-sm',
        'overflow-y-auto',
        className
      )}
    >
      <nav className="p-4">
        {items.map((item, index) => (
          <SidebarSection item={item} key={index} pathname={pathname} />
        ))}
      </nav>
    </aside>
  );
}

function SidebarSection({
  item,
  pathname,
}: {
  item: SidebarItem;
  pathname: string;
}) {
  const [isOpen, setIsOpen] = React.useState(true);
  const hasChildren = item.items && item.items.length > 0;

  if (!hasChildren && item.href) {
    return (
      <Link
        className={cn(
          'block px-2 py-1 transition-none hover:bg-black hover:text-white',
          pathname === item.href && 'bg-black text-white'
        )}
        href={item.href}
      >
        {item.title}
      </Link>
    );
  }

  return (
    <div className="mb-4">
      <button
        className="flex w-full items-center gap-2 px-2 py-1 text-left font-bold uppercase tracking-wider hover:bg-black/10"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xs">{isOpen ? '▼' : '▶'}</span>
        {item.title}
      </button>
      {isOpen && hasChildren && (
        <div className="mt-1 ml-4">
          {item.items?.map((subItem, index) => (
            <SidebarSection item={subItem} key={index} pathname={pathname} />
          ))}
        </div>
      )}
    </div>
  );
}
