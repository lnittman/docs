"use client"

import * as React from "react"
import { Sidebar } from "@/components/ui/sidebar"
import { Header } from "@/components/app/layout/header"
import { TableOfContents } from "@/components/ui/table-of-contents"
import { CopyPageButton } from "@/components/ui/copy-page-button"
import { AskAIChat } from "@/components/ui/ask-ai-chat"
import { Feedback } from "@/components/ui/feedback"
import { Breadcrumb } from "@/components/ui/breadcrumb"
import { Menu, X, PanelLeftClose, PanelLeft } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const sidebarItems = [
  {
    title: "overview",
    items: [
      { title: "introduction", href: "/" },
      { title: "prompts showcase", href: "/prompts-showcase" },
    ],
  },
  {
    title: "architecture",
    items: [
      { title: "overview", href: "/architecture/overview" },
      { title: "patterns", href: "/architecture/patterns" },
      { title: "services", href: "/architecture/services" },
      { title: "standards", href: "/architecture/standards" },
      { title: "turborepo", href: "/architecture/turborepo" },
      { title: "apple", href: "/architecture/apple" },
      { title: "claude", href: "/architecture/claude" },
      { title: "audit", href: "/architecture/audit" },
    ],
  },
  {
    title: "design",
    items: [
      { title: "overview", href: "/design" },
      { title: "design patterns", href: "/design/design-patterns" },
      { title: "fonts", href: "/design/fonts/jgs" },
    ],
  },
  {
    title: "ecosystem",
    items: [
      { title: "overview", href: "/ecosystem" },
    ],
  },
  {
    title: "prompts",
    items: [
      { title: "overview", href: "/prompts" },
    ],
  },
  {
    title: "inspiration",
    items: [
      { title: "overview", href: "/inspiration" },
    ],
  },
  {
    title: "tools",
    items: [
      { title: "overview", href: "/tools" },
    ],
  },
  {
    title: "stack",
    items: [
      { title: "overview", href: "/stack" },
    ],
  },
]

interface DocsLayoutProps {
  children: React.ReactNode
  tocItems?: Array<{ id: string; title: string; level: number }>
  breadcrumbs?: Array<{ title: string; href?: string }>
}

export function DocsLayout({ children, tocItems = [], breadcrumbs = [] }: DocsLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = React.useState(false)

  // Close mobile sidebar on route change
  React.useEffect(() => {
    setIsSidebarOpen(false)
  }, [breadcrumbs])

  return (
    <>
      <Header />
      
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={cn(
          "fixed top-4 left-4 z-50 p-2",
          "bg-white border-2 border-black",
          "hover:bg-gray-100 transition-colors",
          "md:hidden"
        )}
        aria-label="Toggle menu"
      >
        {isSidebarOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </button>

      {/* Desktop Sidebar Toggle */}
      <button
        onClick={() => setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed)}
        className={cn(
          "fixed top-20 z-30 p-2",
          "bg-white border-2 border-black",
          "hover:bg-gray-100 transition-all duration-200",
          "hidden md:block",
          isDesktopSidebarCollapsed ? "left-4" : "left-[248px]"
        )}
        aria-label="Toggle sidebar"
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
              initial={{ x: -256, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -256, opacity: 0 }}
              transition={{ 
                duration: 0.3, 
                ease: [0.23, 1, 0.32, 1]
              }}
              className="hidden md:block"
            >
              <Sidebar 
                items={sidebarItems} 
                className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 z-20" 
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/50 z-40 md:hidden"
                onClick={() => setIsSidebarOpen(false)}
              />
              
              {/* Mobile Sidebar */}
              <motion.div
                initial={{ x: -256 }}
                animate={{ x: 0 }}
                exit={{ x: -256 }}
                transition={{ 
                  duration: 0.3,
                  ease: [0.23, 1, 0.32, 1]
                }}
                className="fixed left-0 top-0 h-full z-50 md:hidden"
              >
                <Sidebar 
                  items={sidebarItems} 
                  className="h-full w-64 border-r-4" 
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
        
        {/* Main Content */}
        <main className={cn(
          "flex-1 transition-all duration-300",
          isDesktopSidebarCollapsed ? "md:ml-0" : "md:ml-64"
        )}>
          <div className="max-w-4xl mx-auto px-6 md:px-8 py-8">
            {/* Breadcrumb */}
            {breadcrumbs.length > 0 && (
              <Breadcrumb items={breadcrumbs} className="mb-4" />
            )}
            
            {/* Page Content */}
            <div className="flex-1">
              {children}
            </div>
            
            {/* Feedback */}
            <Feedback />
          </div>
        </main>

        {/* Right TOC Sidebar */}
        {tocItems.length > 0 && (
          <aside className="hidden xl:block w-64 pr-8">
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
  )
}