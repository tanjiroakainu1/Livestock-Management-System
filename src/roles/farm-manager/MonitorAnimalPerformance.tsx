import { useFarmData } from '../../hooks/useFarmData'
import FeaturePage from '../../components/layout/FeaturePage'
import LivestockPerformanceCrudSection from '../../components/crud/LivestockPerformanceCrudSection'

export default function MonitorAnimalPerformance() {
  const { data } = useFarmData()
  const avgWeight = data.livestock.length
    ? Math.round(data.livestock.reduce((s, l) => s + l.weightKg, 0) / data.livestock.length)
    : 0

  return (
    <FeaturePage
      roleId="farm-manager"
      featurePath="animal-performance"
      title="Monitor Animal Performance"
      description="Track growth, productivity, and weight metrics."
      badge="Farm Manager"
      stats={[
        { label: 'Avg Weight (kg)', value: avgWeight },
        { label: 'Healthy', value: data.livestock.filter((l) => l.status === 'Healthy').length },
      ]}
      hideRecordTable
    >
      <LivestockPerformanceCrudSection roleId="farm-manager" featurePath="animal-performance" />
    </FeaturePage>
  )
}
