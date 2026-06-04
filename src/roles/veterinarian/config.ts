import { getNavForRole, getRoleFunctionalities } from '../../data/featureRegistry'
import type { NavItem } from '../../types/roles'

export const VETERINARIAN_BASE = '/veterinarian'

export const veterinarianNav: NavItem[] = getNavForRole('veterinarian')

export const VETERINARIAN_FEATURES = getRoleFunctionalities('veterinarian')
