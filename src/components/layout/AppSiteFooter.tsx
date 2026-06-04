import { PRODUCT } from '../../data/credits'
import DeveloperCredit from '../ui/DeveloperCredit'

interface AppSiteFooterProps {
  className?: string
}

export default function AppSiteFooter({ className = '' }: AppSiteFooterProps) {
  return (
    <footer
      className={`border-t border-farm-200/80 bg-white/80 backdrop-blur-md py-6 shrink-0 ${className}`}
    >
      <div className="footer-glow-line max-w-7xl mx-auto mb-5 opacity-80" />
      <div className="max-w-7xl mx-auto safe-pad-x px-3 sm:px-4 space-y-3">
        <p className="text-center text-xs sm:text-sm text-earth-700/75 leading-relaxed px-2">
          <span className="font-display font-bold text-farm-800 text-base">
            {PRODUCT.name}
          </span>
          <span className="mx-2 text-farm-300">·</span>
          &copy; {new Date().getFullYear()}
          <span className="mx-2 text-farm-300">·</span>
          {PRODUCT.systemName}
        </p>
        <DeveloperCredit variant="footer" />
      </div>
    </footer>
  )
}
