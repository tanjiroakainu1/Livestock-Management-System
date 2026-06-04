import { Link } from 'react-router-dom'
import { ArrowUpRight, type LucideIcon } from 'lucide-react'

interface DashboardCardProps {
  title: string
  description: string
  to: string
  icon: LucideIcon
  accent?: string
}

export default function DashboardCard({
  title,
  description,
  to,
  icon: Icon,
  accent = 'from-farm-500 to-farm-700',
}: DashboardCardProps) {
  return (
    <Link
      to={to}
      className="glass-card glass-card-hover glow-card rounded-2xl p-5 md:p-6 block group relative overflow-hidden"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-[0.05] group-hover:opacity-[0.12] transition-opacity duration-300`}
      />
      <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-white/40 blur-2xl group-hover:scale-150 transition-transform duration-500" />
      <div className="relative flex items-start gap-4">
        <div
          className={`p-3.5 rounded-xl bg-gradient-to-br ${accent} text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display font-bold text-earth-900 group-hover:text-farm-700 transition-colors">
              {title}
            </h3>
            <ArrowUpRight className="h-5 w-5 text-farm-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
          </div>
          <p className="mt-1.5 text-sm text-earth-700/80 leading-relaxed">{description}</p>
        </div>
      </div>
    </Link>
  )
}
