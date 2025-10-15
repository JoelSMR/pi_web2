'use client'
import Link from 'next/link'
import React, { useState } from 'react'

export type NavItem = {
  label: string
  href?: string                   // si tiene children, es opcional
  icon?: React.ReactNode
  children?: NavItem[]            // subrutas (dropdown)
}

export default function SidebarNav({ items }: { items: NavItem[] }) {
  return (
    <nav className="space-y-1">
      {items.map((item) => (
        <SidebarItem key={item.href ?? item.label} item={item} depth={0} />
      ))}
    </nav>
  )
}

function SidebarItem({ item, depth }: { item: NavItem; depth: number }) {
  const hasChildren = Array.isArray(item.children) && item.children.length > 0
  if (!hasChildren) {
    return <SidebarLink item={item} depth={depth} />
  }
  return <SidebarGroup item={item} depth={depth} />
}

function SidebarLink({ item, depth }: { item: NavItem; depth: number }) {
  const pad = depth * 10 // indentación por nivel

  return (
    <Link
      href={item.href ?? '#'}
      className={
        'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'}
      style={{ paddingLeft: `${pad + 12}px` }}
    >
      {item.icon}
      <span>{item.label}</span>
    </Link>
  )
}

function SidebarGroup({ item, depth }: { item: NavItem; depth: number }) {
  const [open, setOpen] = useState(false)

  const pad = depth * 10

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        style={{ paddingLeft: `${pad + 12}px` }}
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          {item.icon}
          {item.label}
        </span>
        <span
          className={[
            'transition-transform',
            open ? 'rotate-90' : 'rotate-0',
          ].join(' ')}
          aria-hidden="true"
        >
          ▶
        </span>
      </button>

      <div className={open ? 'mt-1 space-y-1' : 'hidden'}>
        {item.children?.map((child) => (
          <SidebarItem key={child.href ?? child.label} item={child} depth={depth + 1} />
        ))}
      </div>
    </div>
  )
}