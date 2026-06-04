import { useFarmData } from '../../hooks/useFarmData'
import { useFarmActions } from '../../hooks/useFarmActions'
import FeaturePage from '../../components/layout/FeaturePage'
import RoleReportsCharts from '../../components/reports/RoleReportsCharts'

export default function GenerateHealthReports() {
  const { data } = useFarmData()
  const { logExport } = useFarmActions('veterinarian', 'health-reports')

  return (
    <FeaturePage
      roleId="veterinarian"
      featurePath="health-reports"
      title="Generate Health Reports"
      description="Veterinary charts and analytics only — manage records under Animal Health, Checkups, Vaccinations, and Treatments."
      badge="Reports & Analytics"
      stats={[
        { label: 'Health Records', value: data.healthRecords.length },
        { label: 'Vaccinations', value: data.vaccinations.length },
        { label: 'Active Treatments', value: data.treatments.filter((t) => t.status === 'Active').length },
        { label: 'Checkups', value: data.checkups.length },
      ]}
      hideRecordTable
      actions={
        <div className="glass-card rounded-xl px-4 py-3 text-sm text-earth-700 flex flex-wrap items-center justify-between gap-3">
          <p>
            <strong>Reports only — charts below.</strong> Add or edit data on Animal Health,
            Health Checkups, Vaccination Records, Diagnose Illness, or Prescribe Treatments.
          </p>
          <button type="button" onClick={logExport} className="btn-primary shrink-0">
            Log Report View
          </button>
        </div>
      }
    >
      <RoleReportsCharts scope="veterinarian" />
    </FeaturePage>
  )
}
