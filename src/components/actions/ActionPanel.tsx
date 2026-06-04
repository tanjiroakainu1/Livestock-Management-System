import type { FormEvent, ReactNode } from 'react'
import { Sparkles, Zap } from 'lucide-react'

interface ActionPanelProps {
  title: string
  description?: string
  children: ReactNode
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  submitLabel?: string
  successMessage?: string | null
}

export default function ActionPanel({
  title,
  description,
  children,
  onSubmit,
  submitLabel = 'Save',
  successMessage,
}: ActionPanelProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="glass-card glow-card rounded-2xl p-4 sm:p-5 md:p-6 border-l-4 border-l-farm-500 relative overflow-hidden w-full min-w-0"
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-farm-200/30 to-transparent rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="relative flex items-start sm:items-center gap-3 mb-4 sm:mb-5">
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-farm-500 to-farm-700 text-white shadow-lg shrink-0">
          <Zap className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <h3 className="font-display font-bold text-earth-900 flex flex-wrap items-center gap-2 text-base sm:text-lg">
            {title}
            <Sparkles className="h-4 w-4 text-hay-500 shrink-0" />
          </h3>
          {description && (
            <p className="text-sm text-earth-700/75 mt-0.5 break-words">{description}</p>
          )}
        </div>
      </div>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-3">{children}</div>
      {successMessage && (
        <p className="success-toast mt-4 text-sm font-semibold text-farm-800 bg-gradient-to-r from-farm-50 to-emerald-50/80 px-4 py-3 rounded-xl break-words">
          ✓ {successMessage}
        </p>
      )}
      <button type="submit" className="btn-primary btn-stack-mobile mt-4 sm:mt-5 relative z-10 w-full sm:w-auto">
        {submitLabel}
      </button>
    </form>
  )
}

export function Field({
  label,
  children,
  className = '',
}: {
  label: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <label className="block text-xs font-bold uppercase tracking-wider text-farm-700 mb-1.5">
        {label}
      </label>
      {children}
    </div>
  )
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`input-field ${props.className ?? ''}`} />
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={`input-field bg-white ${props.className ?? ''}`} />
  )
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`input-field min-h-[80px] ${props.className ?? ''}`} />
}
