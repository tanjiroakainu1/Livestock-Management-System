export default function PageDecor() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10" aria-hidden>
      <div className="absolute -top-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-farm-400/25 to-farm-600/10 blur-3xl animate-aurora" />
      <div className="absolute top-1/4 -left-40 h-96 w-96 rounded-full bg-gradient-to-tr from-hay-400/30 to-amber-300/10 blur-3xl animate-aurora-delay" />
      <div className="absolute bottom-0 right-1/3 h-80 w-80 rounded-full bg-farm-500/15 blur-3xl animate-aurora" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full opacity-40"
        style={{
          background:
            'radial-gradient(circle, rgba(61, 189, 107, 0.08) 0%, transparent 70%)',
        }}
      />
      <div className="absolute inset-0 pattern-dots opacity-[0.35]" />
    </div>
  )
}
