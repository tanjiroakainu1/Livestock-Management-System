import { useFarmData } from '../../hooks/useFarmData'
import FeaturePage from '../../components/layout/FeaturePage'
import { breedingColumns } from '../../data/tableColumns'

export default function TrackBreedingStatistics() {
  const { data } = useFarmData()

  return (
    <FeaturePage
      roleId="farm-owner"
      featurePath="breeding-statistics"
      title="Track Breeding Statistics"
      description="Mating, pregnancy, and offspring records."
      stats={[
        { label: 'Total Records', value: data.breedingRecords.length },
        { label: 'Pregnant', value: data.breedingRecords.filter((b) => b.status === 'Pregnant').length },
        { label: 'Born', value: data.breedingRecords.filter((b) => b.status === 'Born').length },
      ]}
      columns={breedingColumns}
      data={data.breedingRecords as unknown as Record<string, unknown>[]}
    />
  )
}
