"use client"

import * as React from "react"
import { Sidebar } from "@/components/ui/sidebar"
import { ChatSidebar } from "@/components/ui/chat-sidebar"
import { Header } from "@/components/app/layout/header"
import { TableOfContents } from "@/components/ui/table-of-contents"
import { CopyPageButton } from "@/components/ui/copy-page-button"
import { AskAIButton } from "@/components/ui/ask-ai-button"
import { Feedback } from "@/components/ui/feedback"
import { Breadcrumb } from "@/components/ui/breadcrumb"

const sidebarItems = [
  {
    title: "getting started",
    items: [
      { title: "introduction", href: "/" },
      { title: "installation", href: "/docs/installation" },
      { title: "quick start", href: "/docs/quick-start" },
    ],
  },
  {
    title: "core concepts",
    items: [
      { title: "architecture", href: "/docs/architecture" },
      { title: "components", href: "/docs/components" },
      { title: "styling", href: "/docs/styling" },
    ],
  },
  {
    title: "API reference",
    items: [
      { title: "configuration", href: "/docs/api/configuration" },
      { title: "functions", href: "/docs/api/functions" },
      { title: "hooks", href: "/docs/api/hooks" },
    ],
  },
]

interface DocsLayoutProps {
  children: React.ReactNode
  tocItems?: Array<{ id: string; title: string; level: number }>
  breadcrumbs?: Array<{ title: string; href?: string }>
}

export function DocsLayout({ children, tocItems = [], breadcrumbs = [] }: DocsLayoutProps) {
  const [isChatOpen, setIsChatOpen] = React.useState(false)

  // Extract headings for TOC if not provided
  React.useEffect(() => {
    if (tocItems.length === 0) {
      const headings = document.querySelectorAll('article h2, article h3')
      Array.from(headings).map((heading) => ({
        id: heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, '-') || '',
        title: heading.textContent || '',
        level: parseInt(heading.tagName.substring(1))
      }))
      // Dynamic TOC extraction - items are passed from parent
    }
  }, [tocItems])

  return (
    <>
      <Header onChatClick={() => setIsChatOpen(!isChatOpen)} />
      <div className="flex min-h-screen pt-16">
        {/* Left Sidebar */}
        <Sidebar items={sidebarItems} className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64" />
        
        {/* Main Content */}
        <main className="flex-1 ml-64">
          <div className="max-w-4xl mx-auto px-8 py-8">
            {/* Breadcrumb */}
            {breadcrumbs.length > 0 && (
              <Breadcrumb items={breadcrumbs} className="mb-4" />
            )}
            
            {/* Page Header with Copy Button */}
            <div className="flex items-start justify-between mb-8">
              <div className="flex-1">
                {children}
              </div>
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

        {/* Chat Sidebar */}
        <ChatSidebar isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
      
      {/* Floating Ask AI Button */}
      <AskAIButton />
    </>
  )
}