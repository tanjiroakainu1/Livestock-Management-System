import { useFarmData } from '../../hooks/useFarmData'
import FeaturePage from '../../components/layout/FeaturePage'
import LivestockLocationCrudSection from '../../components/crud/LivestockLocationCrudSection'

export default function AssignLivestockLocations() {
  const { data } = useFarmData()

  return (
    <FeaturePage
      roleId="farm-manager"
      featurePath="assign-locations"
      title="Assign Livestock to Locations"
      description="Track and assign animals to pens, pastures, and housing."
      badge="Farm Manager"
      stats={[
        { label: 'Locations', value: new Set(data.livestock.map((l) => l.location)).size },
        { label: 'Animals', value: data.livestock.length },
      ]}
      hideRecordTable
    >
      <LivestockLocationCrudSection roleId="farm-manager" featurePath="assign-locations" />
    </FeaturePage>
  )
}
