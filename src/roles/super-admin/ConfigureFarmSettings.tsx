import { useState, type FormEvent } from 'react'
import { useFarmData } from '../../hooks/useFarmData'
import { useFarmActions } from '../../hooks/useFarmActions'
import ActionPanel, { Field, Input } from '../../components/actions/ActionPanel'
import FeaturePage from '../../components/layout/FeaturePage'

export default function ConfigureFarmSettings() {
  const { data } = useFarmData()
  const { updateFarmSettings } = useFarmActions('super-admin', 'farm-settings')
  const s = data.farmSettings
  const [msg, setMsg] = useState<string | null>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    updateFarmSettings({
      farmName: String(fd.get('farmName')),
      location: String(fd.get('location')),
      totalAcres: Number(fd.get('totalAcres')),
      operatingHours: String(fd.get('operatingHours')),
      contactEmail: String(fd.get('contactEmail')),
      contactPhone: String(fd.get('contactPhone')),
    })
    setMsg('Farm settings saved successfully.')
  }

  return (
    <FeaturePage
      roleId="super-admin"
      featurePath="farm-settings"
      title="Configure Farm Settings"
      description="Full system access — update global farm configuration."
      badge="Super Admin"
      stats={[
        { label: 'Farm', value: s.farmName },
        { label: 'Acres', value: s.totalAcres },
        { label: 'Location', value: s.location },
      ]}
      hideRecordTable
      actions={
        <ActionPanel
          title="Update Farm Settings"
          description="Changes apply across the entire system and persist in localStorage."
          onSubmit={handleSubmit}
          submitLabel="Save Settings"
          successMessage={msg}
        >
          <Field label="Farm Name"><Input name="farmName" defaultValue={s.farmName} required /></Field>
          <Field label="Location"><Input name="location" defaultValue={s.location} required /></Field>
          <Field label="Total Acres"><Input name="totalAcres" type="number" defaultValue={s.totalAcres} required /></Field>
          <Field label="Operating Hours"><Input name="operatingHours" defaultValue={s.operatingHours} required /></Field>
          <Field label="Contact Email"><Input name="contactEmail" type="email" defaultValue={s.contactEmail} required /></Field>
          <Field label="Contact Phone"><Input name="contactPhone" defaultValue={s.contactPhone} required /></Field>
        </ActionPanel>
      }
    >
      <div className="glass-card rounded-2xl p-6 grid sm:grid-cols-2 gap-4 text-sm">
        <div><span className="text-earth-600">Farm Name</span><p className="font-semibold text-earth-900">{s.farmName}</p></div>
        <div><span className="text-earth-600">Location</span><p className="font-semibold text-earth-900">{s.location}</p></div>
        <div><span className="text-earth-600">Total Acres</span><p className="font-semibold text-earth-900">{s.totalAcres}</p></div>
        <div><span className="text-earth-600">Hours</span><p className="font-semibold text-earth-900">{s.operatingHours}</p></div>
        <div><span className="text-earth-600">Email</span><p className="font-semibold text-earth-900">{s.contactEmail}</p></div>
        <div><span className="text-earth-600">Phone</span><p className="font-semibold text-earth-900">{s.contactPhone}</p></div>
      </div>
    </FeaturePage>
  )
}
