import { getNavForRole, getRoleFunctionalities } from '../../data/featureRegistry'
import type { NavItem } from '../../types/roles'

export const FARM_MANAGER_BASE = '/farm-manager'

export const farmManagerNav: NavItem[] = getNavForRole('farm-manager')

export const FARM_MANAGER_FEATURES = getRoleFunctionalities('farm-manager')
