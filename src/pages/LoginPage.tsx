import { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Home, LogIn, Eye, EyeOff, Sparkles } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { ROLES } from '../types/roles'
import type { RoleId } from '../types/roles'
import BrandLogo from '../components/ui/BrandLogo'
import PageDecor from '../components/ui/PageDecor'
import AppSiteFooter from '../components/layout/AppSiteFooter'

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
    <div className="min-h-screen min-h-[100dvh] page-meadow relative overflow-x-hidden">
      <PageDecor />

      <header className="bg-gradient-to-r from-farm-800 via-farm-700 to-farm-900 text-white py-8 relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-25" />
        <Link
          to="/"
          className="btn-ghost-light absolute top-4 left-3 sm:left-4 z-10 safe-pad-x !px-3 sm:!px-4"
        >
          <Home className="h-4 w-4 shrink-0" />
          Home
        </Link>
        <div className="relative max-w-4xl mx-auto px-4 pt-2 flex flex-col items-center gap-4">
          <BrandLogo size="md" light />
          <div className="text-center">
            <h1 className="font-display text-2xl md:text-3xl font-bold">Welcome Back</h1>
            <p className="text-farm-100/90 text-sm mt-1 flex items-center justify-center gap-1">
              <Sparkles className="h-4 w-4 text-hay-400" />
              Sign in to Green Valley Farm
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto safe-pad-x px-3 sm:px-4 py-6 sm:py-8 -mt-4 relative w-full min-w-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <form
            onSubmit={handleSubmit}
            className="glass-card glow-card rounded-2xl p-6 md:p-8 space-y-5 animate-fade-up"
          >
            <h2 className="font-display text-xl font-bold text-earth-900">Sign In</h2>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

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
                autoComplete="email"
                className="input-field"
                placeholder="you@livestock.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-farm-700 mb-1.5">
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
                  className="input-field pr-11"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-farm-500 hover:text-farm-700"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full">
              <LogIn className="h-5 w-5" />
              Sign In
            </button>

            <p className="text-center text-sm text-earth-700/80">
              New here?{' '}
              <Link to="/register" className="text-farm-700 font-bold hover:underline">
                Create account
              </Link>
            </p>
          </form>

          <div className="space-y-5">
            <div className="glass-card glow-card rounded-2xl p-6 animate-fade-up">
              <h2 className="font-display text-lg font-bold text-earth-900 mb-2">
                Quick Access
              </h2>
              <p className="text-sm text-earth-700/75 mb-4">
                One tap — jump into any role dashboard.
              </p>
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

            <div className="glass-card glow-card rounded-2xl p-6 animate-fade-up max-h-[420px] overflow-y-auto">
              <h2 className="font-display text-lg font-bold text-earth-900 mb-3">
                System Accounts
              </h2>
              <p className="text-sm text-earth-700/75 mb-4">
                Click a user to fill the login form.
              </p>
              <div className="space-y-2">
                {users.map((account) => {
                  const role = ROLES.find((r) => r.id === account.roleId)
                  return (
                    <button
                      key={account.id}
                      type="button"
                      onClick={() => fillCredentials(account.email, account.password)}
                      className="w-full text-left p-4 rounded-xl border border-farm-100 bg-farm-50/50 hover:border-farm-400 hover:bg-farm-50 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`h-10 w-10 rounded-xl bg-gradient-to-br ${role?.gradient ?? 'from-farm-600 to-farm-800'} flex items-center justify-center text-lg shadow`}
                        >
                          {role?.emoji}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-earth-900 group-hover:text-farm-800">
                            {account.fullName}
                          </p>
                          <p className="text-xs text-earth-700/70 truncate">{account.email}</p>
                          {account.farmName && (
                            <p className="text-xs text-farm-600 mt-0.5">{account.farmName}</p>
                          )}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

      </main>

      <AppSiteFooter />
    </div>
  )
}
