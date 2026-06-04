import { useState, type FormEvent } from 'react'
import { useFarmData } from '../../hooks/useFarmData'
import { useFarmActions } from '../../hooks/useFarmActions'
import ActionPanel, { Field, TextArea } from '../../components/actions/ActionPanel'
import AnimalTagSelect from '../../components/actions/AnimalTagSelect'
import FeaturePage from '../../components/layout/FeaturePage'
import HealthRecordCrudSection from '../../components/crud/HealthRecordCrudSection'

export default function ReportSickAnimals() {
  const { data } = useFarmData()
  const { reportSickAnimal } = useFarmActions('livestock-caretaker', 'report-sick')
  const [msg, setMsg] = useState<string | null>(null)
  const sickAnimals = data.livestock.filter((l) => l.status === 'Sick')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    reportSickAnimal(String(fd.get('tag')), String(fd.get('notes')))
    setMsg('Sick report submitted. Veterinarian notified.')
    e.currentTarget.reset()
  }

  const alertFilter = (h: { condition: string }) =>
    h.condition !== 'Healthy' && h.condition !== 'Recovering'

  return (
    <FeaturePage
      roleId="livestock-caretaker"
      featurePath="report-sick"
      title="Report Sick Animals"
      description="Flag sick animals and send health alerts to veterinarians."
      badge="Caretaker"
      stats={[{ label: 'Sick Animals', value: sickAnimals.length }]}
      hideRecordTable
      actions={
        <ActionPanel title="Report Sick Animal" onSubmit={handleSubmit} submitLabel="Submit Report" successMessage={msg}>
          <Field label="Animal"><AnimalTagSelect name="tag" /></Field>
          <Field label="Symptoms / Notes" className="md:col-span-2">
            <TextArea name="notes" required placeholder="Describe symptoms observed..." />
          </Field>
        </ActionPanel>
      }
    >
      <HealthRecordCrudSection
        roleId="livestock-caretaker"
        featurePath="report-sick"
        title="Health Alerts (Edit / Delete)"
        filter={alertFilter}
      />
    </FeaturePage>
  )
}
