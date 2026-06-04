export interface FarmSettings {
  farmName: string
  location: string
  totalAcres: number
  operatingHours: string
  contactEmail: string
  contactPhone: string
}

export interface LivestockCategory {
  id: string
  name: string
  description: string
  animalCount: number
}

export interface Livestock {
  id: string
  tagNumber: string
  name: string
  breed: string
  category: string
  ageMonths: number
  weightKg: number
  location: string
  status: 'Healthy' | 'Sick' | 'Recovering' | 'Pregnant'
  registeredAt: string
}

export interface HealthRecord {
  id: string
  animalTag: string
  animalName: string
  date: string
  condition: string
  notes: string
  recordedBy: string
}

export interface Vaccination {
  id: string
  animalTag: string
  animalName: string
  vaccine: string
  date: string
  nextDue: string
  administeredBy: string
}

export interface HealthCheckup {
  id: string
  animalTag: string
  animalName: string
  scheduledDate: string
  type: string
  status: 'Scheduled' | 'Completed' | 'Overdue'
  veterinarian: string
}

export interface Treatment {
  id: string
  animalTag: string
  animalName: string
  diagnosis: string
  treatment: string
  startDate: string
  endDate: string
  status: 'Active' | 'Completed'
}

export interface FeedingLog {
  id: string
  animalTag: string
  date: string
  feedType: string
  quantityKg: number
  recordedBy: string
}

export interface BreedingRecord {
  id: string
  femaleTag: string
  maleTag: string
  matingDate: string
  expectedBirth: string
  status: 'Mated' | 'Pregnant' | 'Born'
  offspringCount: number
}

export interface FarmTask {
  id: string
  title: string
  assignedTo: string
  dueDate: string
  status: 'Pending' | 'In Progress' | 'Completed'
  priority: 'Low' | 'Medium' | 'High'
}

export interface Transaction {
  id: string
  type: 'Sale' | 'Purchase' | 'Transfer'
  animalTag: string
  amount: number
  date: string
  status: 'Pending' | 'Approved' | 'Rejected'
  requestedBy: string
}

export interface FinancialRecord {
  id: string
  date: string
  category: string
  type: 'Revenue' | 'Expense'
  amount: number
  description: string
}

export interface InventoryItem {
  id: string
  name: string
  category: 'Feed' | 'Medicine' | 'Equipment'
  quantity: number
  unit: string
  minLevel: number
  lastRestocked: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'Health' | 'Vaccination' | 'Feeding' | 'Breeding' | 'Inventory'
  date: string
  read: boolean
}

export interface AuditLog {
  id: string
  action: string
  user: string
  timestamp: string
  details: string
}

/** Per-role log of CRUD actions tied to feature purpose (stored in localStorage) */
export interface RoleActivityRecord {
  id: string
  roleId: string
  featureKey: string
  featurePath: string
  functionality: string
  purpose: string
  systemArea: string
  action: 'Create' | 'Update' | 'Delete' | 'Approve' | 'View' | 'Export'
  summary: string
  performedBy: string
  timestamp: string
  referenceId?: string
}

export interface FarmData {
  farmSettings: FarmSettings
  categories: LivestockCategory[]
  livestock: Livestock[]
  healthRecords: HealthRecord[]
  vaccinations: Vaccination[]
  checkups: HealthCheckup[]
  treatments: Treatment[]
  feedingLogs: FeedingLog[]
  breedingRecords: BreedingRecord[]
  tasks: FarmTask[]
  transactions: Transaction[]
  financials: FinancialRecord[]
  inventory: InventoryItem[]
  notifications: Notification[]
  auditLogs: AuditLog[]
  roleActivities: RoleActivityRecord[]
}
