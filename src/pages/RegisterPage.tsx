import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserPlus, Sprout, Tractor, Users, Stethoscope } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useFarmActions } from '../hooks/useFarmActions'
import { REGISTERABLE_ROLES } from '../types/roles'
import type { RoleId } from '../types/roles'
import PublicAuthLayout from '../components/layout/PublicAuthLayout'

const REGISTER_FEATURES = [
  { icon: Tractor, text: 'Register as Farm Manager, Veterinarian, Caretaker, or Owner.' },
  { icon: Stethoscope, text: 'Access role-specific tools for health, feeding, and operations.' },
  { icon: Users, text: 'Join Green Valley — Super Admin accounts are login-only.' },
]

export default function RegisterPage() {
  const { register, getRolePath, user } = useAuth()
  const { logAction } = useFarmActions('super-admin', 'users-roles')
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [roleId, setRoleId] = useState<RoleId>('farm-owner')
  const [farmName, setFarmName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')

  const selectedRole = REGISTERABLE_ROLES.find((r) => r.id === roleId)

  useEffect(() => {
    if (user) {
      navigate(getRolePath(user.roleId), { replace: true })
    }
  }, [user, navigate, getRolePath])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    const result = register({
      fullName,
      email,
      password,
      roleId,
      farmName: farmName || undefined,
      phone: phone || undefined,
    })

    if (result.success) {
      logAction({
        action: 'Create',
        summary: `Registered user ${fullName.trim()} (${email.trim()}) as ${selectedRole?.name ?? roleId}`,
        referenceId: email.trim().toLowerCase(),
      })
      navigate(getRolePath(roleId), { replace: true })
    } else {
      setError(result.error ?? 'Registration failed.')
    }
  }

  return (
    <PublicAuthLayout
      badge="Join the Farm"
      title="Create Your Account"
      headline="Join Green Valley Livestock"
      subtitle="Set up your profile and choose a farm role to start managing livestock, health, and operations."
      formTitle="Register"
      formHint="Super Admin is not available for self-registration."
      features={REGISTER_FEATURES}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        {selectedRole && (
          <div
            className={`p-4 rounded-xl bg-gradient-to-r ${selectedRole.gradient} text-white text-center shadow-lg`}
          >
            <span className="text-3xl">{selectedRole.emoji}</span>
            <p className="font-display font-bold mt-1">{selectedRole.name}</p>
            <p className="text-xs text-white/80 mt-1 flex items-center justify-center gap-1">
              <Sprout className="h-3.5 w-3.5" />
              {selectedRole.description.slice(0, 60)}…
            </p>
          </div>
        )}

        <div>
          <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1.5">
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="input-field border-emerald-200 focus:border-emerald-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1.5">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field border-emerald-200 focus:border-emerald-500"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1.5">
            Role
          </label>
          <select
            id="role"
            value={roleId}
            onChange={(e) => setRoleId(e.target.value as RoleId)}
            className="input-field border-emerald-200 focus:border-emerald-500 bg-white"
          >
            {REGISTERABLE_ROLES.map((role) => (
              <option key={role.id} value={role.id}>
                {role.emoji} {role.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="farmName" className="block text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1.5">
            Farm Name (optional)
          </label>
          <input
            id="farmName"
            type="text"
            value={farmName}
            onChange={(e) => setFarmName(e.target.value)}
            className="input-field border-emerald-200 focus:border-emerald-500"
            placeholder="Green Valley Farm"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1.5">
            Phone (optional)
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input-field border-emerald-200 focus:border-emerald-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1.5">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="input-field border-emerald-200 focus:border-emerald-500"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1.5">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="input-field border-emerald-200 focus:border-emerald-500"
          />
        </div>

        <button type="submit" className="btn-primary w-full min-h-[2.75rem]">
          <UserPlus className="h-5 w-5" />
          Create Account
        </button>

        <p className="text-center text-sm text-emerald-800/75 pt-1">
          Have an account?{' '}
          <Link to="/login" className="text-emerald-700 font-bold hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </PublicAuthLayout>
  )
}
