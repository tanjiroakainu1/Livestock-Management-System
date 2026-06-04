import { useFarmData } from '../../hooks/useFarmData'
import { useFarmActions } from '../../hooks/useFarmActions'
import FeaturePage from '../../components/layout/FeaturePage'
import RoleReportsCharts from '../../components/reports/RoleReportsCharts'

export default function SystemWideReports() {
  const { data } = useFarmData()
  const { logExport } = useFarmActions('super-admin', 'system-reports')
  const revenue = data.financials.filter((f) => f.type === 'Revenue').reduce((s, f) => s + f.amount, 0)
  const expenses = data.financials.filter((f) => f.type === 'Expense').reduce((s, f) => s + f.amount, 0)

  return (
    <FeaturePage
      roleId="super-admin"
      featurePath="system-reports"
      title="System-Wide Reports"
      description="System analytics and charts only — manage data under Categories and All Farm Records."
      badge="Reports & Analytics"
      stats={[
        { label: 'Revenue', value: `$${revenue.toLocaleString()}` },
        { label: 'Expenses', value: `$${expenses.toLocaleString()}` },
        { label: 'Net', value: `$${(revenue - expenses).toLocaleString()}` },
        { label: 'Livestock', value: data.livestock.length },
      ]}
      hideRecordTable
      actions={
        <div className="glass-card rounded-xl px-4 py-3 text-sm text-earth-700 flex flex-wrap items-center justify-between gap-3">
          <p>
            <strong>Reports only.</strong> Charts reflect live localStorage data. Use{' '}
            <strong>Livestock Categories</strong> and <strong>All Farm Records</strong> to edit data.
          </p>
          <button type="button" onClick={logExport} className="btn-primary shrink-0">
            Log Report View
          </button>
        </div>
      }
    >
      <RoleReportsCharts scope="super-admin" />
    </FeaturePage>
  )
}
