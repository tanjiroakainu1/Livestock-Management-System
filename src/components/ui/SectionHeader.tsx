import { Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'

interface SectionHeaderProps {
  title: string
  description: string
  badge?: string
  children?: ReactNode
}

export default function SectionHeader({
  title,
  description,
  badge,
  children,
}: SectionHeaderProps) {
  return (
    <div className="glass-card glow-card rounded-2xl p-4 sm:p-6 md:p-8 relative overflow-hidden w-full min-w-0">
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-farm-200/40 to-transparent rounded-full -translate-y-1/2 translate-x-1/4" />
      <div className="relative min-w-0">
        {badge && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-farm-100 to-farm-50 text-farm-800 border border-farm-200/80 mb-3 shadow-sm max-w-full">
            <Sparkles className="h-3 w-3 text-hay-500 shrink-0" />
            <span className="truncate">{badge}</span>
          </span>
        )}
        <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold gradient-text break-words">
          {title}
        </h2>
        <div className="section-shine w-20 sm:w-24 my-3" />
        <p className="text-sm sm:text-base text-earth-700/85 max-w-2xl leading-relaxed break-words">
          {description}
        </p>
        {children}
      </div>
    </div>
  )
}
