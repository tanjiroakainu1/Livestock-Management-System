import { useCallback, useMemo, useState, type FormEvent } from 'react'
import { useFarmData } from '../../hooks/useFarmData'
import { useFarmActions } from '../../hooks/useFarmActions'
import { categoryInUse } from '../../lib/farmActions'
import type { LivestockCategory } from '../../types/farm'
import type { RoleId } from '../../types/roles'
import ActionPanel, { Field, Input, TextArea } from '../actions/ActionPanel'
import CrudRowActions from '../actions/CrudRowActions'
import DataTable, { type Column } from '../data/DataTable'
import { categoryColumns } from '../../data/tableColumns'

interface CategoryCrudSectionProps {
  roleId: RoleId
  featurePath: string
  title?: string
}

export default function CategoryCrudSection({
  roleId,
  featurePath,
  title = 'Livestock Categories',
}: CategoryCrudSectionProps) {
  const { data } = useFarmData()
  const { addCategory, updateCategory, deleteCategory } = useFarmActions(
    roleId,
    featurePath,
  )
  const [msg, setMsg] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [editing, setEditing] = useState<LivestockCategory | null>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const fd = new FormData(e.currentTarget)
    const name = String(fd.get('name')).trim()
    const description = String(fd.get('description')).trim()
    if (!name) return

    if (editing) {
      const duplicate = data.categories.some(
        (c) => c.id !== editing.id && c.name.toLowerCase() === name.toLowerCase(),
      )
      if (duplicate) {
        setError('A category with this name already exists.')
        return
      }
      updateCategory(editing.id, { name, description })
      setMsg(`Category "${name}" updated.`)
      setEditing(null)
    } else {
      const duplicate = data.categories.some(
        (c) => c.name.toLowerCase() === name.toLowerCase(),
      )
      if (duplicate) {
        setError('A category with this name already exists.')
        return
      }
      addCategory({ name, description })
      setMsg(`Category "${name}" added.`)
    }
    e.currentTarget.reset()
  }

  const handleDelete = useCallback(
    (cat: LivestockCategory) => {
      if (categoryInUse(data, cat.name)) {
        setError(
          `Cannot delete "${cat.name}" — ${cat.animalCount} animal(s) still assigned. Reassign or remove them first.`,
        )
        return
      }
      if (!window.confirm(`Delete category "${cat.name}"?`)) return
      setError(null)
      deleteCategory(cat.id)
      setMsg(`Category "${cat.name}" deleted.`)
      setEditing((prev) => (prev?.id === cat.id ? null : prev))
    },
    [data, deleteCategory],
  )

  const columns: Column<Record<string, unknown>>[] = useMemo(
    () => [
      ...categoryColumns,
      {
        key: 'actions',
        header: 'Actions',
        render: (row) => {
          const cat = data.categories.find((c) => c.id === row.id)
          if (!cat) return null
          const inUse = categoryInUse(data, cat.name)
          return (
            <CrudRowActions
              onEdit={() => {
                setEditing(cat)
                setMsg(null)
                setError(null)
              }}
              onDelete={() => handleDelete(cat)}
              deleteDisabled={inUse}
              deleteHint={
                inUse
                  ? `${cat.animalCount} animal(s) use this category`
                  : 'Delete category'
              }
            />
          )
        },
      },
    ],
    [data, handleDelete],
  )

  return (
    <div className="space-y-4">
      <ActionPanel
        title={editing ? `Edit Category: ${editing.name}` : 'Add Livestock Category'}
        description="Categories sync across livestock registration, reports, and all farm records."
        onSubmit={handleSubmit}
        submitLabel={editing ? 'Save Changes' : 'Add Category'}
        successMessage={msg}
      >
        <Field label="Category Name">
          <Input
            name="name"
            required
            placeholder="e.g. Cattle"
            key={editing?.id ?? 'new-name'}
            defaultValue={editing?.name}
          />
        </Field>
        <Field label="Description" className="md:col-span-2">
          <TextArea
            name="description"
            required
            placeholder="Category description"
            key={editing?.id ?? 'new-desc'}
            defaultValue={editing?.description}
          />
        </Field>
      </ActionPanel>
      {error && (
        <p className="text-sm font-medium text-red-700 bg-red-50 px-3 py-2 rounded-lg">
          {error}
        </p>
      )}
      {editing && (
        <button
          type="button"
          className="text-sm font-semibold text-earth-600 hover:text-earth-900"
          onClick={() => {
            setEditing(null)
            setError(null)
          }}
        >
          Cancel edit
        </button>
      )}
      <DataTable
        columns={columns}
        data={data.categories as unknown as Record<string, unknown>[]}
        title={title}
        emptyMessage="No categories yet. Add one above."
      />
    </div>
  )
}
