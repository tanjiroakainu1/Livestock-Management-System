import { useFarmData } from '../../hooks/useFarmData'
import FeaturePage from '../../components/layout/FeaturePage'
import LivestockCrudSection from '../../components/crud/LivestockCrudSection'

export default function ManageLivestockRecords() {
  const { data } = useFarmData()

  return (
    <FeaturePage
      roleId="farm-manager"
      featurePath="livestock-records"
      title="Manage Livestock Records"
      description="Animal registration, tag numbers, breeds, age, weight, and categorization."
      badge="Farm Manager"
      stats={[{ label: 'Total Animals', value: data.livestock.length }]}
      hideRecordTable
    >
      <LivestockCrudSection
        roleId="farm-manager"
        featurePath="livestock-records"
        title="Livestock Registry"
      />
    </FeaturePage>
  )
}
