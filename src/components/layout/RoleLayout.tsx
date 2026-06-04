import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LogOut, Menu, User } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import BrandLogo from '../ui/BrandLogo'
import PageDecor from '../ui/PageDecor'
import SidebarNav from './SidebarNav'
import AppSiteFooter from './AppSiteFooter'
import { getRoleById, type NavItem, type RoleId } from '../../types/roles'

interface RoleLayoutProps {
  roleId: RoleId
  basePath: string
  navItems: NavItem[]
}

export default function RoleLayout({ roleId, basePath, navItems }: RoleLayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout, getRolePath } = useAuth()
  const role = getRoleById(roleId)
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuPath, setMenuPath] = useState(location.pathname)
  const sidebarOpen = menuOpen && menuPath === location.pathname

  const openSidebar = () => {
    setMenuPath(location.pathname)
    setMenuOpen(true)
  }
  const closeSidebar = () => setMenuOpen(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  useEffect(() => {
    if (!user) return
    const allowed =
      user.roleId === roleId || user.roleId === 'super-admin'
    if (!allowed) {
      navigate(getRolePath(user.roleId), { replace: true })
    }
  }, [user, roleId, navigate, getRolePath])

  useEffect(() => {
    if (!sidebarOpen) return
    const mq = window.matchMedia('(max-width: 1023px)')
    const lock = () => {
      if (mq.matches) {
        document.body.style.overflow = 'hidden'
      }
    }
    lock()
    const onChange = () => {
      if (!mq.matches) {
        document.body.style.overflow = ''
        setMenuOpen(false)
      } else if (sidebarOpen) {
        document.body.style.overflow = 'hidden'
      }
    }
    mq.addEventListener('change', onChange)
    return () => {
      document.body.style.overflow = ''
      mq.removeEventListener('change', onChange)
    }
  }, [sidebarOpen])

  if (!role) return null

  if (user && user.roleId !== roleId && user.roleId !== 'super-admin') {
    return null
  }

  return (
    <div className="min-h-screen min-h-[100dvh] page-app flex overflow-x-hidden">
      <PageDecor />

      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-earth-900/50 backdrop-blur-sm lg:hidden touch-target"
          aria-label="Close menu overlay"
          onClick={closeSidebar}
        />
      )}

      <SidebarNav
        role={role}
        basePath={basePath}
        navItems={navItems}
        user={user}
        open={sidebarOpen}
        onClose={closeSidebar}
        onLogout={handleLogout}
        onMyRole={() => user && navigate(getRolePath(user.roleId))}
      />

      <div className="flex min-h-[100dvh] min-w-0 flex-1 flex-col w-full">
        <header
          className="sticky top-0 z-30 flex items-center gap-2 sm:gap-3 border-b border-farm-200/80 bg-white/95 safe-pad-x py-2.5 sm:py-3 shadow-md backdrop-blur-xl lg:hidden"
        >
          <button
            type="button"
            onClick={openSidebar}
            className={`touch-target rounded-xl p-2.5 text-white shadow-md bg-gradient-to-r ${role.gradient} transition-transform active:scale-95 shrink-0`}
            aria-expanded={sidebarOpen}
            aria-controls="app-sidebar"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <div className="sm:hidden shrink-0">
              <BrandLogo size="sm" compact />
            </div>
            <div className="hidden sm:block min-w-0 shrink">
              <BrandLogo size="sm" />
            </div>
            <div className="min-w-0 flex-1 hidden min-[400px]:block">
              <p className="truncate text-[10px] sm:text-xs font-bold uppercase tracking-wide text-farm-700">
                {role.emoji} {role.name}
              </p>
              {user && (
                <p className="truncate text-xs sm:text-sm text-earth-700/80 flex items-center gap-1">
                  <User className="h-3 w-3 shrink-0" />
                  {user.fullName}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="touch-target shrink-0 rounded-xl p-2 text-farm-700 hover:bg-farm-100 transition-colors"
            aria-label="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </header>

        <main className="flex-1 w-full min-w-0 max-w-7xl mx-auto safe-pad-x py-4 sm:py-6 md:py-8 lg:px-8">
          <Outlet />
        </main>

        <AppSiteFooter className="safe-pad-bottom" />
      </div>
    </div>
  )
}
