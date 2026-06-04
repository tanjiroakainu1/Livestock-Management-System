import { useFarmData } from '../../hooks/useFarmData'
import { Select } from './ActionPanel'

export default function AnimalTagSelect(
  props: React.SelectHTMLAttributes<HTMLSelectElement>,
) {
  const { data } = useFarmData()
  return (
    <Select required {...props}>
      <option value="">Select animal tag</option>
      {data.livestock.map((l) => (
        <option key={l.id} value={l.tagNumber}>
          {l.tagNumber} — {l.name}
        </option>
      ))}
    </Select>
  )
}
