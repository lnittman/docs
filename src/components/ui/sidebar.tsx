"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronRight, Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface SidebarItem {
  title: string
  href?: string
  items?: SidebarItem[]
  count?: number
}

interface SidebarProps {
  items: SidebarItem[]
  className?: string
  onSearchClick?: () => void
}

export function Sidebar({ items, className, onSearchClick }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className={cn(
      "w-64 border-r-2 border-black bg-white",
      className
    )}>
      {/* header with search - brutalist style */}
      <div className="flex h-14 items-center justify-between border-b-2 border-black px-4 bg-gray-50">
        <span className="text-sm font-bold lowercase tracking-wider">navigation</span>
        {onSearchClick && (
          <button
            onClick={onSearchClick}
            className="text-gray-600 hover:text-black transition-colors hover:scale-110 active:scale-95"
            aria-label="search"
          >
            <Search className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* navigation with Linear-style animations */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="space-y-1 px-3">
          {items.map((item, index) => (
            <SidebarSection key={index} item={item} pathname={pathname} />
          ))}
        </div>
      </nav>
    </aside>
  )
}

function SidebarSection({ item, pathname }: { item: SidebarItem; pathname: string }) {
  const [isOpen, setIsOpen] = React.useState(true)
  const hasChildren = item.items && item.items.length > 0

  if (!hasChildren && item.href) {
    const isActive = pathname === item.href
    return (
      <motion.div
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link
          href={item.href}
          className={cn(
            "flex items-center justify-between px-3 py-2 text-sm font-medium transition-all duration-200",
            "border-l-2 hover:bg-gray-100",
            isActive
              ? "border-black bg-gray-100 text-black font-bold"
              : "border-transparent text-gray-600 hover:text-black hover:border-gray-400"
          )}
        >
          <span className="lowercase">{item.title}</span>
          {item.count !== undefined && (
            <span className="text-xs text-gray-500 font-mono">{item.count}</span>
          )}
        </Link>
      </motion.div>
    )
  }

  return (
    <div>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 w-full px-3 py-2 text-sm font-bold text-black hover:bg-gray-100 transition-colors"
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.15, ease: "easeInOut" }}
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </motion.div>
        <span className="lowercase tracking-wider">{item.title}</span>
      </motion.button>
      <AnimatePresence initial={false}>
        {isOpen && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="ml-5 mt-1 space-y-0.5">
              {item.items!.map((subItem, index) => {
                const isActive = pathname === subItem.href
                return (
                  <motion.div
                    key={index}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={subItem.href || "#"}
                      className={cn(
                        "block px-3 py-1.5 text-sm transition-all duration-200",
                        "border-l-2 hover:bg-gray-100",
                        isActive
                          ? "border-black bg-gray-100 text-black font-medium"
                          : "border-transparent text-gray-600 hover:text-black hover:border-gray-400"
                      )}
                    >
                      <span className="lowercase">{subItem.title}</span>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}