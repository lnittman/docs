'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { cn } from '@/lib/utils';

interface SidebarItem {
  title: string;
  href?: string;
  items?: SidebarItem[];
  count?: number;
}

interface SidebarProps {
  items: SidebarItem[];
  className?: string;
  onSearchClick?: () => void;
}

export function Sidebar({ items, className, onSearchClick }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={cn('w-64 border-black border-r-2 bg-white', className)}>
      {/* header with search - brutalist style */}
      <div className="flex h-14 items-center justify-between border-black border-b-2 bg-gray-50 px-4">
        <span className="font-bold text-sm lowercase tracking-wider">
          navigation
        </span>
        {onSearchClick && (
          <button
            aria-label="search"
            className="text-gray-600 transition-colors hover:scale-110 hover:text-black active:scale-95"
            onClick={onSearchClick}
          >
            <Search className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* navigation with Linear-style animations */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="space-y-1 px-3">
          {items.map((item, index) => (
            <SidebarSection item={item} key={index} pathname={pathname} />
          ))}
        </div>
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
  // Check if any child is active to auto-expand
  const hasActiveChild = item.items?.some(
    (subItem) => pathname === subItem.href
  );
  const [isOpen, setIsOpen] = React.useState(hasActiveChild);
  const hasChildren = item.items && item.items.length > 0;

  if (!hasChildren && item.href) {
    const isActive = pathname === item.href;
    return (
      <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 0.98 }}>
        <Link
          className={cn(
            'flex items-center justify-between px-3 py-2 font-medium text-sm transition-all duration-200',
            'border-l-2 hover:bg-gray-100',
            isActive
              ? 'border-black bg-gray-100 font-bold text-black'
              : 'border-transparent text-gray-600 hover:border-gray-400 hover:text-black'
          )}
          href={item.href}
        >
          <span className="lowercase">{item.title}</span>
          {item.count !== undefined && (
            <span className="font-mono text-gray-500 text-xs">
              {item.count}
            </span>
          )}
        </Link>
      </motion.div>
    );
  }

  return (
    <div>
      <motion.button
        className="flex w-full items-center gap-2 px-3 py-2 font-bold text-black text-sm transition-colors hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.15, ease: 'easeInOut' }}
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </motion.div>
        <span className="lowercase tracking-wider">{item.title}</span>
      </motion.button>
      <AnimatePresence initial={false}>
        {isOpen && hasChildren && (
          <motion.div
            animate={{ height: 'auto', opacity: 1 }}
            className="overflow-hidden"
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <div className="mt-1 ml-5 space-y-0.5">
              {item.items?.map((subItem, index) => {
                const isActive = pathname === subItem.href;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      className={cn(
                        'block px-3 py-1.5 text-sm transition-all duration-200',
                        'border-l-2 hover:bg-gray-100',
                        isActive
                          ? 'border-black bg-gray-100 font-medium text-black'
                          : 'border-transparent text-gray-600 hover:border-gray-400 hover:text-black'
                      )}
                      href={subItem.href || '#'}
                    >
                      <span className="lowercase">{subItem.title}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
