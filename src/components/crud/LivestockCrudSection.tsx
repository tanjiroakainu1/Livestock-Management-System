import { useMemo, useState, type FormEvent } from 'react'
import { useFarmData } from '../../hooks/useFarmData'
import { useFarmActions } from '../../hooks/useFarmActions'
import type { Livestock } from '../../types/farm'
import type { RoleId } from '../../types/roles'
import ActionPanel, { Field, Input, Select } from '../actions/ActionPanel'
import CrudRowActions from '../actions/CrudRowActions'
import DataTable, { type Column } from '../data/DataTable'
import { livestockColumns } from '../../data/tableColumns'

interface LivestockCrudSectionProps {
  roleId: RoleId
  featurePath: string
  title?: string
  allowAdd?: boolean
}

export default function LivestockCrudSection({
  roleId,
  featurePath,
  title = 'Livestock Registry',
  allowAdd = true,
}: LivestockCrudSectionProps) {
  const { data } = useFarmData()
  const { addLivestock, updateLivestockById, deleteLivestock } = useFarmActions(
    roleId,
    featurePath,
  )
  const [msg, setMsg] = useState<string | null>(null)
  const [editing, setEditing] = useState<Livestock | null>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const payload = {
      tagNumber: String(fd.get('tagNumber')),
      name: String(fd.get('name')),
      breed: String(fd.get('breed')),
      category: String(fd.get('category')),
      ageMonths: Number(fd.get('ageMonths')),
      weightKg: Number(fd.get('weightKg')),
      location: String(fd.get('location')),
      status: fd.get('status') as Livestock['status'],
      registeredAt: editing?.registeredAt ?? new Date().toISOString().slice(0, 10),
    }

    if (editing) {
      updateLivestockById(editing.id, payload)
      setMsg(`Updated ${payload.tagNumber}.`)
      setEditing(null)
    } else {
      addLivestock(payload)
      setMsg(`Registered ${payload.tagNumber}.`)
    }
    e.currentTarget.reset()
  }

  const columns: Column<Record<string, unknown>>[] = useMemo(
    () => [
      ...livestockColumns,
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
              onDelete={() => {
                if (!window.confirm(`Delete ${animal.name} (${animal.tagNumber})?`)) return
                deleteLivestock(animal.id)
                setMsg(`Removed ${animal.tagNumber}.`)
                if (editing?.id === animal.id) setEditing(null)
              }}
            />
          )
        },
      },
    ],
    [data.livestock, editing, deleteLivestock],
  )

  return (
    <div className="space-y-4">
      {allowAdd && (
        <ActionPanel
          title={editing ? `Edit Animal: ${editing.tagNumber}` : 'Register Livestock'}
          onSubmit={handleSubmit}
          submitLabel={editing ? 'Save Changes' : 'Register Animal'}
          successMessage={msg}
        >
          <Field label="Tag Number">
            <Input
              name="tagNumber"
              required
              key={`tag-${editing?.id ?? 'new'}`}
              defaultValue={editing?.tagNumber}
            />
          </Field>
          <Field label="Name">
            <Input name="name" required key={`name-${editing?.id ?? 'new'}`} defaultValue={editing?.name} />
          </Field>
          <Field label="Breed">
            <Input name="breed" required key={`breed-${editing?.id ?? 'new'}`} defaultValue={editing?.breed} />
          </Field>
          <Field label="Category">
            <Select name="category" required key={`cat-${editing?.id ?? 'new'}`} defaultValue={editing?.category}>
              {data.categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Age (months)">
            <Input
              name="ageMonths"
              type="number"
              required
              key={`age-${editing?.id ?? 'new'}`}
              defaultValue={editing?.ageMonths}
            />
          </Field>
          <Field label="Weight (kg)">
            <Input
              name="weightKg"
              type="number"
              step="0.1"
              required
              key={`wt-${editing?.id ?? 'new'}`}
              defaultValue={editing?.weightKg}
            />
          </Field>
          <Field label="Location">
            <Input
              name="location"
              required
              key={`loc-${editing?.id ?? 'new'}`}
              defaultValue={editing?.location}
            />
          </Field>
          <Field label="Status">
            <Select name="status" required key={`st-${editing?.id ?? 'new'}`} defaultValue={editing?.status}>
              <option value="Healthy">Healthy</option>
              <option value="Sick">Sick</option>
              <option value="Recovering">Recovering</option>
              <option value="Pregnant">Pregnant</option>
            </Select>
          </Field>
        </ActionPanel>
      )}
      {editing && (
        <button
          type="button"
          className="text-sm font-semibold text-earth-600"
          onClick={() => setEditing(null)}
        >
          Cancel edit
        </button>
      )}
      <DataTable
        columns={columns}
        data={data.livestock as unknown as Record<string, unknown>[]}
        title={title}
      />
    </div>
  )
}
