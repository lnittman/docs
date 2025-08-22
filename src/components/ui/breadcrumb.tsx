import * as React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  title: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn('flex items-center gap-1 text-xs font-mono text-gray-600', className)}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight className="h-3 w-3" />}
          {item.href ? (
            <Link 
              href={item.href}
              className="hover:text-black transition-colors lowercase"
            >
              {item.title.toLowerCase()}
            </Link>
          ) : (
            <span className="text-black lowercase font-medium">
              {item.title.toLowerCase()}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}