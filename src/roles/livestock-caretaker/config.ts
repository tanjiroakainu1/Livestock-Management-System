import { getNavForRole, getRoleFunctionalities } from '../../data/featureRegistry'
import type { NavItem } from '../../types/roles'

export const CARETAKER_BASE = '/livestock-caretaker'

export const caretakerNav: NavItem[] = getNavForRole('livestock-caretaker')

export const CARETAKER_FEATURES = getRoleFunctionalities('livestock-caretaker')
