import { useNavigate } from 'react-router-dom'
import { Sparkles, Zap } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { ROLES } from '../../types/roles'
import type { RoleId } from '../../types/roles'

export default function RoleQuickAccess() {
  const { user, loginAsRole, getRolePath } = useAuth()
  const navigate = useNavigate()

  const handleQuickAccess = (roleId: RoleId) => {
    const result = loginAsRole(roleId)
    if (result.success) {
      navigate(getRolePath(roleId))
    }
  }

  return (
    <section className="glass-card glow-card rounded-2xl p-5 md:p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-hay-300/20 rounded-full blur-2xl" />
      <div className="relative flex items-center gap-2 mb-1">
        <div className="p-2 rounded-lg bg-gradient-to-br from-hay-400 to-hay-600 text-white shadow">
          <Zap className="h-4 w-4" />
        </div>
        <h3 className="font-display font-bold text-earth-900 flex items-center gap-2">
          Quick Access — All Roles
          <Sparkles className="h-4 w-4 text-hay-500" />
        </h3>
      </div>
      <p className="text-sm text-earth-700/80 mb-4 relative">
        Jump to any role dashboard instantly.
        {user && (
          <span className="block mt-2 text-farm-700 font-bold">
            ✓ {user.fullName}
          </span>
        )}
      </p>
      <div className="flex flex-wrap gap-2 relative">
        {ROLES.map((role) => {
          const isCurrent = user?.roleId === role.id
          return (
            <button
              key={role.id}
              type="button"
              onClick={() => handleQuickAccess(role.id)}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                isCurrent
                  ? `bg-gradient-to-r ${role.gradient} text-white shadow-lg ring-2 ring-offset-2 ${role.ring} scale-105`
                  : 'bg-white text-earth-800 border border-farm-200 hover:border-farm-400 hover:bg-farm-50 hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              <span className="mr-1.5">{role.emoji}</span>
              {role.name}
            </button>
          )
        })}
      </div>
    </section>
  )
}
