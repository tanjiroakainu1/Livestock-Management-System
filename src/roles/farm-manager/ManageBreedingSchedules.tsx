import { useFarmData } from '../../hooks/useFarmData'
import FeaturePage from '../../components/layout/FeaturePage'
import BreedingCrudSection from '../../components/crud/BreedingCrudSection'

export default function ManageBreedingSchedules() {
  const { data } = useFarmData()

  return (
    <FeaturePage
      roleId="farm-manager"
      featurePath="breeding-schedules"
      title="Manage Breeding Schedules"
      description="Mating schedules, pregnancy tracking, and birth records."
      badge="Farm Manager"
      stats={[
        { label: 'Records', value: data.breedingRecords.length },
        { label: 'Pregnant', value: data.breedingRecords.filter((b) => b.status === 'Pregnant').length },
      ]}
      hideRecordTable
    >
      <BreedingCrudSection roleId="farm-manager" featurePath="breeding-schedules" />
    </FeaturePage>
  )
}
