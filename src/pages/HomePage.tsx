import { Link, useNavigate } from 'react-router-dom'
import { LogIn, UserPlus, Leaf, BarChart3, Heart, Shield, ArrowRight } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { SYSTEM_CAPABILITY_AREAS } from '../data/featureRegistry'
import { ROLES } from '../types/roles'
import BrandLogo from '../components/ui/BrandLogo'
import DeveloperCredit from '../components/ui/DeveloperCredit'
import { PRODUCT } from '../data/credits'

const highlights = [
  { icon: Leaf, label: 'Livestock tracking' },
  { icon: Heart, label: 'Health & vet care' },
  { icon: BarChart3, label: 'Reports & analytics' },
  { icon: Shield, label: 'Role-based access' },
]

export default function HomePage() {
  const { user, getRolePath } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen min-h-[100dvh] page-emerald overflow-x-hidden flex flex-col">
      {/* Hero */}
      <header className="home-hero-emerald relative overflow-hidden text-white">
        <div className="auth-hero-glow absolute inset-0" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-emerald-950/30" />

        <div className="relative max-w-6xl mx-auto safe-pad-x px-4 sm:px-6 pt-12 sm:pt-16 pb-20 sm:pb-28 text-center">
          <div className="flex justify-center mb-8 animate-fade-up">
            <BrandLogo size="lg" light />
          </div>

          <span className="emerald-badge inline-flex px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest animate-fade-up stagger-1">
            {PRODUCT.systemName}
          </span>

          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mt-6 animate-fade-up stagger-1 leading-tight px-2">
            Livestock Management
            <span className="block text-emerald-300 mt-1">Reimagined in Emerald</span>
          </h1>

          <p className="mt-5 text-emerald-100/85 max-w-xl mx-auto text-base sm:text-lg animate-fade-up stagger-2 px-2 leading-relaxed">
            One beautiful platform for every role on the farm — from pasture to profit.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 mt-10 animate-fade-up stagger-3 w-full max-w-md sm:max-w-none mx-auto px-2">
            <Link
              to="/login"
              className="btn-primary w-full sm:w-auto justify-center !bg-gradient-to-r !from-emerald-500 !to-emerald-800 min-h-[2.75rem] px-8"
            >
              <LogIn className="h-5 w-5" />
              Sign In
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-[2.75rem] px-8 rounded-xl font-semibold text-emerald-950 bg-white hover:bg-emerald-50 border border-emerald-200/80 shadow-lg transition-all hover:-translate-y-0.5"
            >
              <UserPlus className="h-5 w-5" />
              Create Account
            </Link>
            {user && (
              <button
                type="button"
                onClick={() => navigate(getRolePath(user.roleId))}
                className="btn-home-link w-full sm:w-auto justify-center !text-white"
              >
                My Dashboard
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-12 animate-fade-up stagger-4">
            {highlights.map((h) => (
              <span
                key={h.label}
                className="home-stat-pill inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-emerald-100/90"
              >
                <h.icon className="h-4 w-4 text-emerald-300 shrink-0" />
                {h.label}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 relative max-w-6xl mx-auto safe-pad-x px-4 sm:px-6 -mt-10 sm:-mt-14 pb-12 w-full">
        <section className="text-center mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-emerald-950">
            Five Powerful Roles
          </h2>
          <div className="section-shine w-28 mx-auto mt-3 mb-2" />
          <p className="text-emerald-800/70 text-sm sm:text-base max-w-lg mx-auto">
            Each role gets a tailored dashboard with the tools they need.
          </p>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ROLES.map((role, i) => (
            <div
              key={role.id}
              className="emerald-card rounded-2xl p-5 flex items-start gap-4 glass-card-hover animate-fade-up"
              style={{ animationDelay: `${0.08 + i * 0.05}s`, opacity: 0 }}
            >
              <div
                className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${role.gradient} flex items-center justify-center text-2xl shadow-lg shrink-0 ring-2 ring-emerald-100`}
              >
                {role.emoji}
              </div>
              <div className="text-left flex-1 min-w-0">
                <h3 className="font-display font-bold text-emerald-950">{role.name}</h3>
                <p className="text-sm text-emerald-800/70 mt-1 leading-relaxed line-clamp-3">
                  {role.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-12 emerald-card rounded-2xl p-6 sm:p-10">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-emerald-950 text-center mb-6">
            System Capabilities
          </h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-emerald-900/85">
            {SYSTEM_CAPABILITY_AREAS.map((area) => (
              <li
                key={area}
                className="flex items-start gap-2 rounded-xl bg-emerald-50/80 border border-emerald-100 px-3 py-2.5"
              >
                <span className="text-emerald-500 font-bold shrink-0">•</span>
                {area}
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="auth-footer border-t border-emerald-200/80 py-6 space-y-3 mt-auto">
        <p className="text-center text-xs sm:text-sm text-emerald-800/70 px-4">
          <span className="font-display font-bold text-emerald-900">{PRODUCT.name}</span>
          {' · '}&copy; {new Date().getFullYear()}
          {' · '}{PRODUCT.systemName}
        </p>
        <DeveloperCredit variant="compact" className="!text-emerald-700/70" />
      </footer>
    </div>
  )
}
