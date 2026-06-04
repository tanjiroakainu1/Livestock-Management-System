import { useFarmData } from '../../hooks/useFarmData'
import FeaturePage from '../../components/layout/FeaturePage'
import TaskCrudSection from '../../components/crud/TaskCrudSection'

export default function TrackDailyFarmTasks() {
  const { data } = useFarmData()

  return (
    <FeaturePage
      roleId="livestock-caretaker"
      featurePath="daily-tasks"
      title="Track Daily Farm Tasks"
      description="Create, edit, delete tasks — use Start/Done for quick status updates."
      badge="Caretaker"
      stats={[
        { label: 'Total Tasks', value: data.tasks.length },
        { label: 'Pending', value: data.tasks.filter((t) => t.status === 'Pending').length },
        { label: 'Completed', value: data.tasks.filter((t) => t.status === 'Completed').length },
      ]}
      hideRecordTable
    >
      <TaskCrudSection
        roleId="livestock-caretaker"
        featurePath="daily-tasks"
        showQuickStatus
      />
    </FeaturePage>
  )
}
