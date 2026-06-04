import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  BarChart3,
  Bell,
  Calendar,
  CheckCircle,
  ClipboardList,
  Database,
  DollarSign,
  FileBarChart,
  FolderTree,
  Heart,
  Home,
  LineChart,
  MapPin,
  Package,
  Pill,
  Settings,
  Shield,
  Stethoscope,
  Syringe,
  TrendingUp,
  Users,
  Utensils,
  Weight,
} from 'lucide-react'
import type { RoleId } from '../types/roles'

const ICON_BY_PATH: Record<string, LucideIcon> = {
  'users-roles': Users,
  'farm-settings': Settings,
  'livestock-categories': FolderTree,
  'all-farm-records': Shield,
  'system-reports': FileBarChart,
  'backup-restore': Database,
  'livestock-records': ClipboardList,
  'assign-locations': MapPin,
  'animal-performance': TrendingUp,
  'breeding-schedules': Heart,
  'farm-operations': BarChart3,
  'approve-transactions': CheckCircle,
  'farm-reports': LineChart,
  'animal-health': Stethoscope,
  'health-checkups': Calendar,
  'vaccination-records': Syringe,
  'diagnose-illness': Activity,
  'prescribe-treatments': Pill,
  'animal-recovery': Heart,
  'health-reports': FileBarChart,
  'daily-feeding': Utensils,
  'animal-conditions': Activity,
  'weight-records': Weight,
  'report-sick': Bell,
  'breeding-activities': Heart,
  'housing-assignments': Home,
  'daily-tasks': ClipboardList,
  'livestock-inventory': Package,
  'farm-performance': TrendingUp,
  'financial-summaries': DollarSign,
  'breeding-statistics': Heart,
  'health-records': Stethoscope,
  'reports-analytics': BarChart3,
  notifications: Bell,
}

const ACCENTS: Record<RoleId, string[]> = {
  'super-admin': [
    'from-violet-500 to-purple-700',
    'from-farm-500 to-farm-800',
    'from-teal-500 to-emerald-700',
    'from-sky-500 to-blue-700',
    'from-amber-400 to-orange-600',
    'from-indigo-500 to-violet-700',
  ],
  'farm-manager': [
    'from-sky-500 to-blue-700',
    'from-farm-500 to-emerald-700',
    'from-violet-500 to-purple-600',
    'from-pink-500 to-rose-600',
    'from-amber-500 to-orange-600',
    'from-teal-500 to-cyan-700',
    'from-indigo-500 to-blue-800',
  ],
  veterinarian: [
    'from-teal-500 to-emerald-700',
    'from-cyan-500 to-blue-600',
    'from-violet-500 to-purple-600',
    'from-rose-500 to-pink-600',
    'from-amber-500 to-orange-600',
    'from-farm-500 to-green-700',
    'from-indigo-500 to-violet-700',
  ],
  'livestock-caretaker': [
    'from-amber-500 to-orange-600',
    'from-farm-500 to-emerald-600',
    'from-sky-500 to-blue-600',
    'from-rose-500 to-red-600',
    'from-pink-500 to-rose-500',
    'from-teal-500 to-cyan-600',
    'from-violet-500 to-purple-600',
  ],
  'farm-owner': [
    'from-farm-600 to-farm-900',
    'from-sky-500 to-indigo-700',
    'from-emerald-500 to-teal-700',
    'from-pink-500 to-rose-600',
    'from-teal-500 to-cyan-700',
    'from-violet-500 to-purple-700',
    'from-amber-500 to-orange-600',
  ],
}

export function getDashboardIcon(path: string): LucideIcon {
  return ICON_BY_PATH[path] ?? ClipboardList
}

export function getDashboardAccent(roleId: RoleId, index: number): string {
  const palette = ACCENTS[roleId]
  return palette[index % palette.length]
}
