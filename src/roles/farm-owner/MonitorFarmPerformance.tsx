import { useFarmData } from '../../hooks/useFarmData'
import FeaturePage from '../../components/layout/FeaturePage'
import RoleReportsCharts from '../../components/reports/RoleReportsCharts'

export default function MonitorFarmPerformance() {
  const { data } = useFarmData()
  const completedTasks = data.tasks.filter((t) => t.status === 'Completed').length

  return (
    <FeaturePage
      roleId="farm-owner"
      featurePath="farm-performance"
      title="Monitor Farm Performance"
      description="Operational dashboards and charts — view-only performance analytics."
      badge="Reports & Analytics"
      stats={[
        { label: 'Animals', value: data.livestock.length },
        { label: 'Tasks Done', value: `${completedTasks}/${data.tasks.length}` },
        { label: 'Breeding Active', value: data.breedingRecords.length },
      ]}
      hideRecordTable
    >
      <RoleReportsCharts scope="farm-owner-performance" />
    </FeaturePage>
  )
}
