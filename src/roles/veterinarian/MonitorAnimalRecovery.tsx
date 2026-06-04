import { useFarmData } from '../../hooks/useFarmData'
import { useFarmActions } from '../../hooks/useFarmActions'
import FeaturePage from '../../components/layout/FeaturePage'
import DataTable from '../../components/data/DataTable'
import { livestockColumns, treatmentColumns } from '../../data/tableColumns'

export default function MonitorAnimalRecovery() {
  const { data } = useFarmData()
  const { completeTreatment, updateLivestock } = useFarmActions('veterinarian', 'animal-recovery')
  const recovering = data.livestock.filter(
    (l) => l.status === 'Recovering' || l.status === 'Sick',
  )

  const treatmentCols = [
    ...treatmentColumns,
    {
      key: 'complete',
      header: 'Recovery',
      render: (row: Record<string, unknown>) =>
        row.status === 'Active' ? (
          <button
            type="button"
            onClick={() => {
              completeTreatment(String(row.id))
              updateLivestock(String(row.animalTag), { status: 'Recovering' })
            }}
            className="px-2 py-1 text-xs font-semibold rounded-lg bg-farm-600 text-white"
          >
            Mark Recovering
          </button>
        ) : (
          '—'
        ),
    },
  ]

  return (
    <FeaturePage
      roleId="veterinarian"
      featurePath="animal-recovery"
      title="Monitor Animal Recovery"
      description="Track recovery progress and follow-up care."
      badge="Veterinarian"
      stats={[
        { label: 'Recovering', value: data.livestock.filter((l) => l.status === 'Recovering').length },
        { label: 'Active Treatments', value: data.treatments.filter((t) => t.status === 'Active').length },
      ]}
      columns={livestockColumns}
      data={recovering as unknown as Record<string, unknown>[]}
      actions={
        <p className="text-sm glass-card rounded-xl px-4 py-3 text-earth-700">
          Mark animals as recovering when treatment is progressing.
        </p>
      }
    >
      <DataTable
        columns={treatmentCols}
        data={data.treatments as unknown as Record<string, unknown>[]}
        title="Treatment Progress"
      />
    </FeaturePage>
  )
}
