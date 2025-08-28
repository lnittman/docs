'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { MessageSquare, Send, X } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/lib/utils';

// Hook to detect mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

// Hook to auto-close on desktop transition
function useAutoCloseOnDesktop(isOpen: boolean, onClose: () => void) {
  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        onClose();
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, onClose]);
}

// Desktop Chat Panel
function DesktopChatPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = React.useState<
    Array<{ role: 'user' | 'assistant'; content: string }>
  >([]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Auto-resize textarea
  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 120; // Max 5 lines
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  }, []);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (!input.trim() || isLoading) {
      return;
    }

    const userMessage = input;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'i can help you navigate the docs. this feature is coming soon!',
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className={cn(
        'fixed right-6 bottom-20 z-40',
        'h-[500px] w-96 border-4 border-black bg-white',
        'flex flex-col'
      )}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      ref={panelRef}
      transition={{
        duration: 0.3,
        ease: [0.23, 1, 0.32, 1], // Linear-style easing
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-black border-b-2 p-4">
        <h3 className="font-bold font-mono lowercase">ask about docs</h3>
        <button
          className="p-1 transition-colors hover:bg-gray-100"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <p className="font-mono text-gray-500 text-sm">
            ask me anything about the documentation...
          </p>
        ) : (
          messages.map((msg, idx) => (
            <div
              className={cn(
                'p-3 font-mono text-sm',
                msg.role === 'user'
                  ? 'ml-8 border-2 border-gray-300 bg-gray-100'
                  : 'mr-8 bg-black text-white'
              )}
              key={idx}
            >
              {msg.content}
            </div>
          ))
        )}
        {isLoading && (
          <div className="mr-8 bg-black p-3 text-white">
            <div className="flex gap-1">
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.4, repeat: Number.POSITIVE_INFINITY }}
              >
                •
              </motion.span>
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 1.4,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 0.2,
                }}
              >
                •
              </motion.span>
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{
                  duration: 1.4,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 0.4,
                }}
              >
                •
              </motion.span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form className="border-black border-t-2 p-4" onSubmit={handleSubmit}>
        <div className="flex gap-2 border-2 border-black bg-gray-50 p-2">
          <textarea
            className={cn(
              'flex-1 bg-transparent',
              'font-mono text-sm lowercase',
              'resize-none focus:outline-none',
              'placeholder:text-gray-400'
            )}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type your question..."
            ref={textareaRef}
            rows={1}
            value={input}
          />
          <button
            className={cn(
              'px-3 py-1 transition-all',
              input.trim() && !isLoading
                ? 'bg-black text-white hover:scale-[1.02] active:scale-[0.98]'
                : 'cursor-not-allowed bg-gray-200 text-gray-400'
            )}
            disabled={!input.trim() || isLoading}
            type="submit"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </motion.div>
  );
}

// Mobile Chat Overlay
function MobileChatOverlay({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = React.useState<
    Array<{ role: 'user' | 'assistant'; content: string }>
  >([]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Auto-close when transitioning to desktop
  useAutoCloseOnDesktop(isOpen, onClose);

  // Auto-resize textarea
  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 120; // Max 5 lines
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  }, []);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (!input.trim() || isLoading) {
      return;
    }

    const userMessage = input;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'i can help you navigate the docs. this feature is coming soon!',
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      {/* Full page overlay */}
      <motion.div
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-[100] bg-white"
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />

      {/* Chat content */}
      <motion.div
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-[101] flex flex-col"
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        transition={{
          duration: 0.4,
          ease: [0.23, 1, 0.32, 1],
          delay: 0.1,
        }}
      >
        {/* Header */}
        <div className="border-black border-b-4 bg-gray-50 px-4 py-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold font-mono lowercase">ask about docs</h3>
            <button
              className="-m-2 p-2 transition-colors hover:bg-gray-100"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center">
              <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center bg-black">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 font-bold font-mono text-xl lowercase">
                  ready to help
                </h3>
                <p className="font-mono text-gray-600 text-sm">
                  ask me anything about the documentation
                </p>
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, idx) => (
                <div
                  className={cn(
                    'p-3 font-mono text-sm',
                    msg.role === 'user'
                      ? 'ml-8 border-2 border-gray-300 bg-gray-100'
                      : 'mr-8 bg-black text-white'
                  )}
                  key={idx}
                >
                  {msg.content}
                </div>
              ))}
              {isLoading && (
                <div className="mr-8 bg-black p-3 text-white">
                  <div className="flex gap-1">
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{
                        duration: 1.4,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      •
                    </motion.span>
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{
                        duration: 1.4,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: 0.2,
                      }}
                    >
                      •
                    </motion.span>
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{
                        duration: 1.4,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: 0.4,
                      }}
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
        <div className="border-black border-t-4 bg-gray-50 p-4">
          <form
            className="flex gap-2 border-2 border-black bg-white p-3"
            onSubmit={handleSubmit}
          >
            <textarea
              className={cn(
                'flex-1 bg-transparent',
                'font-mono text-sm lowercase',
                'resize-none focus:outline-none',
                'placeholder:text-gray-400'
              )}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type your question..."
              ref={textareaRef}
              rows={1}
              value={input}
            />
            <button
              className={cn(
                'px-3 py-1 transition-all',
                input.trim() && !isLoading
                  ? 'bg-black text-white'
                  : 'cursor-not-allowed bg-gray-200 text-gray-400'
              )}
              disabled={!input.trim() || isLoading}
              type="submit"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </motion.div>
    </>
  );
}

// Main Ask AI Button Component
export function AskAIChat() {
  const [isOpen, setIsOpen] = React.useState(false);
  const isMobile = useIsMobile();

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className={cn(
          'fixed right-6 bottom-6 z-50',
          'border-2 border-black bg-black text-white',
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
        {isOpen &&
          (isMobile ? (
            <MobileChatOverlay
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
            />
          ) : (
            <DesktopChatPanel onClose={() => setIsOpen(false)} />
          ))}
      </AnimatePresence>
    </>
  );
}
