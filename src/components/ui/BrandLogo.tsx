import { Tractor } from 'lucide-react'

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg'
  light?: boolean
  /** Icon only — for narrow mobile headers */
  compact?: boolean
}

const sizes = {
  sm: { box: 'h-10 w-10', icon: 'h-5 w-5', text: 'text-lg' },
  md: { box: 'h-12 w-12', icon: 'h-6 w-6', text: 'text-xl' },
  lg: { box: 'h-16 w-16', icon: 'h-8 w-8', text: 'text-2xl' },
}

export default function BrandLogo({
  size = 'md',
  light = false,
  compact = false,
}: BrandLogoProps) {
  const s = sizes[size]
  return (
    <div className={`flex items-center gap-2 sm:gap-3 group shrink-0 ${compact ? 'gap-0' : ''}`}>
      <div className="relative logo-ring-paused">
        <div
          className={`absolute inset-0 rounded-2xl logo-ring opacity-30 ${
            light ? 'border-2 border-white/40' : 'border-2 border-farm-400/50'
          }`}
          style={{ margin: '-3px' }}
        />
        <div
          className={`${s.box} rounded-2xl flex items-center justify-center shadow-lg relative z-10 transition-transform group-hover:scale-105 ${
            light
              ? 'bg-white/25 backdrop-blur border border-white/35'
              : 'bg-gradient-to-br from-farm-500 via-farm-600 to-farm-800 text-white'
          }`}
        >
          <Tractor className={`${s.icon} ${light ? 'text-white' : ''}`} />
        </div>
      </div>
      {!compact && (
        <div className={`min-w-0 ${light ? 'text-white' : ''}`}>
          <p className={`font-display font-bold leading-tight truncate ${s.text}`}>
            Green Valley
          </p>
          <p
            className={`text-[10px] sm:text-xs tracking-widest uppercase truncate ${
              light ? 'text-white/85' : 'text-farm-600'
            }`}
          >
            Livestock LMS
          </p>
        </div>
      )}
    </div>
  )
}
