import { Check } from 'lucide-react'

export default function RoleFeatureList({ features }: { features: readonly string[] }) {
  return (
    <ul className="glass-card rounded-2xl p-5 grid sm:grid-cols-2 gap-2">
      {features.map((f) => (
        <li key={f} className="flex items-start gap-2 text-sm text-earth-800">
          <Check className="h-4 w-4 text-farm-600 shrink-0 mt-0.5" />
          {f}
        </li>
      ))}
    </ul>
  )
}
