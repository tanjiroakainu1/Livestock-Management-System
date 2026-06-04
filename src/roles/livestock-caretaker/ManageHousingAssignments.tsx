import { useFarmData } from '../../hooks/useFarmData'
import FeaturePage from '../../components/layout/FeaturePage'
import LivestockLocationCrudSection from '../../components/crud/LivestockLocationCrudSection'

export default function ManageHousingAssignments() {
  const { data } = useFarmData()

  return (
    <FeaturePage
      roleId="livestock-caretaker"
      featurePath="housing-assignments"
      title="Manage Animal Housing Assignments"
      description="Assign animals to pens, stalls, and housing areas."
      badge="Caretaker"
      stats={[
        { label: 'Housing Areas', value: new Set(data.livestock.map((l) => l.location)).size },
        { label: 'Animals', value: data.livestock.length },
      ]}
      hideRecordTable
    >
      <LivestockLocationCrudSection roleId="livestock-caretaker" featurePath="housing-assignments" />
    </FeaturePage>
  )
}
