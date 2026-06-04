import { useFarmData } from '../../hooks/useFarmData'
import FeaturePage from '../../components/layout/FeaturePage'
import LivestockPerformanceCrudSection from '../../components/crud/LivestockPerformanceCrudSection'

export default function UpdateWeightRecords() {
  const { data } = useFarmData()

  return (
    <FeaturePage
      roleId="livestock-caretaker"
      featurePath="weight-records"
      title="Update Livestock Weight Records"
      description="Record weight measurements and track growth."
      badge="Caretaker"
      stats={[{ label: 'Animals', value: data.livestock.length }]}
      hideRecordTable
    >
      <LivestockPerformanceCrudSection roleId="livestock-caretaker" featurePath="weight-records" />
    </FeaturePage>
  )
}
