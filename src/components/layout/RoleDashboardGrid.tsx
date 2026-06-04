import DashboardCard from './DashboardCard'
import { getFeaturesForRole } from '../../data/featureRegistry'
import { getDashboardAccent, getDashboardIcon } from '../../data/dashboardIcons'
import type { RoleId } from '../../types/roles'

interface RoleDashboardGridProps {
  roleId: RoleId
  basePath: string
}

export default function RoleDashboardGrid({ roleId, basePath }: RoleDashboardGridProps) {
  const features = getFeaturesForRole(roleId)

  return (
    <div className="grid grid-cols-1 min-[480px]:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
      {features.map((f, i) => (
        <DashboardCard
          key={f.path}
          title={f.label}
          description={`${f.functionality}. ${f.purpose}.`}
          to={`${basePath}/${f.path}`}
          icon={getDashboardIcon(f.path)}
          accent={getDashboardAccent(roleId, i)}
        />
      ))}
    </div>
  )
}
