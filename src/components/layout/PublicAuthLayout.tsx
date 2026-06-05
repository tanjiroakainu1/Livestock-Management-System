import { Link } from 'react-router-dom'
import { CheckCircle2, Home, type LucideIcon } from 'lucide-react'
import BrandLogo from '../ui/BrandLogo'
import DeveloperCredit from '../ui/DeveloperCredit'
import { PRODUCT } from '../../data/credits'
import type { ReactNode } from 'react'

interface FeatureItem {
  icon: LucideIcon
  text: string
}

interface PublicAuthLayoutProps {
  badge: string
  title: string
  headline: string
  subtitle: string
  formTitle: string
  formHint?: string
  features?: FeatureItem[]
  children: ReactNode
  sidebar?: ReactNode
}

export default function PublicAuthLayout({
  badge,
  title,
  headline,
  subtitle,
  formTitle,
  formHint,
  features = [],
  children,
  sidebar,
}: PublicAuthLayoutProps) {
  return (
    <div className="min-h-screen min-h-[100dvh] flex flex-col lg:flex-row overflow-x-hidden">
      {/* Emerald branding panel */}
      <aside className="auth-hero-panel relative flex flex-col justify-between px-5 sm:px-8 lg:px-10 py-6 lg:py-10 lg:w-[44%] xl:w-[42%] shrink-0 text-white overflow-hidden">
        <div className="auth-hero-glow pointer-events-none" aria-hidden />

        <div className="relative z-10">
          <Link to="/" className="btn-home-link mb-8 lg:mb-12 inline-flex">
            <Home className="h-4 w-4 shrink-0" />
            Back to Home
          </Link>

          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <BrandLogo size="lg" light />
            <span className="emerald-badge mt-6 inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              {badge}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold mt-5 leading-tight">
              {title}
            </h1>
            <p className="text-emerald-100/90 text-lg sm:text-xl font-semibold mt-2 max-w-md">
              {headline}
            </p>
            <p className="text-emerald-200/70 text-sm sm:text-base mt-4 max-w-md leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>

        {features.length > 0 && (
          <div className="relative z-10 mt-8 lg:mt-0 hidden sm:block">
            <div className="auth-feature-card rounded-2xl p-5 sm:p-6 max-w-md mx-auto lg:mx-0">
              <ul className="space-y-3">
                {features.map((f) => (
                  <li key={f.text} className="flex items-start gap-3 text-sm text-emerald-50/90">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/25 border border-emerald-400/30">
                      <f.icon className="h-4 w-4 text-emerald-300" />
                    </span>
                    <span className="pt-1.5 leading-relaxed">{f.text}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-300/90">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                Instant access to your role dashboard
              </p>
            </div>
          </div>
        )}

        <p className="relative z-10 hidden lg:block text-[10px] uppercase tracking-widest text-emerald-400/50 mt-6">
          {PRODUCT.name}
        </p>
      </aside>

      {/* Form panel */}
      <div className="auth-form-panel flex-1 flex flex-col min-w-0">
        <div className="flex-1 safe-pad-x px-4 sm:px-8 py-8 lg:py-12 flex flex-col">
          <div className="w-full max-w-lg mx-auto flex-1 flex flex-col">
            <div className="auth-card rounded-2xl p-6 sm:p-8 shadow-xl animate-fade-up">
              <h2 className="font-display text-2xl font-bold text-emerald-950">{formTitle}</h2>
              {formHint && (
                <p className="text-sm text-emerald-800/70 mt-1 mb-6">{formHint}</p>
              )}
              {!formHint && <div className="mb-6" />}
              {children}
            </div>

            {sidebar && (
              <div className="mt-6 space-y-4 w-full max-w-lg mx-auto">{sidebar}</div>
            )}
          </div>
        </div>

        <footer className="auth-footer safe-pad-bottom px-4 py-5 text-center space-y-2 border-t border-emerald-200/60">
          <p className="text-xs text-emerald-800/60">
            {PRODUCT.name} · &copy; {new Date().getFullYear()}
          </p>
          <DeveloperCredit variant="compact" className="!text-emerald-700/70" />
        </footer>
      </div>
    </div>
  )
}
