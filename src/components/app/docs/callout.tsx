'use client';

import type * as React from 'react';
import { cn } from '@/lib/utils';

interface CalloutProps {
  type?: 'info' | 'warning' | 'error' | 'success' | 'terminal';
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Callout({
  type = 'info',
  title,
  children,
  className,
}: CalloutProps) {
  const typeStyles = {
    info: 'border-black bg-blue-50 text-black',
    warning: 'border-yellow-600 bg-yellow-50 text-yellow-900',
    error: 'border-red-600 bg-red-50 text-red-900',
    success: 'border-green-600 bg-green-50 text-green-900',
    terminal: 'border-[#00ff00] bg-black text-[#00ff00]',
  };

  const typeIcons = {
    info: 'ℹ',
    warning: '⚠',
    error: '✕',
    success: '✓',
    terminal: '>',
  };

  return (
    <div
      className={cn(
        'border-2 p-4 font-mono text-sm',
        typeStyles[type],
        className
      )}
    >
      <div className="flex gap-3">
        <span className="select-none text-lg">{typeIcons[type]}</span>
        <div className="flex-1">
          {title && (
            <div className="mb-2 font-bold uppercase tracking-wider">
              {title}
            </div>
          )}
          <div className="leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}
