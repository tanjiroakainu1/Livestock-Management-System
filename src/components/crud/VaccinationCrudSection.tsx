import { useCallback, useMemo, useState, type FormEvent } from 'react'
import { useFarmData } from '../../hooks/useFarmData'
import { useFarmActions } from '../../hooks/useFarmActions'
import { findAnimal } from '../../lib/farmActions'
import type { Vaccination } from '../../types/farm'
import type { RoleId } from '../../types/roles'
import ActionPanel, { Field, Input } from '../actions/ActionPanel'
import AnimalTagSelect from '../actions/AnimalTagSelect'
import CrudRowActions from '../actions/CrudRowActions'
import DataTable, { type Column } from '../data/DataTable'
import { vaccinationColumns } from '../../data/tableColumns'

interface VaccinationCrudSectionProps {
  roleId: RoleId
  featurePath: string
  title?: string
}

export default function VaccinationCrudSection({
  roleId,
  featurePath,
  title = 'Vaccination Records',
}: VaccinationCrudSectionProps) {
  const { data } = useFarmData()
  const { addVaccination, updateVaccination, deleteVaccination, userName } =
    useFarmActions(roleId, featurePath)
  const [msg, setMsg] = useState<string | null>(null)
  const [editing, setEditing] = useState<Vaccination | null>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const tag = String(fd.get('tag'))
    const animal = findAnimal(data, tag)
    const payload = {
      animalTag: tag,
      animalName: animal?.name ?? tag,
      vaccine: String(fd.get('vaccine')),
      date: String(fd.get('date')),
      nextDue: String(fd.get('nextDue')),
      administeredBy: editing?.administeredBy ?? userName,
    }
    if (editing) {
      updateVaccination(editing.id, payload)
      setMsg('Vaccination updated.')
      setEditing(null)
    } else {
      addVaccination(payload)
      setMsg('Vaccination recorded.')
    }
    e.currentTarget.reset()
  }

  const handleDelete = useCallback(
    (vac: Vaccination) => {
      if (!window.confirm(`Delete vaccination ${vac.vaccine} for ${vac.animalTag}?`)) return
      deleteVaccination(vac.id)
      setMsg('Vaccination deleted.')
      setEditing((prev) => (prev?.id === vac.id ? null : prev))
    },
    [deleteVaccination],
  )

  const columns: Column<Record<string, unknown>>[] = useMemo(
    () => [
      ...vaccinationColumns,
      {
        key: 'actions',
        header: 'Actions',
        render: (row) => {
          const rec = data.vaccinations.find((v) => v.id === row.id)
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
    [data.vaccinations, handleDelete],
  )

  return (
    <div className="space-y-4">
      <ActionPanel
        title={editing ? 'Edit Vaccination' : 'Record Vaccination'}
        onSubmit={handleSubmit}
        submitLabel={editing ? 'Save Changes' : 'Save'}
        successMessage={msg}
      >
        {!editing && <Field label="Animal"><AnimalTagSelect name="tag" /></Field>}
        {editing && (
          <Field label="Animal">
            <Input readOnly defaultValue={editing.animalTag} />
            <input type="hidden" name="tag" value={editing.animalTag} />
          </Field>
        )}
        <Field label="Vaccine">
          <Input name="vaccine" required defaultValue={editing?.vaccine} />
        </Field>
        <Field label="Date Given">
          <Input name="date" type="date" required defaultValue={editing?.date} />
        </Field>
        <Field label="Next Due">
          <Input name="nextDue" type="date" required defaultValue={editing?.nextDue} />
        </Field>
      </ActionPanel>
      {editing && (
        <button type="button" className="text-sm font-semibold text-earth-600" onClick={() => setEditing(null)}>
          Cancel edit
        </button>
      )}
      <DataTable
        columns={columns}
        data={data.vaccinations as unknown as Record<string, unknown>[]}
        title={title}
      />
    </div>
  )
}
