import { useFarmData } from '../../hooks/useFarmData'
import FeaturePage from '../../components/layout/FeaturePage'
import TreatmentCrudSection from '../../components/crud/TreatmentCrudSection'

export default function PrescribeTreatments() {
  const { data } = useFarmData()
  const medicine = data.inventory.filter((i) => i.category === 'Medicine')

  return (
    <FeaturePage
      roleId="veterinarian"
      featurePath="prescribe-treatments"
      title="Prescribe Treatments"
      description="Create treatment plans and manage medicine inventory."
      badge="Veterinarian"
      stats={[
        { label: 'Active', value: data.treatments.filter((t) => t.status === 'Active').length },
        { label: 'Medicine Items', value: medicine.length },
      ]}
      hideRecordTable
    >
      <TreatmentCrudSection
        roleId="veterinarian"
        featurePath="prescribe-treatments"
        showMedicineInventory
      />
    </FeaturePage>
  )
}
