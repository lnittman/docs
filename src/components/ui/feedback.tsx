'use client'

import * as React from 'react'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Feedback() {
  const [feedback, setFeedback] = React.useState<'yes' | 'no' | null>(null)

  const handleFeedback = (type: 'yes' | 'no') => {
    setFeedback(type)
    // Here you would send feedback to your analytics service
    console.log('Feedback:', type)
  }

  return (
    <div className="border-t-2 border-gray-200 mt-16 pt-8">
      <div className="flex items-center justify-between">
        <p className="text-sm font-mono text-gray-600">was this page helpful?</p>
        <div className="flex gap-2">
          <button
            onClick={() => handleFeedback('yes')}
            className={cn(
              'px-3 py-1.5 border-2 font-mono text-sm lowercase',
              'transition-all duration-200',
              'hover:scale-[1.02] active:scale-[0.98]',
              feedback === 'yes' 
                ? 'bg-black text-white border-black' 
                : 'bg-white text-black border-gray-300 hover:border-black'
            )}
          >
            <ThumbsUp className="h-3 w-3 inline mr-1" />
            yes
          </button>
          <button
            onClick={() => handleFeedback('no')}
            className={cn(
              'px-3 py-1.5 border-2 font-mono text-sm lowercase',
              'transition-all duration-200',
              'hover:scale-[1.02] active:scale-[0.98]',
              feedback === 'no' 
                ? 'bg-black text-white border-black' 
                : 'bg-white text-black border-gray-300 hover:border-black'
            )}
          >
            <ThumbsDown className="h-3 w-3 inline mr-1" />
            no
          </button>
        </div>
      </div>
      {feedback && (
        <p className="text-xs font-mono text-gray-500 mt-2">
          thanks for your feedback!
        </p>
      )}
    </div>
  )
}