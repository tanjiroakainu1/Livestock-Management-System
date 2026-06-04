import { useMemo, useState, type FormEvent } from 'react'
import { useFarmData } from '../../hooks/useFarmData'
import { useFarmActions } from '../../hooks/useFarmActions'
import FeaturePage from '../../components/layout/FeaturePage'
import CategoryCrudSection from '../../components/crud/CategoryCrudSection'
import LivestockCrudSection from '../../components/crud/LivestockCrudSection'
import ActionPanel, { Field, Input, Select } from '../../components/actions/ActionPanel'
import CrudRowActions from '../../components/actions/CrudRowActions'
import DataTable, { type Column } from '../../components/data/DataTable'
import {
  breedingColumns,
  feedingColumns,
  financialColumns,
  healthColumns,
  inventoryColumns,
  taskColumns,
  transactionColumns,
  vaccinationColumns,
} from '../../data/tableColumns'
import type { FinancialRecord, InventoryItem } from '../../types/farm'

export default function ViewAllFarmRecords() {
  const { data } = useFarmData()
  const {
    updateFinancial,
    deleteFinancial,
    updateInventory,
    deleteInventory,
    deleteRecordById,
  } = useFarmActions('super-admin', 'all-farm-records')

  const [finMsg, setFinMsg] = useState<string | null>(null)
  const [editingFin, setEditingFin] = useState<FinancialRecord | null>(null)
  const [editingInv, setEditingInv] = useState<InventoryItem | null>(null)

  const handleFinancial = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const patch = {
      date: String(fd.get('date')),
      category: String(fd.get('category')),
      type: fd.get('type') as 'Revenue' | 'Expense',
      amount: Number(fd.get('amount')),
      description: String(fd.get('description')),
    }
    if (editingFin) {
      updateFinancial(editingFin.id, patch)
      setFinMsg('Financial record updated.')
      setEditingFin(null)
    }
    e.currentTarget.reset()
  }

  const handleInventory = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const patch = {
      name: String(fd.get('name')),
      category: fd.get('category') as InventoryItem['category'],
      quantity: Number(fd.get('quantity')),
      unit: String(fd.get('unit')),
      minLevel: Number(fd.get('minLevel')),
      lastRestocked: String(fd.get('lastRestocked')),
    }
    if (editingInv) {
      updateInventory(editingInv.id, patch)
      setFinMsg('Inventory item updated.')
      setEditingInv(null)
    }
    e.currentTarget.reset()
  }

  const financialCols = useMemo(
    () => [
      ...financialColumns,
      {
        key: 'actions',
        header: 'Actions',
        render: (row: Record<string, unknown>) => (
          <CrudRowActions
            onEdit={() => {
              const rec = data.financials.find((f) => f.id === row.id)
              if (rec) setEditingFin(rec)
            }}
            onDelete={() => {
              if (window.confirm('Delete this financial record?')) {
                deleteFinancial(String(row.id))
              }
            }}
          />
        ),
      },
    ],
    [data.financials, deleteFinancial],
  )

  const inventoryCols = useMemo(
    () => [
      ...inventoryColumns,
      {
        key: 'actions',
        header: 'Actions',
        render: (row: Record<string, unknown>) => (
          <CrudRowActions
            onEdit={() => {
              const item = data.inventory.find((i) => i.id === row.id)
              if (item) setEditingInv(item)
            }}
            onDelete={() => {
              if (window.confirm('Delete this inventory item?')) {
                deleteInventory(String(row.id))
              }
            }}
          />
        ),
      },
    ],
    [data.inventory, deleteInventory],
  )

  const deleteCol = (collection: Parameters<typeof deleteRecordById>[0], label: string) =>
    ({
      key: 'actions',
      header: 'Actions',
      render: (row: Record<string, unknown>) => (
        <button
          type="button"
          onClick={() => {
            if (window.confirm(`Delete this ${label}?`)) {
              deleteRecordById(collection, String(row.id), label)
            }
          }}
          className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-red-600 text-white"
        >
          Delete
        </button>
      ),
    }) as Column<Record<string, unknown>>

  return (
    <FeaturePage
      roleId="super-admin"
      featurePath="all-farm-records"
      title="View All Farm Records"
      description="Full system access — manage categories, livestock, and all operational data."
      badge="Super Admin"
      stats={[
        { label: 'Categories', value: data.categories.length },
        { label: 'Animals', value: data.livestock.length },
        { label: 'Health', value: data.healthRecords.length },
        { label: 'Inventory', value: data.inventory.length },
      ]}
      hideRecordTable
    >
      <CategoryCrudSection
        roleId="super-admin"
        featurePath="all-farm-records"
        title="Livestock Categories (Add / Edit / Delete)"
      />

      <LivestockCrudSection
        roleId="super-admin"
        featurePath="all-farm-records"
        title="Livestock Registry (Add / Edit / Delete)"
      />

      {(editingFin || editingInv) && (
        <div className="grid lg:grid-cols-2 gap-4">
          {editingFin && (
            <ActionPanel
              title="Edit Financial Record"
              onSubmit={handleFinancial}
              submitLabel="Save Financial Record"
              successMessage={finMsg}
            >
              <Field label="Date">
                <Input name="date" type="date" required defaultValue={editingFin.date} />
              </Field>
              <Field label="Category">
                <Input name="category" required defaultValue={editingFin.category} />
              </Field>
              <Field label="Type">
                <Select name="type" required defaultValue={editingFin.type}>
                  <option value="Revenue">Revenue</option>
                  <option value="Expense">Expense</option>
                </Select>
              </Field>
              <Field label="Amount">
                <Input name="amount" type="number" required defaultValue={editingFin.amount} />
              </Field>
              <Field label="Description" className="md:col-span-2">
                <Input name="description" required defaultValue={editingFin.description} />
              </Field>
            </ActionPanel>
          )}
          {editingInv && (
            <ActionPanel
              title="Edit Inventory Item"
              onSubmit={handleInventory}
              submitLabel="Save Inventory"
              successMessage={finMsg}
            >
              <Field label="Name">
                <Input name="name" required defaultValue={editingInv.name} />
              </Field>
              <Field label="Category">
                <Select name="category" required defaultValue={editingInv.category}>
                  <option value="Feed">Feed</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Equipment">Equipment</option>
                </Select>
              </Field>
              <Field label="Quantity">
                <Input name="quantity" type="number" required defaultValue={editingInv.quantity} />
              </Field>
              <Field label="Unit">
                <Input name="unit" required defaultValue={editingInv.unit} />
              </Field>
              <Field label="Min Level">
                <Input name="minLevel" type="number" required defaultValue={editingInv.minLevel} />
              </Field>
              <Field label="Last Restocked">
                <Input
                  name="lastRestocked"
                  type="date"
                  required
                  defaultValue={editingInv.lastRestocked}
                />
              </Field>
            </ActionPanel>
          )}
        </div>
      )}

      <DataTable
        columns={[...healthColumns, deleteCol('healthRecords', 'health record')]}
        data={data.healthRecords as unknown as Record<string, unknown>[]}
        title="Health Records"
      />
      <DataTable
        columns={[...vaccinationColumns, deleteCol('vaccinations', 'vaccination')]}
        data={data.vaccinations as unknown as Record<string, unknown>[]}
        title="Vaccination Records"
      />
      <DataTable
        columns={[...feedingColumns, deleteCol('feedingLogs', 'feeding log')]}
        data={data.feedingLogs as unknown as Record<string, unknown>[]}
        title="Feeding Logs"
      />
      <DataTable
        columns={[...breedingColumns, deleteCol('breedingRecords', 'breeding record')]}
        data={data.breedingRecords as unknown as Record<string, unknown>[]}
        title="Breeding Records"
      />
      <DataTable
        columns={[...taskColumns, deleteCol('tasks', 'task')]}
        data={data.tasks as unknown as Record<string, unknown>[]}
        title="Farm Tasks"
      />
      <DataTable
        columns={[...transactionColumns, deleteCol('transactions', 'transaction')]}
        data={data.transactions as unknown as Record<string, unknown>[]}
        title="Transactions"
      />
      <DataTable
        columns={financialCols}
        data={data.financials as unknown as Record<string, unknown>[]}
        title="Financial Records (Edit / Delete)"
      />
      <DataTable
        columns={inventoryCols}
        data={data.inventory as unknown as Record<string, unknown>[]}
        title="Inventory (Edit / Delete)"
      />
    </FeaturePage>
  )
}
