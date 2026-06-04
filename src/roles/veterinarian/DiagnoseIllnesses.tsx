import { useState, type FormEvent } from 'react'
import { useFarmData } from '../../hooks/useFarmData'
import { useFarmActions } from '../../hooks/useFarmActions'
import { findAnimal } from '../../lib/farmActions'
import ActionPanel, { Field, Input, TextArea } from '../../components/actions/ActionPanel'
import AnimalTagSelect from '../../components/actions/AnimalTagSelect'
import FeaturePage from '../../components/layout/FeaturePage'
import HealthRecordCrudSection from '../../components/crud/HealthRecordCrudSection'
import TreatmentCrudSection from '../../components/crud/TreatmentCrudSection'

export default function DiagnoseIllnesses() {
  const { data } = useFarmData()
  const { addHealthRecord, addTreatment, updateLivestock, userName } = useFarmActions(
    'veterinarian',
    'diagnose-illness',
  )
  const [msg, setMsg] = useState<string | null>(null)
  const sickFilter = (h: { condition: string }) =>
    h.condition !== 'Healthy' && h.condition !== 'Recovering'

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const tag = String(fd.get('tag'))
    const animal = findAnimal(data, tag)
    const diagnosis = String(fd.get('diagnosis'))
    updateLivestock(tag, { status: 'Sick' })
    addHealthRecord({
      animalTag: tag,
      animalName: animal?.name ?? tag,
      date: new Date().toISOString().slice(0, 10),
      condition: diagnosis,
      notes: String(fd.get('notes')),
      recordedBy: userName,
    })
    addTreatment({
      animalTag: tag,
      animalName: animal?.name ?? tag,
      diagnosis,
      treatment: String(fd.get('treatment')),
      startDate: new Date().toISOString().slice(0, 10),
      endDate: String(fd.get('endDate')),
      status: 'Active',
    })
    setMsg(`Diagnosis recorded for ${tag}.`)
    e.currentTarget.reset()
  }

  return (
    <FeaturePage
      roleId="veterinarian"
      featurePath="diagnose-illness"
      title="Diagnose & Record Illnesses"
      description="Document symptoms, diagnoses, and disease monitoring."
      badge="Veterinarian"
      stats={[
        { label: 'Sick Animals', value: data.livestock.filter((l) => l.status === 'Sick').length },
        { label: 'Illness Records', value: data.healthRecords.filter(sickFilter).length },
      ]}
      hideRecordTable
      actions={
        <ActionPanel
          title="Quick Diagnose (adds health + treatment)"
          onSubmit={handleSubmit}
          submitLabel="Record Diagnosis"
          successMessage={msg}
        >
          <Field label="Animal"><AnimalTagSelect name="tag" /></Field>
          <Field label="Diagnosis"><Input name="diagnosis" required /></Field>
          <Field label="Treatment Plan"><Input name="treatment" required /></Field>
          <Field label="End Date"><Input name="endDate" type="date" required /></Field>
          <Field label="Notes" className="md:col-span-2"><TextArea name="notes" required /></Field>
        </ActionPanel>
      }
    >
      <HealthRecordCrudSection
        roleId="veterinarian"
        featurePath="diagnose-illness"
        title="Illness Records (Edit / Delete)"
        filter={sickFilter}
      />
      <TreatmentCrudSection
        roleId="veterinarian"
        featurePath="diagnose-illness"
        title="Active Treatments (Edit / Delete)"
        filter={(t) => t.status === 'Active'}
      />
    </FeaturePage>
  )
}
