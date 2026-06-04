import { useCallback, useMemo, useState, type FormEvent } from 'react'
import { useFarmData } from '../../hooks/useFarmData'
import { useFarmActions } from '../../hooks/useFarmActions'
import { findAnimal } from '../../lib/farmActions'
import type { HealthRecord } from '../../types/farm'
import type { RoleId } from '../../types/roles'
import ActionPanel, { Field, Input, Select, TextArea } from '../actions/ActionPanel'
import AnimalTagSelect from '../actions/AnimalTagSelect'
import CrudRowActions from '../actions/CrudRowActions'
import DataTable, { type Column } from '../data/DataTable'
import { healthColumns } from '../../data/tableColumns'

interface HealthRecordCrudSectionProps {
  roleId: RoleId
  featurePath: string
  title?: string
  filter?: (record: HealthRecord) => boolean
}

export default function HealthRecordCrudSection({
  roleId,
  featurePath,
  title = 'Health Records',
  filter,
}: HealthRecordCrudSectionProps) {
  const { data } = useFarmData()
  const { addHealthRecord, updateHealthRecord, deleteHealthRecord, userName } =
    useFarmActions(roleId, featurePath)
  const [msg, setMsg] = useState<string | null>(null)
  const [editing, setEditing] = useState<HealthRecord | null>(null)

  const records = filter ? data.healthRecords.filter(filter) : data.healthRecords

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const tag = String(fd.get('tag'))
    const animal = findAnimal(data, tag)
    const payload = {
      animalTag: tag,
      animalName: animal?.name ?? tag,
      date: String(fd.get('date')),
      condition: String(fd.get('condition')),
      notes: String(fd.get('notes')),
      recordedBy: editing?.recordedBy ?? userName,
    }
    if (editing) {
      updateHealthRecord(editing.id, payload)
      setMsg('Health record updated.')
      setEditing(null)
    } else {
      addHealthRecord(payload)
      setMsg('Health record saved.')
    }
    e.currentTarget.reset()
  }

  const handleDelete = useCallback(
    (record: HealthRecord) => {
      if (!window.confirm(`Delete health record for ${record.animalTag}?`)) return
      deleteHealthRecord(record.id)
      setMsg('Health record deleted.')
      setEditing((prev) => (prev?.id === record.id ? null : prev))
    },
    [deleteHealthRecord],
  )

  const columns: Column<Record<string, unknown>>[] = useMemo(
    () => [
      ...healthColumns,
      {
        key: 'actions',
        header: 'Actions',
        render: (row) => {
          const rec = data.healthRecords.find((r) => r.id === row.id)
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
    [data.healthRecords, handleDelete],
  )

  return (
    <div className="space-y-4">
      <ActionPanel
        title={editing ? `Edit Health Record — ${editing.animalTag}` : 'New Health Record'}
        onSubmit={handleSubmit}
        submitLabel={editing ? 'Save Changes' : 'Save Record'}
        successMessage={msg}
      >
        {!editing && <Field label="Animal"><AnimalTagSelect name="tag" /></Field>}
        {editing && (
          <Field label="Animal">
            <Input readOnly defaultValue={editing.animalTag} />
            <input type="hidden" name="tag" value={editing.animalTag} />
          </Field>
        )}
        <Field label="Date">
          <Input name="date" type="date" required key={`d-${editing?.id ?? 'n'}`} defaultValue={editing?.date ?? new Date().toISOString().slice(0, 10)} />
        </Field>
        <Field label="Condition">
          <Select name="condition" required key={`c-${editing?.id ?? 'n'}`} defaultValue={editing?.condition ?? 'Healthy'}>
            <option value="Healthy">Healthy</option>
            <option value="Sick">Sick</option>
            <option value="Recovering">Recovering</option>
          </Select>
        </Field>
        <Field label="Notes" className="md:col-span-2">
          <TextArea name="notes" required key={`n-${editing?.id ?? 'n'}`} defaultValue={editing?.notes} />
        </Field>
      </ActionPanel>
      {editing && (
        <button type="button" className="text-sm font-semibold text-earth-600" onClick={() => setEditing(null)}>
          Cancel edit
        </button>
      )}
      <DataTable
        columns={columns}
        data={records as unknown as Record<string, unknown>[]}
        title={title}
      />
    </div>
  )
}
