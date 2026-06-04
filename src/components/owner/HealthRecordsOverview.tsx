import { Activity, Heart, Shield, Stethoscope } from 'lucide-react'
import { useFarmData } from '../../hooks/useFarmData'
import DataTable from '../data/DataTable'
import { healthColumns, vaccinationColumns, treatmentColumns } from '../../data/tableColumns'

export default function HealthRecordsOverview() {
  const { data } = useFarmData()
  const sick = data.livestock.filter((l) => l.status === 'Sick').length
  const activeTreatments = data.treatments.filter((t) => t.status === 'Active').length
  const upcomingVaccines = data.vaccinations.filter(
    (v) => v.nextDue >= new Date().toISOString().slice(0, 10),
  ).length

  const highlights = [
    {
      icon: Heart,
      label: 'Health Records',
      value: data.healthRecords.length,
      color: 'from-rose-500 to-pink-600',
    },
    {
      icon: Shield,
      label: 'Vaccinations',
      value: data.vaccinations.length,
      color: 'from-violet-500 to-indigo-600',
    },
    {
      icon: Stethoscope,
      label: 'Active Treatments',
      value: activeTreatments,
      color: 'from-teal-500 to-cyan-600',
    },
    {
      icon: Activity,
      label: 'Sick Animals',
      value: sick,
      color: 'from-red-500 to-orange-600',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {highlights.map((h) => (
          <div
            key={h.label}
            className="glass-card glass-card-hover glow-card rounded-2xl p-5 relative overflow-hidden group"
          >
            <div
              className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${h.color} opacity-20 rounded-full -translate-y-1/2 translate-x-1/2`}
            />
            <div
              className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${h.color} text-white mb-3`}
            >
              <h.icon className="h-5 w-5" />
            </div>
            <p className="text-3xl font-display font-bold text-earth-900 stat-value-glow group-hover:scale-105 transition-transform origin-left">
              {h.value}
            </p>
            <p className="text-sm font-semibold text-earth-600 mt-1">{h.label}</p>
          </div>
        ))}
      </div>

      {sick > 0 && (
        <div className="rounded-2xl border border-rose-200 bg-gradient-to-r from-rose-50 to-red-50 px-5 py-4">
          <p className="font-semibold text-rose-900">
            {sick} animal{sick !== 1 ? 's' : ''} currently marked sick — review treatments below.
          </p>
        </div>
      )}

      <DataTable
        columns={healthColumns}
        data={data.healthRecords as unknown as Record<string, unknown>[]}
        title="Medical History"
      />
      <DataTable
        columns={vaccinationColumns}
        data={data.vaccinations as unknown as Record<string, unknown>[]}
        title={`Vaccinations (${upcomingVaccines} with upcoming due dates)`}
      />
      <DataTable
        columns={treatmentColumns}
        data={data.treatments as unknown as Record<string, unknown>[]}
        title="Treatment Plans"
      />
    </div>
  )
}
