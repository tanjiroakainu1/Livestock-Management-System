import type { ReactNode } from 'react'

interface BarItem {
  label: string
  value: number
  color: string
}

export function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: ReactNode
}) {
  return (
    <div className="glass-card glow-card rounded-2xl p-5 md:p-6 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-farm-400/25 via-hay-300/15 to-transparent rounded-full blur-2xl pointer-events-none" />
      <h3 className="font-display font-bold text-earth-900 relative gradient-text">{title}</h3>
      {subtitle && <p className="text-xs text-earth-600 mt-0.5 mb-4">{subtitle}</p>}
      {!subtitle && <div className="mb-4" />}
      {children}
    </div>
  )
}

export function BarChart({ items, max }: { items: BarItem[]; max?: number }) {
  const peak = max ?? Math.max(...items.map((i) => i.value), 1)
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.label}>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-earth-800">{item.label}</span>
            <span className="font-bold text-earth-900">{item.value}</span>
          </div>
          <div className="h-5 bg-earth-100/80 rounded-full overflow-hidden shadow-inner">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-700 ease-out chart-bar-glow`}
              style={{ width: `${Math.min(100, (item.value / peak) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export function DonutChart({
  segments,
  size = 160,
}: {
  segments: { label: string; value: number; color: string }[]
  size?: number
}) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1
  const stops = segments
    .reduce<{ parts: string[]; acc: number }>(
      (state, seg) => {
        const start = (state.acc / total) * 100
        const acc = state.acc + seg.value
        const end = (acc / total) * 100
        state.parts.push(`${seg.color} ${start}% ${end}%`)
        return { parts: state.parts, acc }
      },
      { parts: [], acc: 0 },
    )
    .parts.join(', ')

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full min-w-0">
      <div
        className="relative rounded-full shrink-0 shadow-inner mx-auto sm:mx-0 w-[7.5rem] h-[7.5rem] sm:w-36 sm:h-36 md:w-40 md:h-40"
        style={{
          maxWidth: size,
          maxHeight: size,
          background: `conic-gradient(${stops})`,
        }}
      >
        <div
          className="absolute inset-[22%] rounded-full bg-white flex items-center justify-center flex-col shadow-md"
        >
          <span className="text-2xl font-display font-bold text-earth-900">{total}</span>
          <span className="text-[10px] uppercase tracking-wider text-earth-500">Total</span>
        </div>
      </div>
      <ul className="space-y-2 text-sm flex-1 w-full min-w-0">
        {segments.map((seg) => (
          <li key={seg.label} className="flex items-center gap-2 min-w-0">
            <span
              className="w-3 h-3 rounded-full shrink-0"
              style={{ background: seg.color }}
            />
            <span className="text-earth-800 flex-1 truncate">{seg.label}</span>
            <span className="font-bold text-earth-900">
              {seg.value} ({Math.round((seg.value / total) * 100)}%)
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function LineChart({
  points,
  labels,
  color = '#16a34a',
}: {
  points: number[]
  labels: string[]
  color?: string
}) {
  const max = Math.max(...points, 1)
  const min = Math.min(...points, 0)
  const range = max - min || 1
  const w = 320
  const h = 120
  const coords = points.map((p, i) => {
    const x = (i / Math.max(points.length - 1, 1)) * w
    const y = h - ((p - min) / range) * (h - 16) - 8
    return `${x},${y}`
  })

  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-32">
        <defs>
          <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon
          points={`0,${h} ${coords.join(' ')} ${w},${h}`}
          fill="url(#lineFill)"
        />
        <polyline
          points={coords.join(' ')}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((p, i) => {
          const x = (i / Math.max(points.length - 1, 1)) * w
          const y = h - ((p - min) / range) * (h - 16) - 8
          return <circle key={labels[i]} cx={x} cy={y} r="4" fill={color} />
        })}
      </svg>
      <div className="flex justify-between text-[10px] text-earth-500 mt-1 px-1">
        {labels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </div>
  )
}

export function StatRing({
  label,
  value,
  percent,
  color,
}: {
  label: string
  value: string | number
  percent: number
  color: string
}) {
  return (
    <div className="text-center">
      <div
        className="mx-auto w-20 h-20 rounded-full flex items-center justify-center font-display font-bold text-lg text-earth-900"
        style={{
          background: `conic-gradient(${color} ${percent}%, #e7e5e4 ${percent}% 100%)`,
        }}
      >
        <span className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-sm">
          {value}
        </span>
      </div>
      <p className="text-xs font-semibold text-earth-700 mt-2">{label}</p>
    </div>
  )
}
