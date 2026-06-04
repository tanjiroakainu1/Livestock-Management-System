import { useFarmData } from '../../hooks/useFarmData'
import FeaturePage from '../../components/layout/FeaturePage'
import LivestockConditionCrudSection from '../../components/crud/LivestockConditionCrudSection'

export default function MonitorAnimalConditions() {
  const { data } = useFarmData()

  return (
    <FeaturePage
      roleId="livestock-caretaker"
      featurePath="animal-conditions"
      title="Monitor Animal Conditions"
      description="Observe and record daily animal health and behavior."
      badge="Caretaker"
      stats={[
        { label: 'Healthy', value: data.livestock.filter((l) => l.status === 'Healthy').length },
        { label: 'Needs Attention', value: data.livestock.filter((l) => l.status !== 'Healthy').length },
      ]}
      hideRecordTable
    >
      <LivestockConditionCrudSection roleId="livestock-caretaker" featurePath="animal-conditions" />
    </FeaturePage>
  )
}
