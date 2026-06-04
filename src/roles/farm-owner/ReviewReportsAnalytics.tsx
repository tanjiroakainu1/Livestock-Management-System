import { useFarmData } from '../../hooks/useFarmData'
import FeaturePage from '../../components/layout/FeaturePage'
import RoleReportsCharts from '../../components/reports/RoleReportsCharts'

export default function ReviewReportsAnalytics() {
  const { data } = useFarmData()
  const revenue = data.financials.filter((f) => f.type === 'Revenue').reduce((s, f) => s + f.amount, 0)
  const expenses = data.financials.filter((f) => f.type === 'Expense').reduce((s, f) => s + f.amount, 0)

  return (
    <FeaturePage
      roleId="farm-owner"
      featurePath="reports-analytics"
      title="Review Reports & Analytics"
      description="Owner dashboards and charts — view-only analytics from live farm data."
      badge="Reports & Analytics"
      stats={[
        { label: 'Animals', value: data.livestock.length },
        { label: 'Net Profit', value: `$${(revenue - expenses).toLocaleString()}` },
        { label: 'Unread Alerts', value: data.notifications.filter((n) => !n.read).length },
      ]}
      hideRecordTable
    >
      <RoleReportsCharts scope="farm-owner" />
    </FeaturePage>
  )
}
