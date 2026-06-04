import { useCallback, useMemo, useState, type FormEvent } from 'react'
import { useFarmData } from '../../hooks/useFarmData'
import { useFarmActions } from '../../hooks/useFarmActions'
import type { Livestock } from '../../types/farm'
import type { RoleId } from '../../types/roles'
import ActionPanel, { Field, Input } from '../actions/ActionPanel'
import AnimalTagSelect from '../actions/AnimalTagSelect'
import CrudRowActions from '../actions/CrudRowActions'
import DataTable, { type Column } from '../data/DataTable'

interface LivestockLocationCrudSectionProps {
  roleId: RoleId
  featurePath: string
}

export default function LivestockLocationCrudSection({
  roleId,
  featurePath,
}: LivestockLocationCrudSectionProps) {
  const { data } = useFarmData()
  const { updateLivestockById, deleteLivestock } = useFarmActions(roleId, featurePath)
  const [msg, setMsg] = useState<string | null>(null)
  const [editing, setEditing] = useState<Livestock | null>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const tag = String(fd.get('tag'))
    const location = String(fd.get('location'))
    const animal = data.livestock.find((l) => l.tagNumber === tag)
    if (!animal) return
    updateLivestockById(animal.id, { location })
    setMsg(`Location updated: ${tag} → ${location}`)
    setEditing(null)
    e.currentTarget.reset()
  }

  const handleEditSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editing) return
    const fd = new FormData(e.currentTarget)
    updateLivestockById(editing.id, { location: String(fd.get('location')) })
    setMsg(`Updated location for ${editing.tagNumber}.`)
    setEditing(null)
  }

  const handleDelete = useCallback(
    (animal: Livestock) => {
      if (!window.confirm(`Remove ${animal.name} (${animal.tagNumber}) from registry?`)) return
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
      { key: 'category', header: 'Category' },
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
      <ActionPanel
        title="Assign Location"
        description="Select animal and new pen, pasture, or housing."
        onSubmit={handleSubmit}
        submitLabel="Assign Location"
        successMessage={msg}
      >
        <Field label="Animal"><AnimalTagSelect name="tag" /></Field>
        <Field label="New Location"><Input name="location" required placeholder="North Pasture A" /></Field>
      </ActionPanel>
      {editing && (
        <ActionPanel
          title={`Edit Location — ${editing.tagNumber}`}
          onSubmit={handleEditSave}
          submitLabel="Save Location"
        >
          <Field label="Location" className="md:col-span-2">
            <Input name="location" required defaultValue={editing.location} />
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
        title="Animal Locations"
      />
    </div>
  )
}
