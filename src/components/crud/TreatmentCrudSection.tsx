import { useCallback, useMemo, useState, type FormEvent } from 'react'
import { useFarmData } from '../../hooks/useFarmData'
import { useFarmActions } from '../../hooks/useFarmActions'
import { findAnimal } from '../../lib/farmActions'
import type { Treatment } from '../../types/farm'
import type { RoleId } from '../../types/roles'
import ActionPanel, { Field, Input, Select } from '../actions/ActionPanel'
import AnimalTagSelect from '../actions/AnimalTagSelect'
import CrudRowActions from '../actions/CrudRowActions'
import DataTable, { type Column } from '../data/DataTable'
import { treatmentColumns } from '../../data/tableColumns'

interface TreatmentCrudSectionProps {
  roleId: RoleId
  featurePath: string
  title?: string
  filter?: (t: Treatment) => boolean
  showMedicineInventory?: boolean
}

export default function TreatmentCrudSection({
  roleId,
  featurePath,
  title = 'Treatments',
  filter,
  showMedicineInventory = false,
}: TreatmentCrudSectionProps) {
  const { data } = useFarmData()
  const { addTreatment, updateTreatment, deleteTreatment } = useFarmActions(
    roleId,
    featurePath,
  )
  const [msg, setMsg] = useState<string | null>(null)
  const [editing, setEditing] = useState<Treatment | null>(null)

  const treatments = filter ? data.treatments.filter(filter) : data.treatments
  const medicine = data.inventory.filter((i) => i.category === 'Medicine')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const tag = String(fd.get('tag'))
    const animal = findAnimal(data, tag)
    const payload = {
      animalTag: tag,
      animalName: animal?.name ?? tag,
      diagnosis: String(fd.get('diagnosis')),
      treatment: String(fd.get('treatment')),
      startDate: String(fd.get('startDate')),
      endDate: String(fd.get('endDate')),
      status: fd.get('status') as Treatment['status'],
    }
    if (editing) {
      updateTreatment(editing.id, payload)
      setMsg('Treatment updated.')
      setEditing(null)
    } else {
      addTreatment({ ...payload, status: 'Active' })
      setMsg('Treatment prescribed.')
    }
    e.currentTarget.reset()
  }

  const handleDelete = useCallback(
    (t: Treatment) => {
      if (!window.confirm(`Delete treatment for ${t.animalTag}?`)) return
      deleteTreatment(t.id)
      setMsg('Treatment deleted.')
      setEditing((prev) => (prev?.id === t.id ? null : prev))
    },
    [deleteTreatment],
  )

  const columns: Column<Record<string, unknown>>[] = useMemo(
    () => [
      ...treatmentColumns,
      {
        key: 'actions',
        header: 'Actions',
        render: (row) => {
          const rec = data.treatments.find((t) => t.id === row.id)
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
    [data.treatments, handleDelete],
  )

  return (
    <div className="space-y-4">
      <ActionPanel
        title={editing ? 'Edit Treatment' : 'Prescribe Treatment'}
        onSubmit={handleSubmit}
        submitLabel={editing ? 'Save Changes' : 'Prescribe'}
        successMessage={msg}
      >
        {!editing && <Field label="Animal"><AnimalTagSelect name="tag" /></Field>}
        {editing && (
          <Field label="Animal">
            <Input readOnly defaultValue={editing.animalTag} />
            <input type="hidden" name="tag" value={editing.animalTag} />
          </Field>
        )}
        <Field label="Diagnosis"><Input name="diagnosis" required defaultValue={editing?.diagnosis} /></Field>
        <Field label="Treatment" className="md:col-span-2">
          <Input name="treatment" required defaultValue={editing?.treatment} />
        </Field>
        <Field label="Start Date">
          <Input name="startDate" type="date" required defaultValue={editing?.startDate ?? new Date().toISOString().slice(0, 10)} />
        </Field>
        <Field label="End Date">
          <Input name="endDate" type="date" required defaultValue={editing?.endDate} />
        </Field>
        {editing && (
          <Field label="Status">
            <Select name="status" required defaultValue={editing.status}>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
            </Select>
          </Field>
        )}
      </ActionPanel>
      {editing && (
        <button type="button" className="text-sm font-semibold text-earth-600" onClick={() => setEditing(null)}>
          Cancel edit
        </button>
      )}
      {showMedicineInventory && medicine.length > 0 && (
        <p className="text-xs text-earth-600 glass-card rounded-lg px-3 py-2">
          Medicine on hand: {medicine.map((m) => `${m.name} (${m.quantity} ${m.unit})`).join(' · ')}
        </p>
      )}
      <DataTable
        columns={columns}
        data={treatments as unknown as Record<string, unknown>[]}
        title={title}
      />
    </div>
  )
}
