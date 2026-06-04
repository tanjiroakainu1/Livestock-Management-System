import { useFarmData } from '../../hooks/useFarmData'
import { useFarmActions } from '../../hooks/useFarmActions'
import FeaturePage from '../../components/layout/FeaturePage'
import { transactionColumns } from '../../data/tableColumns'
export default function ApproveLivestockTransactions() {
  const { data } = useFarmData()
  const { updateTransaction } = useFarmActions('farm-manager', 'approve-transactions')

  const columns = [
    ...transactionColumns,
    {
      key: 'actions',
      header: 'Actions',
      render: (row: Record<string, unknown>) => {
        if (row.status !== 'Pending') return '—'
        return (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => updateTransaction(String(row.id), 'Approved')}
              className="px-2 py-1 text-xs font-semibold rounded-lg bg-farm-600 text-white hover:bg-farm-700"
            >
              Approve
            </button>
            <button
              type="button"
              onClick={() => updateTransaction(String(row.id), 'Rejected')}
              className="px-2 py-1 text-xs font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700"
            >
              Reject
            </button>
          </div>
        )
      },
    },
  ]

  return (
    <FeaturePage
      roleId="farm-manager"
      featurePath="approve-transactions"
      title="Approve Livestock Transactions"
      description="Review and approve livestock sales, purchases, and transfers."
      badge="Farm Manager"
      stats={[
        { label: 'Pending', value: data.transactions.filter((t) => t.status === 'Pending').length },
        { label: 'Approved', value: data.transactions.filter((t) => t.status === 'Approved').length },
      ]}
      columns={columns}
      data={data.transactions as unknown as Record<string, unknown>[]}
      actions={
        <p className="text-sm text-earth-700 glass-card rounded-xl px-4 py-3">
          Use <strong>Approve</strong> or <strong>Reject</strong> on pending rows below.
        </p>
      }
    />
  )
}
