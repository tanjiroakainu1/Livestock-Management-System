import { useFarmData } from '../../hooks/useFarmData'
import FeaturePage from '../../components/layout/FeaturePage'
import CheckupCrudSection from '../../components/crud/CheckupCrudSection'

export default function ScheduleHealthCheckups() {
  const { data } = useFarmData()

  return (
    <FeaturePage
      roleId="veterinarian"
      featurePath="health-checkups"
      title="Schedule Health Checkups"
      description="Plan routine checkups and vaccination reminders."
      badge="Veterinarian"
      stats={[
        { label: 'Scheduled', value: data.checkups.filter((c) => c.status === 'Scheduled').length },
        { label: 'Completed', value: data.checkups.filter((c) => c.status === 'Completed').length },
      ]}
      hideRecordTable
    >
      <CheckupCrudSection roleId="veterinarian" featurePath="health-checkups" />
    </FeaturePage>
  )
}
