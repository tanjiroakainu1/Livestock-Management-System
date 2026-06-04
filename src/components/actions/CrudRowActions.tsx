import { Pencil, Trash2 } from 'lucide-react'

interface CrudRowActionsProps {
  onEdit: () => void
  onDelete: () => void
  deleteDisabled?: boolean
  deleteHint?: string
}

export default function CrudRowActions({
  onEdit,
  onDelete,
  deleteDisabled = false,
  deleteHint,
}: CrudRowActionsProps) {
  return (
    <div className="crud-actions-wrap">
      <button
        type="button"
        onClick={onEdit}
        className="crud-btn-edit inline-flex items-center gap-1 min-h-[2rem]"
      >
        <Pencil className="h-3 w-3 shrink-0" />
        Edit
      </button>
      <button
        type="button"
        onClick={onDelete}
        disabled={deleteDisabled}
        title={deleteHint}
        className="crud-btn-delete inline-flex items-center gap-1 min-h-[2rem]"
      >
        <Trash2 className="h-3 w-3 shrink-0" />
        Delete
      </button>
    </div>
  )
}
