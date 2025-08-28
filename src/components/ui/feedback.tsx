'use client';

import { ThumbsDown, ThumbsUp } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/lib/utils';

export function Feedback() {
  const [feedback, setFeedback] = React.useState<'yes' | 'no' | null>(null);

  const handleFeedback = (type: 'yes' | 'no') => {
    setFeedback(type);
  };

  return (
    <div className="mt-16 border-gray-200 border-t-2 pt-8">
      <div className="flex items-center justify-between">
        <p className="font-mono text-gray-600 text-sm">
          was this page helpful?
        </p>
        <div className="flex gap-2">
          <button
            className={cn(
              'border-2 px-3 py-1.5 font-mono text-sm lowercase',
              'transition-all duration-200',
              'hover:scale-[1.02] active:scale-[0.98]',
              feedback === 'yes'
                ? 'border-black bg-black text-white'
                : 'border-gray-300 bg-white text-black hover:border-black'
            )}
            onClick={() => handleFeedback('yes')}
          >
            <ThumbsUp className="mr-1 inline h-3 w-3" />
            yes
          </button>
          <button
            className={cn(
              'border-2 px-3 py-1.5 font-mono text-sm lowercase',
              'transition-all duration-200',
              'hover:scale-[1.02] active:scale-[0.98]',
              feedback === 'no'
                ? 'border-black bg-black text-white'
                : 'border-gray-300 bg-white text-black hover:border-black'
            )}
            onClick={() => handleFeedback('no')}
          >
            <ThumbsDown className="mr-1 inline h-3 w-3" />
            no
          </button>
        </div>
      </div>
      {feedback && (
        <p className="mt-2 font-mono text-gray-500 text-xs">
          thanks for your feedback!
        </p>
      )}
    </div>
  );
}
