'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface SidebarItem {
  title: string
  href?: string
  items?: SidebarItem[]
}

interface SidebarProps {
  items: SidebarItem[]
  className?: string
}

export function Sidebar({ items, className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className={cn(
      'fixed left-0 top-16 bottom-0 w-64',
      'bg-white border-r-4 border-black',
      'font-mono text-sm',
      'overflow-y-auto',
      className
    )}>
      <nav className="p-4">
        {items.map((item, index) => (
          <SidebarSection key={index} item={item} pathname={pathname} />
        ))}
      </nav>
    </aside>
  )
}

function SidebarSection({ item, pathname }: { item: SidebarItem; pathname: string }) {
  const [isOpen, setIsOpen] = React.useState(true)
  const hasChildren = item.items && item.items.length > 0

  if (!hasChildren && item.href) {
    return (
      <Link
        href={item.href}
        className={cn(
          'block px-2 py-1 hover:bg-black hover:text-white transition-none',
          pathname === item.href && 'bg-black text-white'
        )}
      >
        {item.title}
      </Link>
    )
  }

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 w-full text-left px-2 py-1 uppercase tracking-wider font-bold hover:bg-black/10"
      >
        <span className="text-xs">{isOpen ? '▼' : '▶'}</span>
        {item.title}
      </button>
      {isOpen && hasChildren && (
        <div className="ml-4 mt-1">
          {item.items!.map((subItem, index) => (
            <SidebarSection key={index} item={subItem} pathname={pathname} />
          ))}
        </div>
      )}
    </div>
  )
}