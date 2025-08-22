import { Sidebar } from "@/components/ui/sidebar"
import { Header } from "@/components/app/layout/header"

// This would normally come from your docs structure
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

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <div className="flex min-h-screen pt-16">
        <Sidebar items={sidebarItems} className="fixed left-0 top-16 h-[calc(100vh-4rem)]" />
        <main className="flex-1 ml-64">
          <div className="container max-w-4xl mx-auto px-8 py-12">
            {children}
          </div>
        </main>
      </div>
    </>
  )
}