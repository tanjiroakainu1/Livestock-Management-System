import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import FeaturePage from '../../components/layout/FeaturePage'
import DataTable from '../../components/data/DataTable'
import { userColumns } from '../../data/tableColumns'
import { getFeaturesForRole } from '../../data/featureRegistry'
import { ROLES } from '../../types/roles'

export default function ManageUsersAndRoles() {
  const { users } = useAuth()
  const rows = users.map((u) => ({
    ...u,
    roleName: ROLES.find((r) => r.id === u.roleId)?.name ?? u.roleId,
    farmName: u.farmName ?? '—',
    phone: u.phone ?? '—',
  }))

  const roleRows = ROLES.map((r) => ({
    name: r.name,
    id: r.id,
    description: r.description,
    features: getFeaturesForRole(r.id).length,
  }))

  return (
    <FeaturePage
      roleId="super-admin"
      featurePath="users-roles"
      title="Manage Users & Roles"
      description="Full system access — view all users and assign roles via registration."
      badge="Super Admin"
      stats={[
        { label: 'Total Users', value: users.length },
        { label: 'System Roles', value: ROLES.length },
      ]}
      columns={userColumns}
      data={rows as Record<string, unknown>[]}
      recordTableTitle="Registered Users"
      actions={
        <div className="glass-card rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-earth-700">
            Register new users with any of the 5 system roles. Role-based access is enforced on login.
          </p>
          <Link to="/register" className="btn-primary">
            Register New User
          </Link>
        </div>
      }
    >
      <DataTable
        columns={[
          { key: 'name', header: 'Role' },
          { key: 'id', header: 'Role ID' },
          { key: 'description', header: 'Purpose' },
          { key: 'features', header: 'Features' },
        ]}
        data={roleRows as unknown as Record<string, unknown>[]}
        title="Five System Roles"
      />
    </FeaturePage>
  )
}
