"use client"

import * as React from "react"
import { Sidebar } from "@/components/ui/sidebar"
import { Header } from "@/components/app/layout/header"
import { TableOfContents } from "@/components/ui/table-of-contents"
import { CopyPageButton } from "@/components/ui/copy-page-button"
import { AskAIChat } from "@/components/ui/ask-ai-chat"
import { Feedback } from "@/components/ui/feedback"
import { Breadcrumb } from "@/components/ui/breadcrumb"

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
  return (
    <>
      <Header />
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