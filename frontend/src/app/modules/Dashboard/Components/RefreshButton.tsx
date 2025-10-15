import React from 'react'

type RefreshButtonProps = {
  onRefresh: () => void | Promise<void>
  label?: string                      // texto visible
  tooltip?: string                    // title/tooltip
  size?: 'sm' | 'md' | 'lg'
  variant?: 'solid' | 'outline' | 'ghost'
  className?: string
}

export default function RefreshButton({
  onRefresh,
  label = '',
  tooltip = 'Recargar tabla'
}: RefreshButtonProps) {

  return (
    <button
      type="button"
      onClick={onRefresh}
      title={tooltip}
      aria-label={tooltip}
      className='inline-flex bg-green-900 p-1 items-center gap-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-green-600 dark:ring-offset-slate-900 dark:bg-blue-950 dark:hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60 transition'
    >
      <span
        aria-hidden="true"
        className={'group-hover:rotate-12 transition-transform'}
      >
        🔄
      </span>
      <span>{label}</span>
    </button>
  )
}