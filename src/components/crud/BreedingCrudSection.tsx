import { useCallback, useMemo, useState, type FormEvent } from 'react'
import { useFarmData } from '../../hooks/useFarmData'
import { useFarmActions } from '../../hooks/useFarmActions'
import type { BreedingRecord } from '../../types/farm'
import type { RoleId } from '../../types/roles'
import ActionPanel, { Field, Input, Select } from '../actions/ActionPanel'
import CrudRowActions from '../actions/CrudRowActions'
import DataTable, { type Column } from '../data/DataTable'
import { breedingColumns } from '../../data/tableColumns'

interface BreedingCrudSectionProps {
  roleId: RoleId
  featurePath: string
  title?: string
}

export default function BreedingCrudSection({
  roleId,
  featurePath,
  title = 'Breeding Records',
}: BreedingCrudSectionProps) {
  const { data } = useFarmData()
  const { addBreedingRecord, updateBreedingRecord, deleteBreedingRecord } =
    useFarmActions(roleId, featurePath)
  const [msg, setMsg] = useState<string | null>(null)
  const [editing, setEditing] = useState<BreedingRecord | null>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const payload = {
      femaleTag: String(fd.get('femaleTag')),
      maleTag: String(fd.get('maleTag')),
      matingDate: String(fd.get('matingDate')),
      expectedBirth: String(fd.get('expectedBirth')),
      status: fd.get('status') as BreedingRecord['status'],
      offspringCount: Number(fd.get('offspringCount') || 0),
    }
    if (editing) {
      updateBreedingRecord(editing.id, payload)
      setMsg('Breeding record updated.')
      setEditing(null)
    } else {
      addBreedingRecord(payload)
      setMsg('Breeding record added.')
    }
    e.currentTarget.reset()
  }

  const handleDelete = useCallback(
    (record: BreedingRecord) => {
      if (!window.confirm(`Delete breeding record ${record.femaleTag} × ${record.maleTag}?`)) return
      deleteBreedingRecord(record.id)
      setMsg('Breeding record deleted.')
      setEditing((prev) => (prev?.id === record.id ? null : prev))
    },
    [deleteBreedingRecord],
  )

  const columns: Column<Record<string, unknown>>[] = useMemo(
    () => [
      ...breedingColumns,
      {
        key: 'actions',
        header: 'Actions',
        render: (row) => {
          const rec = data.breedingRecords.find((r) => r.id === row.id)
          if (!rec) return null
          return (
            <CrudRowActions
              onEdit={() => {
                setEditing(rec)
                setMsg(null)
              }}
              onDelete={() => handleDelete(rec)}
            />
          )
        },
      },
    ],
    [data.breedingRecords, handleDelete],
  )

  return (
    <div className="space-y-4">
      <ActionPanel
        title={editing ? 'Edit Breeding Record' : 'Add Breeding Record'}
        onSubmit={handleSubmit}
        submitLabel={editing ? 'Save Changes' : 'Add Record'}
        successMessage={msg}
      >
        <Field label="Female Tag">
          <Input name="femaleTag" required key={`f-${editing?.id ?? 'n'}`} defaultValue={editing?.femaleTag} />
        </Field>
        <Field label="Male Tag">
          <Input name="maleTag" required key={`m-${editing?.id ?? 'n'}`} defaultValue={editing?.maleTag} />
        </Field>
        <Field label="Mating Date">
          <Input name="matingDate" type="date" required key={`md-${editing?.id ?? 'n'}`} defaultValue={editing?.matingDate} />
        </Field>
        <Field label="Expected Birth">
          <Input name="expectedBirth" type="date" required key={`eb-${editing?.id ?? 'n'}`} defaultValue={editing?.expectedBirth} />
        </Field>
        <Field label="Status">
          <Select name="status" required key={`st-${editing?.id ?? 'n'}`} defaultValue={editing?.status ?? 'Mated'}>
            <option value="Mated">Mated</option>
            <option value="Pregnant">Pregnant</option>
            <option value="Born">Born</option>
          </Select>
        </Field>
        <Field label="Offspring Count">
          <Input name="offspringCount" type="number" defaultValue={editing?.offspringCount ?? 0} />
        </Field>
      </ActionPanel>
      {editing && (
        <button type="button" className="text-sm font-semibold text-earth-600" onClick={() => setEditing(null)}>
          Cancel edit
        </button>
      )}
      <DataTable
        columns={columns}
        data={data.breedingRecords as unknown as Record<string, unknown>[]}
        title={title}
      />
    </div>
  )
}
