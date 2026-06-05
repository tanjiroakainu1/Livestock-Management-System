import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { LogIn, Eye, EyeOff, BarChart3, Heart, Leaf, Shield } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { ROLES } from '../types/roles'
import type { RoleId } from '../types/roles'
import PublicAuthLayout from '../components/layout/PublicAuthLayout'

const AUTH_FEATURES = [
  { icon: Leaf, text: 'Track feeding, housing, weight, and daily farm tasks in real time.' },
  { icon: Heart, text: 'Health records, vaccinations, treatments, and sick-animal reporting.' },
  { icon: BarChart3, text: 'Performance dashboards, financial summaries, and breeding analytics.' },
  { icon: Shield, text: 'Five secure roles — from caretaker to farm owner and super admin.' },
]

export default function LoginPage() {
  const { login, loginAsRole, getRolePath, user, users } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string })?.from

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      navigate(getRolePath(user.roleId), { replace: true })
    }
  }, [user, navigate, getRolePath])

  const redirectAfterLogin = (roleId: RoleId) => {
    const path = getRolePath(roleId)
    navigate(from && from !== '/login' ? from : path, { replace: true })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const result = login({ email, password })
    if (result.success && result.user) {
      redirectAfterLogin(result.user.roleId)
    } else {
      setError(result.error ?? 'Login failed.')
    }
  }

  const fillCredentials = (accountEmail: string, accountPassword: string) => {
    setEmail(accountEmail)
    setPassword(accountPassword)
    setError('')
  }

  const handleQuickLogin = (roleId: RoleId) => {
    setError('')
    const result = loginAsRole(roleId)
    if (result.success && result.user) {
      redirectAfterLogin(result.user.roleId)
    } else {
      setError(result.error ?? 'Quick login failed.')
    }
  }

  return (
    <PublicAuthLayout
      badge="Green Valley LMS"
      title="Welcome Back"
      headline="Sign in to Green Valley Livestock"
      subtitle="Monitor livestock, health, breeding, and farm operations — all in one unified platform."
      formTitle="Sign In"
      formHint="Enter your credentials to access your dashboard."
      features={AUTH_FEATURES}
      sidebar={
        <>
          <div className="auth-sidebar-card animate-fade-up">
            <h3 className="font-display font-bold text-emerald-950 mb-2">Quick Access</h3>
            <p className="text-sm text-emerald-800/70 mb-4">One tap — jump into any role dashboard.</p>
            <div className="flex flex-wrap gap-2">
              {ROLES.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => handleQuickLogin(role.id)}
                  className={`px-3 py-2.5 min-h-[2.75rem] rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r ${role.gradient} shadow-md hover:shadow-lg active:scale-[0.98] transition-all`}
                >
                  {role.emoji} {role.name}
                </button>
              ))}
            </div>
          </div>

          <div className="auth-sidebar-card animate-fade-up max-h-[360px] overflow-y-auto">
            <h3 className="font-display font-bold text-emerald-950 mb-2">Demo Accounts</h3>
            <p className="text-sm text-emerald-800/70 mb-4">Click a user to fill the login form.</p>
            <div className="space-y-2">
              {users.map((account) => {
                const role = ROLES.find((r) => r.id === account.roleId)
                return (
                  <button
                    key={account.id}
                    type="button"
                    onClick={() => fillCredentials(account.email, account.password)}
                    className="w-full text-left p-3 rounded-xl border border-emerald-100 bg-emerald-50/50 hover:border-emerald-400 hover:bg-emerald-50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`h-10 w-10 rounded-xl bg-gradient-to-br ${role?.gradient ?? 'from-emerald-600 to-emerald-800'} flex items-center justify-center text-lg shadow shrink-0`}
                      >
                        {role?.emoji}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-emerald-950 group-hover:text-emerald-800 truncate">
                          {account.fullName}
                        </p>
                        <p className="text-xs text-emerald-800/60 truncate">{account.email}</p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

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
            autoComplete="email"
            className="input-field border-emerald-200 focus:border-emerald-500"
            placeholder="you@livestock.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1.5">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="input-field border-emerald-200 focus:border-emerald-500 pr-11"
              placeholder="Enter password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600 hover:text-emerald-800"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <button type="submit" className="btn-primary w-full min-h-[2.75rem]">
          <LogIn className="h-5 w-5" />
          Sign In
        </button>

        <p className="text-center text-sm text-emerald-800/75">
          New here?{' '}
          <Link to="/register" className="text-emerald-700 font-bold hover:underline">
            Create account
          </Link>
        </p>
      </form>
    </PublicAuthLayout>
  )
}
