import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { FarmData } from '../types/farm'
import { loadFarmDataFromStorage, saveFarmDataToStorage } from '../lib/storage'

export interface FarmDataContextValue {
  data: FarmData
  isLoading: boolean
  updateData: (updater: (prev: FarmData) => FarmData) => void
}

export const FarmDataContext = createContext<FarmDataContextValue | null>(null)

export function FarmDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<FarmData>(loadFarmDataFromStorage)
  const isLoading = false

  const updateData = useCallback((updater: (prev: FarmData) => FarmData) => {
    setData((prev) => {
      const next = updater(prev)
      saveFarmDataToStorage(next)
      return next
    })
  }, [])

  const value = useMemo(
    () => ({ data, isLoading, updateData }),
    [data, isLoading, updateData],
  )

  return (
    <FarmDataContext.Provider value={value}>{children}</FarmDataContext.Provider>
  )
}
