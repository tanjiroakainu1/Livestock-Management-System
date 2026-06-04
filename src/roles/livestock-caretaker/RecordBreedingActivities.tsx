import { useFarmData } from '../../hooks/useFarmData'
import FeaturePage from '../../components/layout/FeaturePage'
import BreedingCrudSection from '../../components/crud/BreedingCrudSection'

export default function RecordBreedingActivities() {
  const { data } = useFarmData()

  return (
    <FeaturePage
      roleId="livestock-caretaker"
      featurePath="breeding-activities"
      title="Record Breeding Activities"
      description="Log mating events and breeding-related observations."
      badge="Caretaker"
      stats={[{ label: 'Breeding Records', value: data.breedingRecords.length }]}
      hideRecordTable
    >
      <BreedingCrudSection roleId="livestock-caretaker" featurePath="breeding-activities" />
    </FeaturePage>
  )
}
