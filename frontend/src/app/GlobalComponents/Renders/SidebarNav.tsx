'use client'
import LogOutButton from '@/app/modules/Auth/Components/LogOutButton'
import Link from 'next/link'
import React, { useState } from 'react'

/**
   * @Info
   * This one works like this -> receives an object array [{}],one object per Item in the SideBar
   * IF the object have a children prop, became a dopdown, else its just a Button
   */
export type NavItem = {
  label: string
  href?: string                   // si tiene children, es opcional
  icon?: React.ReactNode
  children?: NavItem[]            // subrutas (dropdown)
}

/**
   * @Info
   * This one works like this ->Renders by mapping the object array, 
  */
export default function SidebarNav({ items }: { items: NavItem[] }) {
  return (
    <nav className="space-y-1">
      {items.map((item) => (
        <SidebarItem key={item.href ?? item.label} item={item} depth={0} />
      ))}
      <br />
      <LogOutButton />
    </nav>
  )
}
/**
 * 
 * @param item  NavItem
 * @param depth  number
 * 
 * @Info 
 * Dinamic render if item have the prop 'children', driving it to the proper component for the suplied info
 * @returns JSX RENDER
 */
function SidebarItem({ item, depth }: { item: NavItem; depth: number }) {
  // Checks an simple boolean logic to check if the object have a prop
  const hasChildren = Array.isArray(item.children) && item.children.length > 0
  if (!hasChildren) {
    return <SidebarLink item={item} depth={depth} />
  }
  return <SidebarGroup item={item} depth={depth} />
}

/**
 * 
 * @param item  NavItem
 * @param depth number
 * @Info  The Scope of this component is render the Navigation Buttons -- NOT THE DROPDOWN ONE
 * @returns JSX Component
 */
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

/**
 * 
 * @param item  NavItem
 * @param depth  number
 * @Info  This component renders the DROPDOWN selector in the NAVBAR
 * @returns JSX COMPONENTs
 */
function SidebarGroup({ item, depth }: { item: NavItem; depth: number }) {
  const [open, setOpen] = useState(false)

  const pad = depth * 10

  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}