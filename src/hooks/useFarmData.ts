import { useContext } from 'react'
import { FarmDataContext } from '../context/FarmDataContext'

export function useFarmData() {
  const ctx = useContext(FarmDataContext)
  if (!ctx) throw new Error('useFarmData must be used within FarmDataProvider')
  return ctx
}
