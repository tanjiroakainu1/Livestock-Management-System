import { useFarmData } from '../../hooks/useFarmData'
import FeaturePage from '../../components/layout/FeaturePage'
import FeedingCrudSection from '../../components/crud/FeedingCrudSection'

export default function RecordDailyFeeding() {
  const { data } = useFarmData()

  return (
    <FeaturePage
      roleId="livestock-caretaker"
      featurePath="daily-feeding"
      title="Record Daily Feeding Activities"
      description="Log feeding schedules, consumption, and nutrition monitoring."
      badge="Caretaker"
      stats={[{ label: 'Feeding Logs', value: data.feedingLogs.length }]}
      hideRecordTable
    >
      <FeedingCrudSection roleId="livestock-caretaker" featurePath="daily-feeding" />
    </FeaturePage>
  )
}
