import { Code2 } from 'lucide-react'
import { DEVELOPER } from '../../data/credits'

type Variant = 'footer' | 'compact' | 'sidebar'

interface DeveloperCreditProps {
  variant?: Variant
  className?: string
}

export default function DeveloperCredit({
  variant = 'footer',
  className = '',
}: DeveloperCreditProps) {
  if (variant === 'sidebar') {
    return (
      <div
        className={`rounded-xl border border-white/20 bg-black/10 px-3 py-2 text-center ${className}`}
        title={`${DEVELOPER.role}: ${DEVELOPER.name}`}
      >
        <p className="text-[0.6rem] font-bold uppercase tracking-widest text-white/60">
          {DEVELOPER.role}
        </p>
        <p className="font-display text-sm font-bold text-white mt-0.5 leading-tight">
          {DEVELOPER.name}
        </p>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <p
        className={`text-center text-xs sm:text-sm text-earth-600/80 ${className}`}
        aria-label={`Developed by ${DEVELOPER.name}`}
      >
        <Code2 className="inline h-3.5 w-3.5 text-farm-600 mr-1 -mt-px" />
        Developed by{' '}
        <span className="font-display font-bold text-farm-800">{DEVELOPER.name}</span>
        <span className="text-earth-500"> · {DEVELOPER.role}</span>
      </p>
    )
  }

  return (
    <p
      className={`text-center text-xs sm:text-sm text-earth-600/80 ${className}`}
      aria-label={`Developed by ${DEVELOPER.name}`}
    >
      {DEVELOPER.role}:{' '}
      <span className="font-display font-bold text-farm-800">{DEVELOPER.name}</span>
    </p>
  )
}
