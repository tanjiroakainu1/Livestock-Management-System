import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  LogOut,
  User,
  X,
} from 'lucide-react'
import BrandLogo from '../ui/BrandLogo'
import DeveloperCredit from '../ui/DeveloperCredit'
import type { NavItem, RoleInfo } from '../../types/roles'
import type { User as AppUser } from '../../types/auth'

interface SidebarNavProps {
  role: RoleInfo
  basePath: string
  navItems: NavItem[]
  user: AppUser | null
  open: boolean
  onClose: () => void
  onLogout: () => void
  onMyRole: () => void
}

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `sidebar-nav-link flex items-center gap-3 px-3 py-3 sm:py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 min-h-[2.75rem] ${
    isActive
      ? 'bg-white text-earth-900 shadow-lg nav-pill-active'
      : 'text-white/90 hover:bg-white/15 active:bg-white/20'
  }`

export default function SidebarNav({
  role,
  basePath,
  navItems,
  user,
  open,
  onClose,
  onLogout,
  onMyRole,
}: SidebarNavProps) {
  const handleNavClick = () => {
    if (window.matchMedia('(max-width: 1023px)').matches) {
      onClose()
    }
  }

  return (
    <aside
      id="app-sidebar"
      aria-label="Main navigation"
      className={`
        fixed top-0 left-0 z-50 flex h-full h-[100dvh] w-[min(20rem,92vw)] flex-col
        bg-gradient-to-b ${role.gradient} text-white shadow-2xl
        transition-transform duration-300 ease-out
        safe-pad-x
        lg:sticky lg:z-40 lg:h-screen lg:w-64 lg:max-w-[16rem] lg:translate-x-0 lg:shrink-0
        ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
    >
      <div className="absolute inset-0 pattern-dots opacity-20 pointer-events-none" />

      <div className="relative flex items-center justify-between gap-2 border-b border-white/15 px-3 sm:px-4 py-3 sm:py-4 safe-pad-x">
        <BrandLogo size="sm" light />
        <button
          type="button"
          onClick={onClose}
          className="lg:hidden touch-target rounded-lg p-2 text-white/90 hover:bg-white/15 transition-colors"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="relative border-b border-white/15 px-3 sm:px-4 py-3">
        <p className="text-xs font-bold uppercase tracking-widest text-white/70 truncate">
          {role.emoji} {role.name}
        </p>
        {user && (
          <p className="mt-1 text-sm text-white/90 flex items-center gap-1.5 min-w-0">
            <User className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{user.fullName}</span>
          </p>
        )}
      </div>

      <nav className="relative flex-1 overflow-y-auto overscroll-contain sidebar-scroll px-2 sm:px-3 py-3 sm:py-4">
        <ul className="space-y-0.5 sm:space-y-1">
          <li>
            <NavLink
              to={basePath}
              end
              className={navLinkClass}
              onClick={handleNavClick}
            >
              <LayoutDashboard className="h-4 w-4 shrink-0" />
              Dashboard
            </NavLink>
          </li>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={`${basePath}/${item.path}`}
                className={navLinkClass}
                onClick={handleNavClick}
              >
                <NavDot />
                <span className="leading-snug break-words">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="relative border-t border-white/15 p-3 space-y-2 safe-pad-bottom">
        <DeveloperCredit variant="sidebar" />
        {user && (
          <button
            type="button"
            onClick={() => {
              onMyRole()
              handleNavClick()
            }}
            className="btn-ghost-light w-full justify-center min-h-[2.75rem]"
          >
            <User className="h-4 w-4 shrink-0" />
            <span className="truncate">My Role Dashboard</span>
          </button>
        )}
        <button
          type="button"
          onClick={onLogout}
          className="btn-ghost-light w-full justify-center min-h-[2.75rem]"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Logout
        </button>
      </div>
    </aside>
  )
}

function NavDot() {
  return (
    <span
      className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/60"
      aria-hidden
    />
  )
}
