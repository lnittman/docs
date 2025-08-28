'use client';

import { motion } from 'framer-motion';
import * as React from 'react';
import { cn } from '@/lib/utils';

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
  className?: string;
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = React.useState<string>('');

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -80% 0px',
        threshold: 0.1,
      }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      items.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [items]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={cn('sticky top-20', className)}>
      <div className="border-gray-200 border-l-2">
        <div className="mb-2 px-4 py-2">
          <h3 className="font-bold text-gray-500 text-xs uppercase tracking-wider">
            on this page
          </h3>
        </div>
        <ul className="space-y-1">
          {items.map((item) => (
            <motion.li
              key={item.id}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                className={cn(
                  'w-full px-4 py-1.5 text-left text-sm transition-all duration-200',
                  'hover:bg-gray-50 hover:text-black',
                  item.level > 2 && 'pl-6 text-xs',
                  activeId === item.id
                    ? '-ml-[2px] border-black border-l-2 bg-gray-50 font-medium text-black'
                    : 'text-gray-600'
                )}
                onClick={() => handleClick(item.id)}
              >
                {item.title.toLowerCase()}
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
