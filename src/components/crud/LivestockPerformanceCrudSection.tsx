import { useCallback, useMemo, useState, type FormEvent } from 'react'
import { useFarmData } from '../../hooks/useFarmData'
import { useFarmActions } from '../../hooks/useFarmActions'
import type { Livestock } from '../../types/farm'
import type { RoleId } from '../../types/roles'
import ActionPanel, { Field, Input } from '../actions/ActionPanel'
import AnimalTagSelect from '../actions/AnimalTagSelect'
import CrudRowActions from '../actions/CrudRowActions'
import DataTable, { type Column } from '../data/DataTable'

interface LivestockPerformanceCrudSectionProps {
  roleId: RoleId
  featurePath: string
}

export default function LivestockPerformanceCrudSection({
  roleId,
  featurePath,
}: LivestockPerformanceCrudSectionProps) {
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
      weightKg: Number(fd.get('weightKg')),
      ageMonths: Number(fd.get('ageMonths')),
    })
    setMsg(`Performance recorded for ${tag}.`)
    e.currentTarget.reset()
  }

  const handleEditSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editing) return
    const fd = new FormData(e.currentTarget)
    updateLivestockById(editing.id, {
      weightKg: Number(fd.get('weightKg')),
      ageMonths: Number(fd.get('ageMonths')),
    })
    setMsg(`Updated performance for ${editing.tagNumber}.`)
    setEditing(null)
  }

  const handleDelete = useCallback(
    (animal: Livestock) => {
      if (!window.confirm(`Delete record for ${animal.name}?`)) return
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
      { key: 'weightKg', header: 'Weight (kg)' },
      { key: 'ageMonths', header: 'Age (mo)' },
      { key: 'status', header: 'Status' },
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
      <ActionPanel
        title="Record Performance"
        onSubmit={handleSubmit}
        submitLabel="Save Metrics"
        successMessage={msg}
      >
        <Field label="Animal"><AnimalTagSelect name="tag" /></Field>
        <Field label="Weight (kg)"><Input name="weightKg" type="number" step="0.1" required /></Field>
        <Field label="Age (months)"><Input name="ageMonths" type="number" required /></Field>
      </ActionPanel>
      {editing && (
        <ActionPanel title={`Edit Performance — ${editing.tagNumber}`} onSubmit={handleEditSave} submitLabel="Save">
          <Field label="Weight (kg)"><Input name="weightKg" type="number" step="0.1" required defaultValue={editing.weightKg} /></Field>
          <Field label="Age (months)"><Input name="ageMonths" type="number" required defaultValue={editing.ageMonths} /></Field>
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
        title="Animal Performance Records"
      />
    </div>
  )
}
