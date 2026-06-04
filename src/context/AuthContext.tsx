import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { DEFAULT_USERS } from '../data/defaultUsers'
import type { LoginCredentials, RegisterData, User } from '../types/auth'
import type { RoleId } from '../types/roles'
import { STORAGE_KEYS } from '../lib/storage'
import { ROLES, isRegisterableRole } from '../types/roles'

export interface AuthContextValue {
  user: User | null
  users: User[]
  isLoading: boolean
  login: (credentials: LoginCredentials) => {
    success: boolean
    user?: User
    error?: string
  }
  loginAsRole: (roleId: RoleId) => {
    success: boolean
    user?: User
    error?: string
  }
  register: (data: RegisterData) => { success: boolean; error?: string }
  logout: () => void
  getRolePath: (roleId: RoleId) => string
}

export const AuthContext = createContext<AuthContextValue | null>(null)

function loadUsers(): User[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.users)
    const registered: User[] = stored ? JSON.parse(stored) : []
    const registeredEmails = new Set(
      registered.map((u) => u.email.toLowerCase()),
    )
    const defaults = DEFAULT_USERS.filter(
      (d) => !registeredEmails.has(d.email.toLowerCase()),
    )
    return [...defaults, ...registered]
  } catch {
    return [...DEFAULT_USERS]
  }
}

function saveRegisteredUsers(users: User[]) {
  const registered = users.filter((u) => !u.isDefault)
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(registered))
}

function loadSession(users: User[]): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.session)
    if (!raw) return null
    const session = JSON.parse(raw) as { userId: string }
    return users.find((u) => u.id === session.userId) ?? null
  } catch {
    return null
  }
}

function getInitialAuthState(): { users: User[]; user: User | null } {
  const users = loadUsers()
  return { users, user: loadSession(users) }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [initial] = useState(getInitialAuthState)
  const [users, setUsers] = useState<User[]>(initial.users)
  const [user, setUser] = useState<User | null>(initial.user)
  const isLoading = false

  const persistSession = useCallback((nextUser: User | null) => {
    if (nextUser) {
      localStorage.setItem(STORAGE_KEYS.session, JSON.stringify({ userId: nextUser.id }))
    } else {
      localStorage.removeItem(STORAGE_KEYS.session)
    }
    setUser(nextUser)
  }, [])

  const getRolePath = useCallback((roleId: RoleId) => {
    return ROLES.find((r) => r.id === roleId)?.path ?? '/'
  }, [])

  const login = useCallback(
    (credentials: LoginCredentials) => {
      const allUsers = loadUsers()
      const match = allUsers.find(
        (u) =>
          u.email.toLowerCase() === credentials.email.trim().toLowerCase() &&
          u.password === credentials.password,
      )
      if (!match) {
        return { success: false, error: 'Invalid email or password.' }
      }
      setUsers(allUsers)
      persistSession(match)
      return { success: true, user: match }
    },
    [persistSession],
  )

  const loginAsRole = useCallback(
    (roleId: RoleId) => {
      const account = DEFAULT_USERS.find((u) => u.roleId === roleId)
      if (!account) {
        return { success: false, error: 'No default account for this role.' }
      }
      return login({
        email: account.email,
        password: account.password,
      })
    },
    [login],
  )

  const register = useCallback(
    (data: RegisterData) => {
      const allUsers = loadUsers()
      const emailTaken = allUsers.some(
        (u) => u.email.toLowerCase() === data.email.trim().toLowerCase(),
      )
      if (emailTaken) {
        return { success: false, error: 'Email is already registered.' }
      }
      if (data.password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters.' }
      }
      if (!isRegisterableRole(data.roleId)) {
        return {
          success: false,
          error: 'Super Admin accounts cannot be created via registration.',
        }
      }

      const newUser: User = {
        id: `user-${Date.now()}`,
        fullName: data.fullName.trim(),
        email: data.email.trim().toLowerCase(),
        password: data.password,
        roleId: data.roleId,
        farmName: data.farmName?.trim(),
        phone: data.phone?.trim(),
        isDefault: false,
        createdAt: new Date().toISOString(),
      }

      const updated = [...allUsers, newUser]
      setUsers(updated)
      saveRegisteredUsers(updated)
      persistSession(newUser)
      return { success: true }
    },
    [persistSession],
  )

  const logout = useCallback(() => {
    persistSession(null)
  }, [persistSession])

  const value = useMemo(
    () => ({
      user,
      users,
      isLoading,
      login,
      loginAsRole,
      register,
      logout,
      getRolePath,
    }),
    [user, users, isLoading, login, loginAsRole, register, logout, getRolePath],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
