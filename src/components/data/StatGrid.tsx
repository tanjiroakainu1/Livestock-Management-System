import { TrendingUp } from 'lucide-react'

interface Stat {
  label: string
  value: string | number
}

const ACCENTS = [
  'from-farm-500 to-farm-700',
  'from-sky-500 to-blue-600',
  'from-amber-400 to-orange-500',
  'from-teal-500 to-emerald-600',
  'from-violet-500 to-purple-600',
]

export default function StatGrid({ stats }: { stats: Stat[] }) {
  const count = stats.length
  const gridClass =
    count <= 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : count === 3
        ? 'grid-cols-1 sm:grid-cols-3'
        : 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-4'

  return (
    <div className={`grid ${gridClass} gap-3 md:gap-4`}>
      {stats.map((s, i) => (
        <div
          key={s.label}
          className="glass-card glass-card-hover glow-card rounded-2xl p-4 md:p-5 relative overflow-hidden group min-w-0"
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${ACCENTS[i % ACCENTS.length]} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300`}
          />
          <div
            className={`absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br ${ACCENTS[i % ACCENTS.length]} opacity-[0.12] group-hover:opacity-20 transition-opacity`}
          />
          <div className="relative flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[10px] md:text-xs font-bold text-farm-600 uppercase tracking-widest truncate">
                {s.label}
              </p>
              <p className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-earth-900 mt-1 stat-value-glow break-all sm:break-normal">
                {s.value}
              </p>
            </div>
            <div
              className={`p-2 rounded-xl bg-gradient-to-br ${ACCENTS[i % ACCENTS.length]} text-white shadow-md opacity-90 group-hover:scale-110 transition-transform shrink-0`}
            >
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
