import type { RoleActivityRecord } from '../types/farm'
import type { FarmData } from '../types/farm'
import type { FeatureDefinition } from '../data/featureRegistry'
import { newId } from './farmActions'

export function appendRoleActivity(
  data: FarmData,
  feature: FeatureDefinition,
  entry: Omit<RoleActivityRecord, 'id' | 'roleId' | 'featureKey' | 'featurePath' | 'functionality' | 'purpose' | 'systemArea'>,
): FarmData {
  const record: RoleActivityRecord = {
    id: newId('ra'),
    roleId: feature.roleId,
    featureKey: feature.key,
    featurePath: feature.path,
    functionality: feature.functionality,
    purpose: feature.purpose,
    systemArea: feature.systemArea,
    ...entry,
  }
  return {
    ...data,
    roleActivities: [record, ...(data.roleActivities ?? [])],
  }
}
