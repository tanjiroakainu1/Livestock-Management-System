import { ChevronRight, Database } from 'lucide-react'
import StatusBadge from '../ui/StatusBadge'

export interface Column<T> {
  key: keyof T | string
  header: string
  render?: (row: T) => React.ReactNode
  badge?: boolean
}

interface DataTableProps<T extends Record<string, unknown>> {
  columns: Column<T>[]
  data: T[]
  emptyMessage?: string
  title?: string
}

const BADGE_KEYS = new Set([
  'status',
  'condition',
  'type',
  'priority',
  'read',
])

export default function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  emptyMessage = 'No records found.',
  title,
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="glass-card glow-card empty-state rounded-2xl p-8 sm:p-14 text-center">
        <div className="inline-flex p-4 rounded-2xl bg-farm-100 text-farm-600 mb-4 empty-state-icon">
          <Database className="h-8 w-8 sm:h-10 sm:w-10" />
        </div>
        <p className="font-display text-base sm:text-lg font-bold text-earth-800 px-2">
          {emptyMessage}
        </p>
        <p className="text-sm text-earth-600/70 mt-2 px-2">
          Add a record using the form above
        </p>
      </div>
    )
  }

  return (
    <div className="glass-card glow-card rounded-2xl overflow-hidden table-shell w-full min-w-0">
      {title && (
        <div className="px-3 sm:px-5 py-3 sm:py-4 border-b border-farm-100 bg-gradient-to-r from-farm-50 via-white to-hay-50/50">
          <h4 className="font-display font-bold text-earth-900 text-sm sm:text-base break-words">
            {title}
          </h4>
        </div>
      )}
      <p className="table-scroll-hint" aria-hidden>
        <ChevronRight className="h-3.5 w-3.5 rotate-180" />
        Swipe table to see more
        <ChevronRight className="h-3.5 w-3.5" />
      </p>
      <div className="table-responsive">
        <table className="w-full text-xs sm:text-sm text-left">
          <thead>
            <tr className="bg-gradient-to-r from-farm-900 via-farm-800 to-farm-700 text-white">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="px-3 sm:px-4 py-3 sm:py-4 font-semibold whitespace-nowrap"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr
                key={i}
                className={`table-row-hover border-b border-farm-50/80 ${
                  i % 2 === 0 ? 'bg-white/70' : 'bg-farm-50/40'
                }`}
              >
                {columns.map((col) => {
                  const raw = row[col.key as keyof T]
                  const val = raw != null ? String(raw) : '—'
                  const useBadge =
                    col.badge ||
                    (BADGE_KEYS.has(String(col.key)) &&
                      val !== '—' &&
                      val !== 'Yes' &&
                      val !== 'No')

                  return (
                    <td
                      key={String(col.key)}
                      className="px-3 sm:px-4 py-3 sm:py-3.5 text-earth-800 align-top"
                    >
                      {col.render ? (
                        col.render(row)
                      ) : useBadge && val !== '—' ? (
                        <StatusBadge value={val} />
                      ) : col.key === 'read' ? (
                        <StatusBadge value={raw ? 'Completed' : 'Pending'} />
                      ) : (
                        <span className="break-words">{val}</span>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-3 sm:px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs text-farm-700 bg-gradient-to-r from-farm-50/80 to-white border-t border-farm-100">
        <span className="font-semibold">
          {data.length} record{data.length !== 1 ? 's' : ''}
        </span>
        <span className="font-medium text-earth-700/70">Green Valley Farm</span>
      </div>
    </div>
  )
}
