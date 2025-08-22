'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send } from 'lucide-react'
import { cn } from '@/lib/utils'

// Hook to detect mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return isMobile
}

// Hook to auto-close on desktop transition
function useAutoCloseOnDesktop(isOpen: boolean, onClose: () => void) {
  React.useEffect(() => {
    if (!isOpen) return

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        onClose()
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen, onClose])
}

// Desktop Chat Panel
function DesktopChatPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = React.useState<Array<{ role: 'user' | 'assistant', content: string }>>([])
  const [input, setInput] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  const panelRef = React.useRef<HTMLDivElement>(null)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  // Auto-scroll to bottom
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Auto-resize textarea
  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      const scrollHeight = textareaRef.current.scrollHeight
      const maxHeight = 120 // Max 5 lines
      textareaRef.current.style.height = Math.min(scrollHeight, maxHeight) + 'px'
    }
  }, [input])

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'i can help you navigate the docs. this feature is coming soon!' 
      }])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <motion.div
      ref={panelRef}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ 
        duration: 0.3,
        ease: [0.23, 1, 0.32, 1] // Linear-style easing
      }}
      className={cn(
        'fixed bottom-20 right-6 z-40',
        'w-96 h-[500px] bg-white border-4 border-black',
        'flex flex-col'
      )}
    >
      {/* Header */}
      <div className="border-b-2 border-black p-4 flex items-center justify-between">
        <h3 className="font-mono font-bold lowercase">ask about docs</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
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
                  ? 'bg-gray-100 border-2 border-gray-300 ml-8' 
                  : 'bg-black text-white mr-8'
              )}
            >
              {msg.content}
            </div>
          ))
        )}
        {isLoading && (
          <div className="bg-black text-white p-3 mr-8">
            <div className="flex gap-1">
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              >
                •
              </motion.span>
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 }}
              >
                •
              </motion.span>
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }}
              >
                •
              </motion.span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t-2 border-black p-4">
        <div className="flex gap-2 p-2 bg-gray-50 border-2 border-black">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type your question..."
            className={cn(
              'flex-1 bg-transparent',
              'font-mono text-sm lowercase',
              'focus:outline-none resize-none',
              'placeholder:text-gray-400'
            )}
            rows={1}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={cn(
              'px-3 py-1 transition-all',
              input.trim() && !isLoading
                ? 'bg-black text-white hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            )}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </motion.div>
  )
}

// Mobile Chat Overlay
function MobileChatOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = React.useState<Array<{ role: 'user' | 'assistant', content: string }>>([])
  const [input, setInput] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  // Auto-close when transitioning to desktop
  useAutoCloseOnDesktop(isOpen, onClose)

  // Auto-resize textarea
  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      const scrollHeight = textareaRef.current.scrollHeight
      const maxHeight = 120 // Max 5 lines
      textareaRef.current.style.height = Math.min(scrollHeight, maxHeight) + 'px'
    }
  }, [input])

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'i can help you navigate the docs. this feature is coming soon!' 
      }])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <>
      {/* Full page overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed inset-0 z-[100] bg-white"
      />

      {/* Chat content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.4,
          ease: [0.23, 1, 0.32, 1],
          delay: 0.1
        }}
        className="fixed inset-0 z-[101] flex flex-col"
      >
        {/* Header */}
        <div className="bg-gray-50 border-b-4 border-black px-4 py-3">
          <div className="flex items-center justify-between">
            <h3 className="font-mono font-bold lowercase">ask about docs</h3>
            <button
              onClick={onClose}
              className="p-2 -m-2 hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-black flex items-center justify-center mb-4 mx-auto">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-mono font-bold lowercase mb-2">ready to help</h3>
                <p className="text-sm font-mono text-gray-600">
                  ask me anything about the documentation
                </p>
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'p-3 font-mono text-sm',
                    msg.role === 'user' 
                      ? 'bg-gray-100 border-2 border-gray-300 ml-8' 
                      : 'bg-black text-white mr-8'
                  )}
                >
                  {msg.content}
                </div>
              ))}
              {isLoading && (
                <div className="bg-black text-white p-3 mr-8">
                  <div className="flex gap-1">
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                    >
                      •
                    </motion.span>
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 }}
                    >
                      •
                    </motion.span>
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }}
                    >
                      •
                    </motion.span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Input */}
        <div className="border-t-4 border-black p-4 bg-gray-50">
          <form onSubmit={handleSubmit} className="flex gap-2 p-3 bg-white border-2 border-black">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type your question..."
              className={cn(
                'flex-1 bg-transparent',
                'font-mono text-sm lowercase',
                'focus:outline-none resize-none',
                'placeholder:text-gray-400'
              )}
              rows={1}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className={cn(
                'px-3 py-1 transition-all',
                input.trim() && !isLoading
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              )}
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </motion.div>
    </>
  )
}

// Main Ask AI Button Component
export function AskAIChat() {
  const [isOpen, setIsOpen] = React.useState(false)
  const isMobile = useIsMobile()

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className={cn(
          'fixed bottom-6 right-6 z-50',
          'bg-black text-white border-2 border-black',
          'px-4 py-3 font-mono text-sm lowercase',
          'transition-all duration-200'
        )}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
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

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          isMobile ? (
            <MobileChatOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
          ) : (
            <DesktopChatPanel onClose={() => setIsOpen(false)} />
          )
        )}
      </AnimatePresence>
    </>
  )
}