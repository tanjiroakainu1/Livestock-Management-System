import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext'
import { FarmDataProvider } from './context/FarmDataContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <FarmDataProvider>
        <App />
      </FarmDataProvider>
    </AuthProvider>
  </StrictMode>,
)
