import { useFarmData } from '../../hooks/useFarmData'
import FeaturePage from '../../components/layout/FeaturePage'
import HealthRecordsOverview from '../../components/owner/HealthRecordsOverview'

export default function MonitorHealthRecords() {
  const { data } = useFarmData()

  return (
    <FeaturePage
      roleId="farm-owner"
      featurePath="health-records"
      title="Monitor Health Records"
      description="Vaccination history, medical records, and treatment overview."
      badge="Health Management"
      stats={[
        { label: 'Health Records', value: data.healthRecords.length },
        { label: 'Vaccinations', value: data.vaccinations.length },
        { label: 'Treatments', value: data.treatments.length },
      ]}
      hideRecordTable
    >
      <HealthRecordsOverview />
    </FeaturePage>
  )
}
