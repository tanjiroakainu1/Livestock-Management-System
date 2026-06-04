import { getNavForRole, getRoleFunctionalities } from '../../data/featureRegistry'
import type { NavItem } from '../../types/roles'

export const FARM_OWNER_BASE = '/farm-owner'

export const farmOwnerNav: NavItem[] = getNavForRole('farm-owner')

export const FARM_OWNER_FEATURES = getRoleFunctionalities('farm-owner')
