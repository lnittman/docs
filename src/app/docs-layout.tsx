'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, PanelLeft, PanelLeftClose, X } from 'lucide-react';
import * as React from 'react';
import { Header } from '@/components/app/layout/header';
import { AskAIChat } from '@/components/ui/ask-ai-chat';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { CopyPageButton } from '@/components/ui/copy-page-button';
import { Feedback } from '@/components/ui/feedback';
import { Sidebar } from '@/components/ui/sidebar';
import { TableOfContents } from '@/components/ui/table-of-contents';
import { cn } from '@/lib/utils';

const sidebarItems = [
  {
    title: 'getting started',
    items: [
      { title: 'introduction', href: '/' },
      { title: 'prompts showcase', href: '/prompts-showcase' },
    ],
  },
  {
    title: 'architecture',
    items: [
      { title: 'overview', href: '/architecture/overview' },
      { title: 'patterns', href: '/architecture/patterns' },
      { title: 'services', href: '/architecture/services' },
      { title: 'standards', href: '/architecture/standards' },
      { title: 'turborepo', href: '/architecture/turborepo' },
      { title: 'apple', href: '/architecture/apple' },
      { title: 'claude', href: '/architecture/claude' },
      { title: 'audit', href: '/architecture/audit' },
    ],
  },
  {
    title: 'design',
    items: [
      { title: 'overview', href: '/design/README' },
      { title: 'design patterns', href: '/design/design-patterns' },
      { title: 'typography', href: '/design/typography' },
      { title: 'icons', href: '/design/icons' },
      { title: 'fonts reference', href: '/design/fonts-reference' },
    ],
  },
  {
    title: 'ecosystem',
    items: [{ title: 'overview', href: '/ecosystem/README' }],
  },
  {
    title: 'workflows',
    items: [
      {
        title: 'high yield commands',
        href: '/workflows/high-yield-command-workflows',
      },
    ],
  },
  {
    title: 'diagrams',
    items: [{ title: 'overview', href: '/diagrams/README' }],
  },
  {
    title: 'inspiration',
    items: [{ title: 'overview', href: '/inspiration/README' }],
  },
  {
    title: 'tools',
    items: [{ title: 'overview', href: '/tools/README' }],
  },
];

interface DocsLayoutProps {
  children: React.ReactNode;
  tocItems?: Array<{ id: string; title: string; level: number }>;
  breadcrumbs?: Array<{ title: string; href?: string }>;
}

export function DocsLayout({
  children,
  tocItems = [],
  breadcrumbs = [],
}: DocsLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] =
    React.useState(false);

  // Close mobile sidebar on route change
  React.useEffect(() => {
    setIsSidebarOpen(false);
  }, []);

  return (
    <>
      <Header />

      {/* Mobile Menu Button */}
      <button
        aria-label="Toggle menu"
        className={cn(
          'fixed top-4 left-4 z-50 p-2',
          'border-2 border-black bg-white',
          'transition-colors hover:bg-gray-100',
          'md:hidden'
        )}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </button>

      {/* Desktop Sidebar Toggle */}
      <button
        aria-label="Toggle sidebar"
        className={cn(
          'fixed top-20 left-4 z-30 p-2',
          'border-2 border-black bg-white',
          'transition-colors hover:bg-gray-100',
          'hidden md:block'
        )}
        onClick={() => setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed)}
      >
        {isDesktopSidebarCollapsed ? (
          <PanelLeft className="h-4 w-4" />
        ) : (
          <PanelLeftClose className="h-4 w-4" />
        )}
      </button>

      <div className="flex min-h-screen pt-16">
        {/* Desktop Sidebar */}
        <AnimatePresence mode="wait">
          {!isDesktopSidebarCollapsed && (
            <motion.div
              animate={{ x: 0, opacity: 1 }}
              className="hidden md:block"
              exit={{ x: -256, opacity: 0 }}
              initial={{ x: -256, opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: [0.23, 1, 0.32, 1],
              }}
            >
              <Sidebar
                className="fixed top-16 left-0 z-20 h-[calc(100vh-4rem)] w-64"
                items={sidebarItems}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                animate={{ opacity: 1 }}
                className="fixed inset-0 z-40 bg-black/50 md:hidden"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                transition={{ duration: 0.2 }}
              />

              {/* Mobile Sidebar */}
              <motion.div
                animate={{ x: 0 }}
                className="fixed top-0 left-0 z-50 h-full md:hidden"
                exit={{ x: -256 }}
                initial={{ x: -256 }}
                transition={{
                  duration: 0.3,
                  ease: [0.23, 1, 0.32, 1],
                }}
              >
                <Sidebar
                  className="h-full w-64 border-r-4"
                  items={sidebarItems}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main
          className={cn(
            'flex-1 transition-all duration-300',
            isDesktopSidebarCollapsed ? 'md:ml-0' : 'md:ml-64'
          )}
        >
          <div className="mx-auto max-w-4xl px-6 py-8 md:px-8">
            {/* Breadcrumb */}
            {breadcrumbs.length > 0 && (
              <Breadcrumb className="mb-4" items={breadcrumbs} />
            )}

            {/* Page Content */}
            <div className="flex-1">{children}</div>

            {/* Feedback */}
            <Feedback />
          </div>
        </main>

        {/* Right TOC Sidebar */}
        {tocItems.length > 0 && (
          <aside className="hidden w-64 pr-8 xl:block">
            <div className="sticky top-20 pt-8">
              <CopyPageButton />
              <div className="mt-6">
                <TableOfContents items={tocItems} />
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Floating Ask AI Button */}
      <AskAIChat />
    </>
  );
}
