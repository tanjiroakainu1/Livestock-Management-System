import { useFarmData } from '../../hooks/useFarmData'
import FeaturePage from '../../components/layout/FeaturePage'
import RoleReportsCharts from '../../components/reports/RoleReportsCharts'

export default function ViewFinancialSummaries() {
  const { data } = useFarmData()
  const revenue = data.financials.filter((f) => f.type === 'Revenue').reduce((s, f) => s + f.amount, 0)
  const expenses = data.financials.filter((f) => f.type === 'Expense').reduce((s, f) => s + f.amount, 0)

  return (
    <FeaturePage
      roleId="farm-owner"
      featurePath="financial-summaries"
      title="View Financial Summaries"
      description="Profit, revenue, and expense charts from live farm financial data."
      badge="Financial Management"
      stats={[
        { label: 'Revenue', value: `$${revenue.toLocaleString()}` },
        { label: 'Expenses', value: `$${expenses.toLocaleString()}` },
        { label: 'Profit', value: `$${(revenue - expenses).toLocaleString()}` },
      ]}
      hideRecordTable
    >
      <RoleReportsCharts scope="farm-owner-financials" />
    </FeaturePage>
  )
}
