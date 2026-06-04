import { Link, useNavigate } from 'react-router-dom'
import { LogIn, UserPlus, Leaf, BarChart3, Heart, Shield } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { SYSTEM_CAPABILITY_AREAS } from '../data/featureRegistry'
import { ROLES } from '../types/roles'
import BrandLogo from '../components/ui/BrandLogo'
import PageDecor from '../components/ui/PageDecor'
import AppSiteFooter from '../components/layout/AppSiteFooter'

const highlights = [
  { icon: Leaf, label: 'Livestock tracking', color: 'text-farm-600' },
  { icon: Heart, label: 'Health & vet care', color: 'text-teal-600' },
  { icon: BarChart3, label: 'Reports & analytics', color: 'text-sky-600' },
  { icon: Shield, label: 'Role-based access', color: 'text-violet-600' },
]

export default function HomePage() {
  const { user, getRolePath } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen min-h-[100dvh] page-meadow relative overflow-x-hidden">
      <PageDecor />

      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-farm-800 via-farm-700 to-farm-900" />
        <div className="absolute inset-0 pattern-dots opacity-30" />
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[120%] h-40 bg-farm-50 rounded-[100%] opacity-90" />

        <div className="relative max-w-5xl mx-auto safe-pad-x px-3 sm:px-4 pt-10 sm:pt-12 pb-20 sm:pb-24 text-center">
          <div className="flex justify-center mb-8 animate-fade-up">
            <BrandLogo size="lg" light />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white animate-fade-up stagger-1 px-2">
            Livestock Management
            <span className="block text-hay-300">Reimagined</span>
          </h1>
          <p className="mt-4 text-farm-100/90 max-w-lg mx-auto text-base sm:text-lg animate-fade-up stagger-2 px-2">
            One beautiful platform for every role on the farm — from pasture to profit.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 mt-8 animate-fade-up stagger-3 w-full max-w-sm sm:max-w-none mx-auto sm:mx-0 px-4 sm:px-0">
            <Link to="/login" className="btn-primary w-full sm:w-auto justify-center">
              <LogIn className="h-5 w-5" />
              Sign In
            </Link>
            <Link to="/register" className="btn-secondary !bg-white/95 w-full sm:w-auto justify-center">
              <UserPlus className="h-5 w-5" />
              Create Account
            </Link>
            {user && (
              <button
                type="button"
                onClick={() => navigate(getRolePath(user.roleId))}
                className="btn-ghost-light !px-5 !py-2.5"
              >
                My Dashboard →
              </button>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-white/80 animate-fade-up stagger-4">
            {highlights.map((h) => (
              <span key={h.label} className="inline-flex items-center gap-2">
                <h.icon className={`h-4 w-4 ${h.color} !text-hay-300`} />
                {h.label}
              </span>
            ))}
          </div>
        </div>
      </header>

      <main className="relative max-w-5xl mx-auto safe-pad-x px-3 sm:px-4 -mt-6 sm:-mt-8 pb-12 sm:pb-16">
        <h2 className="font-display text-2xl md:text-3xl font-bold gradient-text text-center mb-2">
          Five Powerful Roles
        </h2>
        <div className="section-shine w-32 mx-auto mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {ROLES.map((role, i) => (
            <div
              key={role.id}
              className="glass-card glass-card-hover glow-card rounded-2xl p-5 flex items-center gap-4 animate-fade-up"
              style={{ animationDelay: `${0.1 + i * 0.05}s`, opacity: 0 }}
            >
              <div
                className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${role.gradient} flex items-center justify-center text-2xl shadow-lg shrink-0`}
              >
                {role.emoji}
              </div>
              <div className="text-left flex-1 min-w-0">
                <h3 className="font-display font-bold text-earth-900">{role.name}</h3>
                <p className="text-sm text-earth-700/75 mt-0.5 leading-relaxed">
                  {role.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-10 glass-card glow-card rounded-2xl p-8 md:p-10">
          <h2 className="font-display text-xl font-bold text-earth-900 text-center mb-6">
            System Capabilities
          </h2>
          <ul className="grid sm:grid-cols-2 gap-2 text-sm text-earth-800">
            {SYSTEM_CAPABILITY_AREAS.map((area) => (
              <li key={area} className="flex items-start gap-2 rounded-lg bg-farm-50/80 px-3 py-2">
                <span className="text-farm-600 font-bold">•</span>
                {area}
              </li>
            ))}
          </ul>
        </section>

      </main>

      <AppSiteFooter className="mt-4 bg-white/50" />
    </div>
  )
}
