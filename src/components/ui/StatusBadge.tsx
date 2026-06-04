const STATUS_STYLES: Record<string, string> = {
  Healthy: 'bg-emerald-100 text-emerald-800 border-emerald-300 shadow-emerald-100',
  Sick: 'bg-red-100 text-red-800 border-red-300 shadow-red-100',
  Recovering: 'bg-amber-100 text-amber-800 border-amber-300 shadow-amber-100',
  Pregnant: 'bg-pink-100 text-pink-800 border-pink-300 shadow-pink-100',
  Scheduled: 'bg-blue-100 text-blue-800 border-blue-300 shadow-blue-100',
  Completed: 'bg-emerald-100 text-emerald-800 border-emerald-300 shadow-emerald-100',
  Overdue: 'bg-red-100 text-red-800 border-red-300 shadow-red-100',
  Active: 'bg-violet-100 text-violet-800 border-violet-300 shadow-violet-100',
  Pending: 'bg-amber-100 text-amber-800 border-amber-300 shadow-amber-100',
  'In Progress': 'bg-sky-100 text-sky-800 border-sky-300 shadow-sky-100',
  Approved: 'bg-emerald-100 text-emerald-800 border-emerald-300 shadow-emerald-100',
  Rejected: 'bg-red-100 text-red-800 border-red-300 shadow-red-100',
  Mated: 'bg-farm-100 text-farm-800 border-farm-300 shadow-farm-100',
  Born: 'bg-hay-100 text-hay-800 border-hay-300 shadow-hay-100',
  OK: 'bg-emerald-100 text-emerald-800 border-emerald-300 shadow-emerald-100',
  Revenue: 'bg-emerald-100 text-emerald-800 border-emerald-300 shadow-emerald-100',
  Expense: 'bg-orange-100 text-orange-800 border-orange-300 shadow-orange-100',
  Sale: 'bg-farm-100 text-farm-800 border-farm-300 shadow-farm-100',
  Purchase: 'bg-sky-100 text-sky-800 border-sky-300 shadow-sky-100',
  Transfer: 'bg-violet-100 text-violet-800 border-violet-300 shadow-violet-100',
  High: 'bg-red-100 text-red-800 border-red-300 shadow-red-100',
  Medium: 'bg-amber-100 text-amber-800 border-amber-300 shadow-amber-100',
}

export default function StatusBadge({ value }: { value: string }) {
  const style =
    STATUS_STYLES[value] ?? 'bg-gray-100 text-gray-700 border-gray-300 shadow-gray-100'

  return (
    <span
      className={`badge-pill inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold border shadow-sm ${style}`}
    >
      {value}
    </span>
  )
}
