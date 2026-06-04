import type { Column } from '../components/data/DataTable'
import StatusBadge from '../components/ui/StatusBadge'

export const livestockColumns: Column<Record<string, unknown>>[] = [
  { key: 'tagNumber', header: 'Tag' },
  { key: 'name', header: 'Name' },
  { key: 'breed', header: 'Breed' },
  { key: 'category', header: 'Category' },
  { key: 'weightKg', header: 'Weight (kg)' },
  { key: 'location', header: 'Location' },
  { key: 'status', header: 'Status' },
]

export const categoryColumns: Column<Record<string, unknown>>[] = [
  { key: 'name', header: 'Category' },
  { key: 'description', header: 'Description' },
  { key: 'animalCount', header: 'Animals' },
]

export const healthColumns: Column<Record<string, unknown>>[] = [
  { key: 'animalTag', header: 'Tag' },
  { key: 'animalName', header: 'Animal' },
  { key: 'date', header: 'Date' },
  { key: 'condition', header: 'Condition' },
  { key: 'recordedBy', header: 'Recorded By' },
  { key: 'notes', header: 'Notes' },
]

export const vaccinationColumns: Column<Record<string, unknown>>[] = [
  { key: 'animalTag', header: 'Tag' },
  { key: 'animalName', header: 'Animal' },
  { key: 'vaccine', header: 'Vaccine' },
  { key: 'date', header: 'Date' },
  { key: 'nextDue', header: 'Next Due' },
  { key: 'administeredBy', header: 'By' },
]

export const checkupColumns: Column<Record<string, unknown>>[] = [
  { key: 'animalTag', header: 'Tag' },
  { key: 'animalName', header: 'Animal' },
  { key: 'scheduledDate', header: 'Scheduled' },
  { key: 'type', header: 'Type' },
  { key: 'status', header: 'Status' },
  { key: 'veterinarian', header: 'Veterinarian' },
]

export const treatmentColumns: Column<Record<string, unknown>>[] = [
  { key: 'animalTag', header: 'Tag' },
  { key: 'animalName', header: 'Animal' },
  { key: 'diagnosis', header: 'Diagnosis' },
  { key: 'treatment', header: 'Treatment' },
  { key: 'status', header: 'Status' },
  { key: 'startDate', header: 'Start' },
]

export const feedingColumns: Column<Record<string, unknown>>[] = [
  { key: 'animalTag', header: 'Tag' },
  { key: 'date', header: 'Date' },
  { key: 'feedType', header: 'Feed Type' },
  { key: 'quantityKg', header: 'Qty (kg)' },
  { key: 'recordedBy', header: 'Recorded By' },
]

export const breedingColumns: Column<Record<string, unknown>>[] = [
  { key: 'femaleTag', header: 'Female' },
  { key: 'maleTag', header: 'Male' },
  { key: 'matingDate', header: 'Mating Date' },
  { key: 'expectedBirth', header: 'Expected Birth' },
  { key: 'status', header: 'Status' },
  { key: 'offspringCount', header: 'Offspring' },
]

export const taskColumns: Column<Record<string, unknown>>[] = [
  { key: 'title', header: 'Task' },
  { key: 'assignedTo', header: 'Assigned To' },
  { key: 'dueDate', header: 'Due' },
  { key: 'priority', header: 'Priority' },
  { key: 'status', header: 'Status' },
]

export const transactionColumns: Column<Record<string, unknown>>[] = [
  { key: 'id', header: 'ID' },
  { key: 'type', header: 'Type' },
  { key: 'animalTag', header: 'Animal' },
  { key: 'amount', header: 'Amount ($)' },
  { key: 'date', header: 'Date' },
  { key: 'status', header: 'Status' },
]

export const financialColumns: Column<Record<string, unknown>>[] = [
  { key: 'date', header: 'Date' },
  { key: 'category', header: 'Category' },
  { key: 'type', header: 'Type' },
  { key: 'amount', header: 'Amount ($)' },
  { key: 'description', header: 'Description' },
]

export const inventoryColumns: Column<Record<string, unknown>>[] = [
  { key: 'name', header: 'Item' },
  { key: 'category', header: 'Category' },
  { key: 'quantity', header: 'Qty' },
  { key: 'unit', header: 'Unit' },
  { key: 'minLevel', header: 'Min Level' },
  {
    key: 'status',
    header: 'Stock',
    render: (row) => {
      const qty = Number(row.quantity)
      const min = Number(row.minLevel)
      return <StatusBadge value={qty < min ? 'Low' : 'OK'} />
    },
  },
]

export const notificationColumns: Column<Record<string, unknown>>[] = [
  { key: 'date', header: 'Date' },
  { key: 'type', header: 'Type' },
  { key: 'title', header: 'Title' },
  { key: 'message', header: 'Message' },
  {
    key: 'read',
    header: 'Read',
    render: (row) => (
      <StatusBadge value={row.read ? 'Completed' : 'Pending'} />
    ),
  },
]

export const auditColumns: Column<Record<string, unknown>>[] = [
  { key: 'timestamp', header: 'Time' },
  { key: 'user', header: 'User' },
  { key: 'action', header: 'Action' },
  { key: 'details', header: 'Details' },
]

export const userColumns: Column<Record<string, unknown>>[] = [
  { key: 'fullName', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'roleName', header: 'Role' },
  { key: 'farmName', header: 'Farm' },
  { key: 'phone', header: 'Phone' },
]

export const roleActivityColumns: Column<Record<string, unknown>>[] = [
  { key: 'timestamp', header: 'When' },
  { key: 'action', header: 'Action', badge: true },
  { key: 'functionality', header: 'Functionality' },
  { key: 'purpose', header: 'Purpose' },
  { key: 'summary', header: 'Summary' },
  { key: 'performedBy', header: 'By' },
  { key: 'systemArea', header: 'System Area' },
]
