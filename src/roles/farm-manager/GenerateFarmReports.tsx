import { useFarmData } from '../../hooks/useFarmData'
import { useFarmActions } from '../../hooks/useFarmActions'
import FeaturePage from '../../components/layout/FeaturePage'
import RoleReportsCharts from '../../components/reports/RoleReportsCharts'

export default function GenerateFarmReports() {
  const { data } = useFarmData()
  const { logExport } = useFarmActions('farm-manager', 'farm-reports')
  const revenue = data.financials.filter((f) => f.type === 'Revenue').reduce((s, f) => s + f.amount, 0)
  const expenses = data.financials.filter((f) => f.type === 'Expense').reduce((s, f) => s + f.amount, 0)

  return (
    <FeaturePage
      roleId="farm-manager"
      featurePath="farm-reports"
      title="Generate Farm Reports"
      description="Charts and analytics only — production, inventory, breeding, and financial insights."
      badge="Reports & Analytics"
      stats={[
        { label: 'Livestock', value: data.livestock.length },
        { label: 'Revenue', value: `$${revenue.toLocaleString()}` },
        { label: 'Net Profit', value: `$${(revenue - expenses).toLocaleString()}` },
      ]}
      hideRecordTable
      hideActivityTable={false}
      activityTableTitle="Report Activity Log"
      actions={
        <p className="glass-card rounded-xl px-4 py-3 text-sm text-earth-700 flex flex-wrap items-center justify-between gap-3">
          <span>
            <strong>Reports only</strong> — manage data under Livestock Records, Locations,
            Performance, Breeding, and Operations.
          </span>
          <button type="button" onClick={logExport} className="btn-primary shrink-0">
            Log Report View
          </button>
        </p>
      }
    >
      <RoleReportsCharts scope="farm-manager" />
    </FeaturePage>
  )
}
