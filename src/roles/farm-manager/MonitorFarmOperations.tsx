import { useFarmData } from '../../hooks/useFarmData'
import FeaturePage from '../../components/layout/FeaturePage'
import TaskCrudSection from '../../components/crud/TaskCrudSection'

export default function MonitorFarmOperations() {
  const { data } = useFarmData()

  return (
    <FeaturePage
      roleId="farm-manager"
      featurePath="farm-operations"
      title="Monitor Farm Operations"
      description="Daily tasks, housing, and livestock movement monitoring."
      badge="Farm Manager"
      stats={[
        { label: 'Tasks', value: data.tasks.length },
        { label: 'Pending', value: data.tasks.filter((t) => t.status === 'Pending').length },
      ]}
      hideRecordTable
    >
      <TaskCrudSection roleId="farm-manager" featurePath="farm-operations" />
    </FeaturePage>
  )
}
