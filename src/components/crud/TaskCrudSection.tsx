import { useCallback, useMemo, useState, type FormEvent } from 'react'
import { useFarmData } from '../../hooks/useFarmData'
import { useFarmActions } from '../../hooks/useFarmActions'
import type { FarmTask } from '../../types/farm'
import type { RoleId } from '../../types/roles'
import ActionPanel, { Field, Input, Select } from '../actions/ActionPanel'
import CrudRowActions from '../actions/CrudRowActions'
import DataTable, { type Column } from '../data/DataTable'
import { taskColumns } from '../../data/tableColumns'

interface TaskCrudSectionProps {
  roleId: RoleId
  featurePath: string
  title?: string
  showQuickStatus?: boolean
}

export default function TaskCrudSection({
  roleId,
  featurePath,
  title = 'Farm Tasks',
  showQuickStatus = false,
}: TaskCrudSectionProps) {
  const { data } = useFarmData()
  const { addTask, updateTask, deleteTask, updateTaskStatus } = useFarmActions(
    roleId,
    featurePath,
  )
  const [msg, setMsg] = useState<string | null>(null)
  const [editing, setEditing] = useState<FarmTask | null>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const payload = {
      title: String(fd.get('title')),
      assignedTo: String(fd.get('assignedTo')),
      dueDate: String(fd.get('dueDate')),
      status: fd.get('status') as FarmTask['status'],
      priority: fd.get('priority') as FarmTask['priority'],
    }
    if (editing) {
      updateTask(editing.id, payload)
      setMsg('Task updated.')
      setEditing(null)
    } else {
      addTask({ ...payload, status: 'Pending' })
      setMsg('Task created.')
    }
    e.currentTarget.reset()
  }

  const handleDelete = useCallback(
    (task: FarmTask) => {
      if (!window.confirm(`Delete task "${task.title}"?`)) return
      deleteTask(task.id)
      setMsg('Task deleted.')
      setEditing((prev) => (prev?.id === task.id ? null : prev))
    },
    [deleteTask],
  )

  const columns: Column<Record<string, unknown>>[] = useMemo(
    () => [
      ...taskColumns,
      {
        key: 'actions',
        header: 'Actions',
        render: (row) => {
          const task = data.tasks.find((t) => t.id === row.id)
          if (!task) return null
          return (
            <div className="crud-actions-wrap">
              {showQuickStatus && task.status !== 'Completed' && (
                <>
                  <button
                    type="button"
                    onClick={() => updateTaskStatus(task.id, 'In Progress')}
                    className="crud-btn-edit min-h-[2rem]"
                  >
                    Start
                  </button>
                  <button
                    type="button"
                    onClick={() => updateTaskStatus(task.id, 'Completed')}
                    className="px-2.5 py-1 text-xs font-bold rounded-lg bg-farm-600 text-white min-h-[2rem] hover:bg-farm-700"
                  >
                    Done
                  </button>
                </>
              )}
              <CrudRowActions
                onEdit={() => {
                  setEditing(task)
                  setMsg(null)
                }}
                onDelete={() => handleDelete(task)}
              />
            </div>
          )
        },
      },
    ],
    [data.tasks, handleDelete, showQuickStatus, updateTaskStatus],
  )

  return (
    <div className="space-y-4">
      <ActionPanel
        title={editing ? 'Edit Farm Task' : 'Assign Farm Task'}
        onSubmit={handleSubmit}
        submitLabel={editing ? 'Save Changes' : 'Create Task'}
        successMessage={msg}
      >
        <Field label="Task Title" className="md:col-span-2">
          <Input name="title" required key={`t-${editing?.id ?? 'n'}`} defaultValue={editing?.title} />
        </Field>
        <Field label="Assign To">
          <Input name="assignedTo" required key={`a-${editing?.id ?? 'n'}`} defaultValue={editing?.assignedTo} />
        </Field>
        <Field label="Due Date">
          <Input name="dueDate" type="date" required key={`d-${editing?.id ?? 'n'}`} defaultValue={editing?.dueDate} />
        </Field>
        <Field label="Priority">
          <Select name="priority" required key={`p-${editing?.id ?? 'n'}`} defaultValue={editing?.priority ?? 'Medium'}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Select>
        </Field>
        {editing && (
          <Field label="Status">
            <Select name="status" required defaultValue={editing.status}>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
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
      <DataTable
        columns={columns}
        data={data.tasks as unknown as Record<string, unknown>[]}
        title={title}
      />
    </div>
  )
}
