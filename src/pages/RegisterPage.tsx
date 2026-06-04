import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Home, UserPlus, Sprout } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useFarmActions } from '../hooks/useFarmActions'
import { REGISTERABLE_ROLES } from '../types/roles'
import type { RoleId } from '../types/roles'
import BrandLogo from '../components/ui/BrandLogo'
import PageDecor from '../components/ui/PageDecor'
import AppSiteFooter from '../components/layout/AppSiteFooter'

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
    <div className="min-h-screen min-h-[100dvh] page-meadow relative overflow-x-hidden">
      <PageDecor />

      <header className="bg-gradient-to-r from-hay-500 via-farm-600 to-farm-800 text-white py-8 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-20" />
        <Link
          to="/"
          className="btn-ghost-light absolute top-4 left-3 sm:left-4 z-10 safe-pad-x !px-3 sm:!px-4"
        >
          <Home className="h-4 w-4 shrink-0" />
          Home
        </Link>
        <div className="relative max-w-lg mx-auto px-4 pt-2 flex flex-col items-center gap-3">
          <BrandLogo size="md" light />
          <h1 className="font-display text-2xl font-bold">Join the Farm</h1>
          <p className="text-white/85 text-sm text-center flex items-center justify-center gap-1 px-2">
            <Sprout className="h-4 w-4 shrink-0" />
            Farm Manager, Veterinarian, Caretaker, or Owner
          </p>
        </div>
      </header>

      <main className="max-w-lg mx-auto safe-pad-x px-3 sm:px-4 py-6 sm:py-8 -mt-4 w-full">
        <form
          onSubmit={handleSubmit}
          className="glass-card glow-card rounded-2xl p-6 md:p-8 space-y-4 animate-fade-up"
        >
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          {selectedRole && (
            <div
              className={`p-4 rounded-xl bg-gradient-to-r ${selectedRole.gradient} text-white text-center`}
            >
              <span className="text-3xl">{selectedRole.emoji}</span>
              <p className="font-display font-bold mt-1">{selectedRole.name}</p>
            </div>
          )}

          <div>
            <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-farm-700 mb-1.5">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-farm-700 mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-xs font-bold uppercase tracking-wider text-farm-700 mb-1.5">
              Role
            </label>
            <select
              id="role"
              value={roleId}
              onChange={(e) => setRoleId(e.target.value as RoleId)}
              className="input-field"
            >
              {REGISTERABLE_ROLES.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.emoji} {role.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="farmName" className="block text-xs font-bold uppercase tracking-wider text-farm-700 mb-1.5">
              Farm Name (optional)
            </label>
            <input
              id="farmName"
              type="text"
              value={farmName}
              onChange={(e) => setFarmName(e.target.value)}
              className="input-field"
              placeholder="Green Valley Farm"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-farm-700 mb-1.5">
              Phone (optional)
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-farm-700 mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-xs font-bold uppercase tracking-wider text-farm-700 mb-1.5">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>

          <button type="submit" className="btn-primary w-full min-h-[2.75rem]">
            <UserPlus className="h-5 w-5" />
            Create Account
          </button>

          <p className="text-center text-sm text-earth-700/80">
            Have an account?{' '}
            <Link to="/login" className="text-farm-700 font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </main>

      <AppSiteFooter />
    </div>
  )
}
