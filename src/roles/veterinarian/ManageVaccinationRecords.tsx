import { useFarmData } from '../../hooks/useFarmData'
import FeaturePage from '../../components/layout/FeaturePage'
import VaccinationCrudSection from '../../components/crud/VaccinationCrudSection'

export default function ManageVaccinationRecords() {
  const { data } = useFarmData()

  return (
    <FeaturePage
      roleId="veterinarian"
      featurePath="vaccination-records"
      title="Manage Vaccination Records"
      description="Track vaccinations, due dates, and immunization schedules."
      badge="Veterinarian"
      stats={[{ label: 'Vaccinations', value: data.vaccinations.length }]}
      hideRecordTable
    >
      <VaccinationCrudSection roleId="veterinarian" featurePath="vaccination-records" />
    </FeaturePage>
  )
}
