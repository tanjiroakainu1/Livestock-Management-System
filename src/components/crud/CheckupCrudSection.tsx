import { useCallback, useMemo, useState, type FormEvent } from 'react'
import { useFarmData } from '../../hooks/useFarmData'
import { useFarmActions } from '../../hooks/useFarmActions'
import { findAnimal } from '../../lib/farmActions'
import type { HealthCheckup } from '../../types/farm'
import type { RoleId } from '../../types/roles'
import ActionPanel, { Field, Input, Select } from '../actions/ActionPanel'
import AnimalTagSelect from '../actions/AnimalTagSelect'
import CrudRowActions from '../actions/CrudRowActions'
import DataTable, { type Column } from '../data/DataTable'
import { checkupColumns } from '../../data/tableColumns'

interface CheckupCrudSectionProps {
  roleId: RoleId
  featurePath: string
  title?: string
}

export default function CheckupCrudSection({
  roleId,
  featurePath,
  title = 'Health Checkups',
}: CheckupCrudSectionProps) {
  const { data } = useFarmData()
  const { addCheckup, updateCheckup, deleteCheckup, userName } = useFarmActions(
    roleId,
    featurePath,
  )
  const [msg, setMsg] = useState<string | null>(null)
  const [editing, setEditing] = useState<HealthCheckup | null>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const tag = String(fd.get('tag'))
    const animal = findAnimal(data, tag)
    const payload = {
      animalTag: tag,
      animalName: animal?.name ?? tag,
      scheduledDate: String(fd.get('scheduledDate')),
      type: String(fd.get('type')),
      status: fd.get('status') as HealthCheckup['status'],
      veterinarian: editing?.veterinarian ?? userName,
    }
    if (editing) {
      updateCheckup(editing.id, payload)
      setMsg('Checkup updated.')
      setEditing(null)
    } else {
      addCheckup({ ...payload, status: 'Scheduled' })
      setMsg('Checkup scheduled.')
    }
    e.currentTarget.reset()
  }

  const handleDelete = useCallback(
    (checkup: HealthCheckup) => {
      if (!window.confirm(`Delete checkup for ${checkup.animalTag}?`)) return
      deleteCheckup(checkup.id)
      setMsg('Checkup deleted.')
      setEditing((prev) => (prev?.id === checkup.id ? null : prev))
    },
    [deleteCheckup],
  )

  const columns: Column<Record<string, unknown>>[] = useMemo(
    () => [
      ...checkupColumns,
      {
        key: 'actions',
        header: 'Actions',
        render: (row) => {
          const rec = data.checkups.find((c) => c.id === row.id)
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
    [data.checkups, handleDelete],
  )

  return (
    <div className="space-y-4">
      <ActionPanel
        title={editing ? 'Edit Checkup' : 'Schedule Checkup'}
        onSubmit={handleSubmit}
        submitLabel={editing ? 'Save Changes' : 'Schedule'}
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
          <Input name="scheduledDate" type="date" required defaultValue={editing?.scheduledDate} />
        </Field>
        <Field label="Checkup Type" className="md:col-span-2">
          <Input name="type" required defaultValue={editing?.type} placeholder="Annual wellness" />
        </Field>
        {editing && (
          <Field label="Status">
            <Select name="status" required defaultValue={editing.status}>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Overdue">Overdue</option>
            </Select>
          </Field>
        )}
      </ActionPanel>
      {editing && (
        <button type="button" className="text-sm font-semibold text-earth-600" onClick={() => setEditing(null)}>
          Cancel edit
        </button>
      )}
      <DataTable
        columns={columns}
        data={data.checkups as unknown as Record<string, unknown>[]}
        title={title}
      />
    </div>
  )
}
