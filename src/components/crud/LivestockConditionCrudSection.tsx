import { useCallback, useMemo, useState, type FormEvent } from 'react'
import { useFarmData } from '../../hooks/useFarmData'
import { useFarmActions } from '../../hooks/useFarmActions'
import type { Livestock } from '../../types/farm'
import type { RoleId } from '../../types/roles'
import ActionPanel, { Field, Select } from '../actions/ActionPanel'
import AnimalTagSelect from '../actions/AnimalTagSelect'
import CrudRowActions from '../actions/CrudRowActions'
import DataTable, { type Column } from '../data/DataTable'

interface LivestockConditionCrudSectionProps {
  roleId: RoleId
  featurePath: string
}

export default function LivestockConditionCrudSection({
  roleId,
  featurePath,
}: LivestockConditionCrudSectionProps) {
  const { data } = useFarmData()
  const { updateLivestockById, deleteLivestock } = useFarmActions(roleId, featurePath)
  const [msg, setMsg] = useState<string | null>(null)
  const [editing, setEditing] = useState<Livestock | null>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const tag = String(fd.get('tag'))
    const animal = data.livestock.find((l) => l.tagNumber === tag)
    if (!animal) return
    updateLivestockById(animal.id, {
      status: fd.get('status') as Livestock['status'],
    })
    setMsg(`Condition updated for ${tag}.`)
    e.currentTarget.reset()
  }

  const handleEditSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editing) return
    const fd = new FormData(e.currentTarget)
    updateLivestockById(editing.id, {
      status: fd.get('status') as Livestock['status'],
    })
    setMsg(`Updated ${editing.tagNumber}.`)
    setEditing(null)
  }

  const handleDelete = useCallback(
    (animal: Livestock) => {
      if (!window.confirm(`Remove ${animal.name} from registry?`)) return
      deleteLivestock(animal.id)
      setMsg(`Removed ${animal.tagNumber}.`)
      setEditing((prev) => (prev?.id === animal.id ? null : prev))
    },
    [deleteLivestock],
  )

  const columns: Column<Record<string, unknown>>[] = useMemo(
    () => [
      { key: 'tagNumber', header: 'Tag' },
      { key: 'name', header: 'Name' },
      { key: 'status', header: 'Condition' },
      { key: 'location', header: 'Location' },
      {
        key: 'actions',
        header: 'Actions',
        render: (row) => {
          const animal = data.livestock.find((l) => l.id === row.id)
          if (!animal) return null
          return (
            <CrudRowActions
              onEdit={() => {
                setEditing(animal)
                setMsg(null)
              }}
              onDelete={() => handleDelete(animal)}
            />
          )
        },
      },
    ],
    [data.livestock, handleDelete],
  )

  return (
    <div className="space-y-4">
      <ActionPanel title="Update Animal Condition" onSubmit={handleSubmit} submitLabel="Update" successMessage={msg}>
        <Field label="Animal"><AnimalTagSelect name="tag" /></Field>
        <Field label="Observed Status">
          <Select name="status" required>
            <option value="Healthy">Healthy</option>
            <option value="Sick">Sick</option>
            <option value="Recovering">Recovering</option>
            <option value="Pregnant">Pregnant</option>
          </Select>
        </Field>
      </ActionPanel>
      {editing && (
        <ActionPanel title={`Edit — ${editing.tagNumber}`} onSubmit={handleEditSave} submitLabel="Save">
          <Field label="Status">
            <Select name="status" required defaultValue={editing.status}>
              <option value="Healthy">Healthy</option>
              <option value="Sick">Sick</option>
              <option value="Recovering">Recovering</option>
              <option value="Pregnant">Pregnant</option>
            </Select>
          </Field>
        </ActionPanel>
      )}
      {editing && (
        <button type="button" className="text-sm font-semibold text-earth-600" onClick={() => setEditing(null)}>
          Cancel edit
        </button>
      )}
      <DataTable
        columns={columns}
        data={data.livestock as unknown as Record<string, unknown>[]}
        title="Animal Conditions"
      />
    </div>
  )
}
