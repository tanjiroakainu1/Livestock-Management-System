import { Bell, Heart, Syringe, Utensils, Package, AlertTriangle } from 'lucide-react'
import type { Notification } from '../../types/farm'

const TYPE_STYLES: Record<
  Notification['type'],
  { icon: typeof Bell; gradient: string; border: string }
> = {
  Health: { icon: Heart, gradient: 'from-rose-500 to-red-600', border: 'border-rose-200' },
  Vaccination: { icon: Syringe, gradient: 'from-violet-500 to-purple-600', border: 'border-violet-200' },
  Feeding: { icon: Utensils, gradient: 'from-amber-500 to-orange-500', border: 'border-amber-200' },
  Breeding: { icon: Bell, gradient: 'from-pink-500 to-rose-500', border: 'border-pink-200' },
  Inventory: { icon: Package, gradient: 'from-sky-500 to-blue-600', border: 'border-sky-200' },
}

interface NotificationFeedProps {
  notifications: Notification[]
  onMarkRead: (id: string) => void
  onMarkAllRead: () => void
}

export default function NotificationFeed({
  notifications,
  onMarkRead,
  onMarkAllRead,
}: NotificationFeedProps) {
  const unread = notifications.filter((n) => !n.read)
  const sorted = [...notifications].sort((a, b) => Number(a.read) - Number(b.read))

  return (
    <div className="space-y-4">
      {unread.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 glass-card glow-card rounded-2xl p-4 border border-amber-200/80 bg-gradient-to-r from-amber-50/90 to-hay-50/50">
          <p className="text-sm font-semibold text-amber-900 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            {unread.length} unread notification{unread.length !== 1 ? 's' : ''}
          </p>
          <button type="button" onClick={onMarkAllRead} className="btn-primary text-sm">
            Mark all read
          </button>
        </div>
      )}

      <div className="grid gap-3">
        {sorted.map((n) => {
          const style = TYPE_STYLES[n.type]
          const Icon = style.icon
          return (
            <article
              key={n.id}
              className={`glass-card glow-card rounded-2xl p-4 md:p-5 border-l-4 ${style.border} transition-all duration-300 ${
                n.read ? 'opacity-70' : 'shadow-lg ring-2 ring-farm-200/40 hover:shadow-xl'
              }`}
            >
              <div className="flex gap-4">
                <div
                  className={`shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br ${style.gradient} flex items-center justify-center text-white shadow`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="font-display font-bold text-earth-900">{n.title}</h3>
                    <span className="text-xs font-bold uppercase tracking-wider text-earth-500">
                      {n.date}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-farm-700 mt-0.5">{n.type}</p>
                  <p className="text-sm text-earth-700/90 mt-2 leading-relaxed">{n.message}</p>
                  {!n.read && (
                    <button
                      type="button"
                      onClick={() => onMarkRead(n.id)}
                      className="btn-primary mt-3 !py-1.5 !px-3 !text-xs"
                    >
                      Mark as read
                    </button>
                  )}
                  {n.read && (
                    <span className="mt-3 inline-block text-xs font-medium text-earth-500">
                      Read
                    </span>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
