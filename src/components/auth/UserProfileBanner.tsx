import { Mail, Phone, Shield, Sprout, User } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { getRoleById } from '../../types/roles'

export default function UserProfileBanner() {
  const { user } = useAuth()
  if (!user) return null

  const role = getRoleById(user.roleId)

  return (
    <div className="glass-card glow-card rounded-2xl p-4 sm:p-6 relative overflow-hidden w-full min-w-0">
      <div
        className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl ${role?.gradient ?? 'from-farm-600 to-farm-800'} opacity-[0.1] rounded-full -translate-y-1/2 translate-x-1/4`}
      />
      <div className="relative flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4 sm:gap-6">
        <div
          className={`h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-gradient-to-br ${role?.gradient ?? 'from-farm-600 to-farm-800'} flex items-center justify-center text-2xl sm:text-3xl shadow-xl ring-4 ring-white/80 shrink-0`}
        >
          {role?.emoji ?? '👤'}
        </div>
        <div className="flex-1 w-full min-w-0 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 text-sm">
          <ProfileField icon={User} label="Name" value={user.fullName} />
          <ProfileField icon={Mail} label="Email" value={user.email} truncate />
          <ProfileField icon={Shield} label="Role" value={role?.name ?? user.roleId} />
          {user.farmName && (
            <ProfileField icon={Sprout} label="Farm" value={user.farmName} />
          )}
          {user.phone && (
            <div className="md:col-span-2 xl:col-span-4">
              <ProfileField icon={Phone} label="Phone" value={user.phone} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ProfileField({
  icon: Icon,
  label,
  value,
  truncate,
}: {
  icon: typeof User
  label: string
  value: string
  truncate?: boolean
}) {
  return (
    <div className="flex items-start gap-2 rounded-xl bg-farm-50/60 px-3 py-2 border border-farm-100/80 min-w-0">
      <Icon className="h-4 w-4 text-farm-600 mt-0.5 shrink-0" />
      <div className="min-w-0 flex-1">
        <span className="text-[10px] font-bold uppercase tracking-widest text-farm-600">
          {label}
        </span>
        <p className={`font-semibold text-earth-900 ${truncate ? 'truncate' : 'break-words'}`}>
          {value}
        </p>
      </div>
    </div>
  )
}
