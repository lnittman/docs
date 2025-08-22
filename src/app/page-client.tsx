"use client"

import * as React from "react"
import { Sidebar } from "@/components/ui/sidebar"
import { ChatSidebar } from "@/components/ui/chat-sidebar"
import { Header } from "@/components/app/layout/header"

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

interface PageLayoutProps {
  children: React.ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  const [isChatOpen, setIsChatOpen] = React.useState(false)

  return (
    <>
      <Header onChatClick={() => setIsChatOpen(!isChatOpen)} />
      <div className="flex min-h-screen pt-16">
        <Sidebar items={sidebarItems} className="fixed left-0 top-16 h-[calc(100vh-4rem)]" />
        <main className={`flex-1 ml-64 transition-all duration-300 ${isChatOpen ? 'mr-80' : ''}`}>
          <div className="container max-w-4xl mx-auto px-8 py-12">
            <article className="prose prose-lg max-w-none">
              {children}
            </article>
          </div>
        </main>
        <ChatSidebar isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    </>
  )
}