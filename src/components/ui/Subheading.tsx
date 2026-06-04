interface SubheadingProps {
  children: React.ReactNode
}

export default function Subheading({ children }: SubheadingProps) {
  return (
    <h3 className="font-display text-lg font-bold text-earth-900">{children}</h3>
  )
}
