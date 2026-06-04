import BrandLogo from './BrandLogo'
import PageDecor from './PageDecor'

export default function LoadingScreen() {
  return (
    <div className="min-h-screen page-meadow flex flex-col items-center justify-center gap-8">
      <PageDecor />
      <div className="animate-float relative">
        <div className="absolute inset-0 rounded-3xl bg-farm-400/20 blur-2xl scale-150" />
        <BrandLogo size="lg" />
      </div>
      <div className="flex gap-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-farm-500 to-farm-700 animate-pulse shadow-md"
            style={{ animationDelay: `${i * 120}ms` }}
          />
        ))}
      </div>
      <p className="text-sm text-farm-700 font-bold tracking-wide">Loading your farm...</p>
    </div>
  )
}
