import { useFarmData } from '../../hooks/useFarmData'
import FeaturePage from '../../components/layout/FeaturePage'
import HealthRecordCrudSection from '../../components/crud/HealthRecordCrudSection'

export default function RecordAnimalHealth() {
  const { data } = useFarmData()

  return (
    <FeaturePage
      roleId="veterinarian"
      featurePath="animal-health"
      title="Record Animal Health Information"
      description="Log health status, medical history, and examination findings."
      badge="Veterinarian"
      stats={[{ label: 'Records', value: data.healthRecords.length }]}
      hideRecordTable
    >
      <HealthRecordCrudSection roleId="veterinarian" featurePath="animal-health" />
    </FeaturePage>
  )
}
