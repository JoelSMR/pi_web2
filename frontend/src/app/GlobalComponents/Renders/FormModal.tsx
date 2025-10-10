'use client'
import React, { useState } from 'react'

export interface FormModalProps {
  isOpen: boolean
  title: string
  onConfirm: () => void | Promise<void>
  onClose: () => void
  confirmText: string
  children: React.ReactNode
  cancelText?: string
  className?: string
}

const FormModal: React.FC<FormModalProps> = ({
  isOpen,
  title,
  onConfirm,
  onClose,
  confirmText,
  children,
  cancelText = 'Cancelar',
  className = '',
}) => {
  const [submitting, setSubmitting] = useState(false)

  if (!isOpen) return null

  const handleConfirm = async () => {
    try {
      setSubmitting(true)
      await onConfirm()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="form-modal-title"
    >
      {/* Overlay (cierra al click) */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" onClick={onClose} />

      {/* Contenedor modal */}
      <div
        className={[
          'relative z-10 w-full max-w-3xl rounded-xl bg-white p-6 shadow-2xl ring-1 ring-black/5',
          'dark:bg-neutral-900 dark:ring-white/10',
          className,
        ].join(' ')}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 id="form-modal-title" className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-neutral-800"
            aria-label="Cerrar"
            title="Cerrar"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="mb-5">{children}</div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-800"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {submitting && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white" />
            )}
            {submitting ? 'Procesando…' : confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default FormModal