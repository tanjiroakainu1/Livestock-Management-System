import { useCallback, useMemo, useState, type FormEvent } from 'react'
import { useFarmData } from '../../hooks/useFarmData'
import { useFarmActions } from '../../hooks/useFarmActions'
import type { FeedingLog } from '../../types/farm'
import type { RoleId } from '../../types/roles'
import ActionPanel, { Field, Input } from '../actions/ActionPanel'
import AnimalTagSelect from '../actions/AnimalTagSelect'
import CrudRowActions from '../actions/CrudRowActions'
import DataTable, { type Column } from '../data/DataTable'
import { feedingColumns } from '../../data/tableColumns'

interface FeedingCrudSectionProps {
  roleId: RoleId
  featurePath: string
  title?: string
}

export default function FeedingCrudSection({
  roleId,
  featurePath,
  title = 'Feeding Logs',
}: FeedingCrudSectionProps) {
  const { data } = useFarmData()
  const { addFeedingLog, updateFeedingLog, deleteFeedingLog, userName } =
    useFarmActions(roleId, featurePath)
  const [msg, setMsg] = useState<string | null>(null)
  const [editing, setEditing] = useState<FeedingLog | null>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const payload = {
      animalTag: String(fd.get('tag')),
      date: String(fd.get('date')),
      feedType: String(fd.get('feedType')),
      quantityKg: Number(fd.get('quantityKg')),
      recordedBy: editing?.recordedBy ?? userName,
    }
    if (editing) {
      updateFeedingLog(editing.id, payload)
      setMsg('Feeding log updated.')
      setEditing(null)
    } else {
      addFeedingLog(payload)
      setMsg('Feeding activity recorded.')
    }
    e.currentTarget.reset()
  }

  const handleDelete = useCallback(
    (log: FeedingLog) => {
      if (!window.confirm(`Delete feeding log for ${log.animalTag}?`)) return
      deleteFeedingLog(log.id)
      setMsg('Feeding log deleted.')
      setEditing((prev) => (prev?.id === log.id ? null : prev))
    },
    [deleteFeedingLog],
  )

  const columns: Column<Record<string, unknown>>[] = useMemo(
    () => [
      ...feedingColumns,
      {
        key: 'actions',
        header: 'Actions',
        render: (row) => {
          const log = data.feedingLogs.find((f) => f.id === row.id)
          if (!log) return null
          return (
            <CrudRowActions
              onEdit={() => {
                setEditing(log)
                setMsg(null)
              }}
              onDelete={() => handleDelete(log)}
            />
          )
        },
      },
    ],
    [data.feedingLogs, handleDelete],
  )

  return (
    <div className="space-y-4">
      <ActionPanel
        title={editing ? 'Edit Feeding Log' : 'Log Daily Feeding'}
        onSubmit={handleSubmit}
        submitLabel={editing ? 'Save Changes' : 'Record Feeding'}
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
          <Input name="date" type="date" required defaultValue={editing?.date ?? new Date().toISOString().slice(0, 10)} />
        </Field>
        <Field label="Feed Type">
          <Input name="feedType" required defaultValue={editing?.feedType} placeholder="Alfalfa hay" />
        </Field>
        <Field label="Quantity (kg)">
          <Input name="quantityKg" type="number" step="0.1" required defaultValue={editing?.quantityKg} />
        </Field>
      </ActionPanel>
      {editing && (
        <button type="button" className="text-sm font-semibold text-earth-600" onClick={() => setEditing(null)}>
          Cancel edit
        </button>
      )}
      <DataTable
        columns={columns}
        data={data.feedingLogs as unknown as Record<string, unknown>[]}
        title={title}
      />
    </div>
  )
}
