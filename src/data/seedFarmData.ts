import type { FarmData } from '../types/farm'

export const SEED_FARM_DATA: FarmData = {
  farmSettings: {
    farmName: 'Green Valley Farm',
    location: '142 Ranch Road, Springfield',
    totalAcres: 320,
    operatingHours: 'Mon–Sat 6:00 AM – 6:00 PM',
    contactEmail: 'contact@greenvalleyfarm.com',
    contactPhone: '+1 555-0100',
  },
  categories: [
    { id: 'cat-1', name: 'Cattle', description: 'Beef and dairy cattle', animalCount: 48 },
    { id: 'cat-2', name: 'Sheep', description: 'Wool and meat sheep', animalCount: 32 },
    { id: 'cat-3', name: 'Goats', description: 'Dairy and meat goats', animalCount: 24 },
    { id: 'cat-4', name: 'Poultry', description: 'Chickens and turkeys', animalCount: 120 },
  ],
  livestock: [
    { id: 'lv-1', tagNumber: 'GV-C-001', name: 'Bella', breed: 'Angus', category: 'Cattle', ageMonths: 36, weightKg: 520, location: 'North Pasture A', status: 'Healthy', registeredAt: '2023-03-15' },
    { id: 'lv-2', tagNumber: 'GV-C-002', name: 'Duke', breed: 'Hereford', category: 'Cattle', ageMonths: 48, weightKg: 610, location: 'North Pasture A', status: 'Healthy', registeredAt: '2022-08-10' },
    { id: 'lv-3', tagNumber: 'GV-C-003', name: 'Rosie', breed: 'Holstein', category: 'Cattle', ageMonths: 24, weightKg: 480, location: 'Barn 2', status: 'Pregnant', registeredAt: '2024-01-20' },
    { id: 'lv-4', tagNumber: 'GV-S-001', name: 'Woolsey', breed: 'Merino', category: 'Sheep', ageMonths: 18, weightKg: 65, location: 'East Field', status: 'Healthy', registeredAt: '2024-06-01' },
    { id: 'lv-5', tagNumber: 'GV-S-002', name: 'Clover', breed: 'Suffolk', category: 'Sheep', ageMonths: 30, weightKg: 72, location: 'East Field', status: 'Sick', registeredAt: '2023-11-05' },
    { id: 'lv-6', tagNumber: 'GV-G-001', name: 'Nibbles', breed: 'Boer', category: 'Goats', ageMonths: 14, weightKg: 45, location: 'Goat Pen 1', status: 'Recovering', registeredAt: '2024-09-12' },
    { id: 'lv-7', tagNumber: 'GV-P-001', name: 'Henrietta', breed: 'Rhode Island Red', category: 'Poultry', ageMonths: 8, weightKg: 2.1, location: 'Coop A', status: 'Healthy', registeredAt: '2025-02-01' },
    { id: 'lv-8', tagNumber: 'GV-C-004', name: 'Thunder', breed: 'Angus', category: 'Cattle', ageMonths: 60, weightKg: 680, location: 'South Pasture', status: 'Healthy', registeredAt: '2021-05-22' },
  ],
  healthRecords: [
    { id: 'hr-1', animalTag: 'GV-C-001', animalName: 'Bella', date: '2025-05-28', condition: 'Healthy', notes: 'Routine check — vitals normal', recordedBy: 'Dr. Sam Chen' },
    { id: 'hr-2', animalTag: 'GV-S-002', animalName: 'Clover', date: '2025-05-30', condition: 'Respiratory infection', notes: 'Coughing observed, isolated', recordedBy: 'Dr. Sam Chen' },
    { id: 'hr-3', animalTag: 'GV-G-001', animalName: 'Nibbles', date: '2025-06-01', condition: 'Recovering', notes: 'Hoof treatment progressing well', recordedBy: 'Dr. Sam Chen' },
  ],
  vaccinations: [
    { id: 'vac-1', animalTag: 'GV-C-001', animalName: 'Bella', vaccine: 'BVD-IBR', date: '2025-03-10', nextDue: '2026-03-10', administeredBy: 'Dr. Sam Chen' },
    { id: 'vac-2', animalTag: 'GV-C-002', animalName: 'Duke', vaccine: 'Clostridial 7-way', date: '2025-04-15', nextDue: '2026-04-15', administeredBy: 'Dr. Sam Chen' },
    { id: 'vac-3', animalTag: 'GV-S-001', animalName: 'Woolsey', vaccine: 'CD-T', date: '2025-05-01', nextDue: '2026-05-01', administeredBy: 'Dr. Sam Chen' },
    { id: 'vac-4', animalTag: 'GV-C-003', animalName: 'Rosie', vaccine: 'BVD-IBR', date: '2025-02-20', nextDue: '2026-02-20', administeredBy: 'Dr. Sam Chen' },
  ],
  checkups: [
    { id: 'chk-1', animalTag: 'GV-C-003', animalName: 'Rosie', scheduledDate: '2025-06-10', type: 'Pregnancy ultrasound', status: 'Scheduled', veterinarian: 'Dr. Sam Chen' },
    { id: 'chk-2', animalTag: 'GV-S-002', animalName: 'Clover', scheduledDate: '2025-06-05', type: 'Follow-up respiratory', status: 'Scheduled', veterinarian: 'Dr. Sam Chen' },
    { id: 'chk-3', animalTag: 'GV-C-001', animalName: 'Bella', scheduledDate: '2025-05-20', type: 'Annual wellness', status: 'Completed', veterinarian: 'Dr. Sam Chen' },
  ],
  treatments: [
    { id: 'tr-1', animalTag: 'GV-S-002', animalName: 'Clover', diagnosis: 'Respiratory infection', treatment: 'Oxytetracycline 10ml daily', startDate: '2025-05-30', endDate: '2025-06-09', status: 'Active' },
    { id: 'tr-2', animalTag: 'GV-G-001', animalName: 'Nibbles', diagnosis: 'Hoof rot', treatment: 'Topical copper sulfate + pen', startDate: '2025-05-25', endDate: '2025-06-08', status: 'Active' },
    { id: 'tr-3', animalTag: 'GV-C-004', animalName: 'Thunder', diagnosis: 'Minor laceration', treatment: 'Wound cleaning + bandage', startDate: '2025-05-15', endDate: '2025-05-22', status: 'Completed' },
  ],
  feedingLogs: [
    { id: 'fd-1', animalTag: 'GV-C-001', date: '2025-06-03', feedType: 'Alfalfa hay', quantityKg: 12, recordedBy: 'Taylor Brooks' },
    { id: 'fd-2', animalTag: 'GV-C-002', date: '2025-06-03', feedType: 'Grain mix', quantityKg: 8, recordedBy: 'Taylor Brooks' },
    { id: 'fd-3', animalTag: 'GV-S-001', date: '2025-06-03', feedType: 'Grass silage', quantityKg: 4, recordedBy: 'Taylor Brooks' },
    { id: 'fd-4', animalTag: 'GV-G-001', date: '2025-06-03', feedType: 'Goat pellets', quantityKg: 2, recordedBy: 'Taylor Brooks' },
  ],
  breedingRecords: [
    { id: 'br-1', femaleTag: 'GV-C-003', maleTag: 'GV-C-002', matingDate: '2025-02-14', expectedBirth: '2025-11-20', status: 'Pregnant', offspringCount: 0 },
    { id: 'br-2', femaleTag: 'GV-S-001', maleTag: 'GV-S-003', matingDate: '2025-04-01', expectedBirth: '2025-08-25', status: 'Mated', offspringCount: 0 },
    { id: 'br-3', femaleTag: 'GV-C-001', maleTag: 'GV-C-004', matingDate: '2024-09-10', expectedBirth: '2025-06-15', status: 'Born', offspringCount: 1 },
  ],
  tasks: [
    { id: 'tk-1', title: 'Morning cattle feeding — North Pasture', assignedTo: 'Taylor Brooks', dueDate: '2025-06-04', status: 'Pending', priority: 'High' },
    { id: 'tk-2', title: 'Weigh GV-C-003', assignedTo: 'Taylor Brooks', dueDate: '2025-06-04', status: 'Pending', priority: 'Medium' },
    { id: 'tk-3', title: 'Clean Goat Pen 1', assignedTo: 'Taylor Brooks', dueDate: '2025-06-03', status: 'Completed', priority: 'Medium' },
    { id: 'tk-4', title: 'Inspect fence — South Pasture', assignedTo: 'Jordan Mitchell', dueDate: '2025-06-05', status: 'In Progress', priority: 'High' },
  ],
  transactions: [
    { id: 'tx-1', type: 'Sale', animalTag: 'GV-C-010', amount: 1850, date: '2025-05-28', status: 'Pending', requestedBy: 'Jordan Mitchell' },
    { id: 'tx-2', type: 'Purchase', animalTag: 'GV-S-010', amount: 420, date: '2025-05-25', status: 'Approved', requestedBy: 'Jordan Mitchell' },
    { id: 'tx-3', type: 'Transfer', animalTag: 'GV-G-002', amount: 0, date: '2025-05-20', status: 'Approved', requestedBy: 'Jordan Mitchell' },
  ],
  financials: [
    { id: 'fin-1', date: '2025-05-30', category: 'Livestock Sales', type: 'Revenue', amount: 4200, description: 'Sold 2 steers at auction' },
    { id: 'fin-2', date: '2025-05-28', category: 'Feed', type: 'Expense', amount: 890, description: 'Monthly alfalfa delivery' },
    { id: 'fin-3', date: '2025-05-25', category: 'Veterinary', type: 'Expense', amount: 340, description: 'Vaccines and supplies' },
    { id: 'fin-4', date: '2025-05-15', category: 'Equipment', type: 'Expense', amount: 1200, description: 'Tractor maintenance' },
    { id: 'fin-5', date: '2025-05-10', category: 'Wool Sales', type: 'Revenue', amount: 680, description: 'Spring wool clip' },
  ],
  inventory: [
    { id: 'inv-1', name: 'Alfalfa hay bales', category: 'Feed', quantity: 120, unit: 'bales', minLevel: 40, lastRestocked: '2025-05-28' },
    { id: 'inv-2', name: 'Grain mix', category: 'Feed', quantity: 800, unit: 'kg', minLevel: 200, lastRestocked: '2025-05-20' },
    { id: 'inv-3', name: 'Oxytetracycline', category: 'Medicine', quantity: 12, unit: 'bottles', minLevel: 5, lastRestocked: '2025-05-15' },
    { id: 'inv-4', name: 'CD-T vaccine', category: 'Medicine', quantity: 25, unit: 'doses', minLevel: 10, lastRestocked: '2025-04-30' },
    { id: 'inv-5', name: 'Livestock scale', category: 'Equipment', quantity: 1, unit: 'unit', minLevel: 1, lastRestocked: '2024-01-10' },
    { id: 'inv-6', name: 'Goat pellets', category: 'Feed', quantity: 45, unit: 'kg', minLevel: 50, lastRestocked: '2025-05-10' },
  ],
  notifications: [
    { id: 'nt-1', title: 'Vaccination due', message: 'GV-C-002 Clostridial booster due in 11 months', type: 'Vaccination', date: '2025-06-01', read: false },
    { id: 'nt-2', title: 'Health alert', message: 'GV-S-002 Clover — respiratory treatment active', type: 'Health', date: '2025-05-30', read: false },
    { id: 'nt-3', title: 'Low feed stock', message: 'Goat pellets below minimum level (45/50 kg)', type: 'Inventory', date: '2025-06-02', read: false },
    { id: 'nt-4', title: 'Breeding reminder', message: 'Rosie (GV-C-003) pregnancy check scheduled Jun 10', type: 'Breeding', date: '2025-06-01', read: true },
  ],
  auditLogs: [
    { id: 'al-1', action: 'User login', user: 'Alex Rivera', timestamp: '2025-06-03T08:00:00Z', details: 'Super Admin session started' },
    { id: 'al-2', action: 'Record updated', user: 'Taylor Brooks', timestamp: '2025-06-03T07:30:00Z', details: 'Feeding log added for GV-C-001' },
    { id: 'al-3', action: 'Transaction approved', user: 'Jordan Mitchell', timestamp: '2025-05-25T14:00:00Z', details: 'Purchase GV-S-010 approved' },
  ],
  roleActivities: [
    { id: 'ra-seed-1', roleId: 'farm-manager', featureKey: 'fm-livestock', featurePath: 'livestock-records', functionality: 'Manage livestock records', purpose: 'Animal registration and tag identification', systemArea: 'Livestock Management', action: 'Create', summary: 'Initial livestock registry loaded', performedBy: 'Jordan Mitchell', timestamp: '2024-01-15T08:00:00Z' },
    { id: 'ra-seed-2', roleId: 'veterinarian', featureKey: 'vet-health', featurePath: 'animal-health', functionality: 'Record animal health information', purpose: 'Medical history records', systemArea: 'Health Management', action: 'Create', summary: 'Health records initialized', performedBy: 'Dr. Sam Chen', timestamp: '2024-02-10T08:00:00Z' },
    { id: 'ra-seed-3', roleId: 'livestock-caretaker', featureKey: 'ct-feeding', featurePath: 'daily-feeding', functionality: 'Record daily feeding activities', purpose: 'Feed consumption records', systemArea: 'Feeding Management', action: 'Create', summary: 'Feeding logs initialized', performedBy: 'Taylor Brooks', timestamp: '2024-03-01T08:00:00Z' },
  ],
}
