'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send } from 'lucide-react'
import { cn } from '@/lib/utils'

export function AskAIButton() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const [messages, setMessages] = React.useState<Array<{ role: 'user' | 'assistant', content: string }>>([])
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setMessages(prev => [...prev, { role: 'user', content: query }])
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'i can help you navigate the docs. this feature is coming soon!' 
      }])
    }, 500)
    setQuery('')
  }

  return (
    <>
      <motion.button
        className={cn(
          'fixed bottom-6 right-6 z-50',
          'bg-black text-white border-2 border-black',
          'px-4 py-3 font-mono text-sm lowercase',
          'hover:scale-[1.02] active:scale-[0.98]',
          'transition-all duration-200'
        )}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isOpen ? (
          <X className="h-4 w-4" />
        ) : (
          <div className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span>ask ai</span>
          </div>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'fixed bottom-20 right-6 z-40',
              'w-96 h-[500px] bg-white border-4 border-black',
              'flex flex-col'
            )}
          >
            <div className="border-b-2 border-black p-4">
              <h3 className="font-mono font-bold lowercase">ask about docs</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 ? (
                <p className="text-gray-500 text-sm font-mono">
                  ask me anything about the documentation...
                </p>
              ) : (
                messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      'p-3 font-mono text-sm',
                      msg.role === 'user' 
                        ? 'bg-gray-100 border-2 border-gray-300' 
                        : 'bg-black text-white'
                    )}
                  >
                    {msg.content}
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleSubmit} className="border-t-2 border-black p-4">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="type your question..."
                  className={cn(
                    'flex-1 px-3 py-2',
                    'border-2 border-black',
                    'font-mono text-sm lowercase',
                    'focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2',
                    'placeholder:text-gray-400'
                  )}
                />
                <button
                  type="submit"
                  className={cn(
                    'px-3 py-2',
                    'bg-black text-white border-2 border-black',
                    'hover:scale-[1.02] active:scale-[0.98]',
                    'transition-all duration-200'
                  )}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}