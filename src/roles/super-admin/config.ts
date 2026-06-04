import { getNavForRole, getRoleFunctionalities } from '../../data/featureRegistry'
import type { NavItem } from '../../types/roles'

export const SUPER_ADMIN_BASE = '/super-admin'

export const superAdminNav: NavItem[] = getNavForRole('super-admin')

export const SUPER_ADMIN_FEATURES = getRoleFunctionalities('super-admin')
