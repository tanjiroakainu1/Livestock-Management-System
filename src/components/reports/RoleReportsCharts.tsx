import { useMemo } from 'react'
import { useFarmData } from '../../hooks/useFarmData'
import type { ReportScope } from '../../data/reportPaths'
import { BarChart, ChartCard, DonutChart, LineChart, StatRing } from './Charts'

interface RoleReportsChartsProps {
  scope: ReportScope
}

export default function RoleReportsCharts({ scope }: RoleReportsChartsProps) {
  const { data } = useFarmData()

  const revenue = data.financials
    .filter((f) => f.type === 'Revenue')
    .reduce((s, f) => s + f.amount, 0)
  const expenses = data.financials
    .filter((f) => f.type === 'Expense')
    .reduce((s, f) => s + f.amount, 0)

  const categoryBars = useMemo(
    () =>
      data.categories.map((c, i) => ({
        label: c.name,
        value: c.animalCount,
        color: [
          'from-emerald-500 to-green-700',
          'from-sky-500 to-blue-700',
          'from-violet-500 to-purple-700',
          'from-amber-500 to-orange-600',
          'from-pink-500 to-rose-600',
          'from-teal-500 to-cyan-700',
        ][i % 6],
      })),
    [data.categories],
  )

  const livestockStatus = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const l of data.livestock) {
      counts[l.status] = (counts[l.status] ?? 0) + 1
    }
    return Object.entries(counts).map(([label, value], i) => ({
      label,
      value,
      color: ['#22c55e', '#ef4444', '#f59e0b', '#8b5cf6'][i % 4],
    }))
  }, [data.livestock])

  const breedingStatus = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const b of data.breedingRecords) {
      counts[b.status] = (counts[b.status] ?? 0) + 1
    }
    return Object.entries(counts).map(([label, value], i) => ({
      label,
      value,
      color: ['#3b82f6', '#ec4899', '#10b981'][i % 3],
    }))
  }, [data.breedingRecords])

  const taskStatus = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const t of data.tasks) {
      counts[t.status] = (counts[t.status] ?? 0) + 1
    }
    return Object.entries(counts).map(([label, value], i) => ({
      label,
      value,
      color: ['#f59e0b', '#3b82f6', '#22c55e'][i % 3],
    }))
  }, [data.tasks])

  const healthConditions = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const h of data.healthRecords) {
      const key = h.condition.slice(0, 24)
      counts[key] = (counts[key] ?? 0) + 1
    }
    return Object.entries(counts)
      .slice(0, 6)
      .map(([label, value], i) => ({
        label,
        value,
        color: [
          'from-rose-500 to-red-600',
          'from-orange-500 to-amber-600',
          'from-teal-500 to-emerald-600',
          'from-indigo-500 to-violet-600',
        ][i % 4],
      }))
  }, [data.healthRecords])

  const finTrend = useMemo(() => {
    const sorted = [...data.financials].sort((a, b) => a.date.localeCompare(b.date))
    const last = sorted.slice(-6)
    return {
      labels: last.map((f) => f.date.slice(5)),
      points: last.map((f) => (f.type === 'Revenue' ? f.amount : -f.amount)),
    }
  }, [data.financials])

  const inventoryBars = useMemo(
    () =>
      data.inventory.map((item, i) => ({
        label: item.name,
        value: item.quantity,
        color: item.quantity < item.minLevel
          ? 'from-red-500 to-rose-600'
          : ['from-lime-500 to-green-600', 'from-cyan-500 to-blue-600'][i % 2],
      })),
    [data.inventory],
  )

  const notifyTypes = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const n of data.notifications) {
      counts[n.type] = (counts[n.type] ?? 0) + 1
    }
    return Object.entries(counts).map(([label, value], i) => ({
      label,
      value,
      color: ['#8b5cf6', '#ef4444', '#f59e0b', '#22c55e', '#3b82f6'][i % 5],
    }))
  }, [data.notifications])

  const treatmentActive = data.treatments.filter((t) => t.status === 'Active').length
  const healthyPct = data.livestock.length
    ? Math.round(
        (data.livestock.filter((l) => l.status === 'Healthy').length /
          data.livestock.length) *
          100,
      )
    : 0

  if (scope === 'farm-manager') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 w-full min-w-0">
        <ChartCard title="Production by Category" subtitle="Livestock head count per category">
          <BarChart items={categoryBars} />
        </ChartCard>
        <ChartCard title="Herd Health Status" subtitle="Current animal status distribution">
          <DonutChart segments={livestockStatus} />
        </ChartCard>
        <ChartCard title="Revenue vs Expenses" subtitle="Financial overview ($)">
          <BarChart
            items={[
              { label: 'Revenue', value: revenue, color: 'from-emerald-400 to-green-600' },
              { label: 'Expenses', value: expenses, color: 'from-red-400 to-rose-600' },
              {
                label: 'Net Profit',
                value: Math.max(0, revenue - expenses),
                color: 'from-violet-500 to-indigo-600',
              },
            ]}
          />
        </ChartCard>
        <ChartCard title="Breeding Pipeline" subtitle="Mated · Pregnant · Born">
          <DonutChart segments={breedingStatus.length ? breedingStatus : [{ label: 'None', value: 1, color: '#d6d3d1' }]} />
        </ChartCard>
        <ChartCard title="Farm Task Load" subtitle="Operations by status">
          <DonutChart segments={taskStatus.length ? taskStatus : [{ label: 'No tasks', value: 1, color: '#d6d3d1' }]} />
        </ChartCard>
        <ChartCard title="Inventory Stock Levels" subtitle="Quantity on hand">
          <BarChart items={inventoryBars} />
        </ChartCard>
        <div className="lg:col-span-2">
          <ChartCard title="Financial Trend" subtitle="Recent entries (revenue + / expense −)">
            <LineChart
              points={finTrend.points.length ? finTrend.points : [0]}
              labels={finTrend.labels.length ? finTrend.labels : ['—']}
              color="#7c3aed"
            />
          </ChartCard>
        </div>
        <div className="lg:col-span-2 grid grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatRing label="Healthy %" value={`${healthyPct}%`} percent={healthyPct} color="#22c55e" />
          <StatRing label="Livestock" value={data.livestock.length} percent={Math.min(100, data.livestock.length * 5)} color="#3b82f6" />
          <StatRing label="Breeding" value={data.breedingRecords.length} percent={Math.min(100, data.breedingRecords.length * 15)} color="#ec4899" />
          <StatRing label="Low Stock" value={data.inventory.filter((i) => i.quantity < i.minLevel).length} percent={40} color="#ef4444" />
        </div>
      </div>
    )
  }

  if (scope === 'veterinarian') {
    const vaccineCounts: Record<string, number> = {}
    for (const v of data.vaccinations) {
      vaccineCounts[v.vaccine] = (vaccineCounts[v.vaccine] ?? 0) + 1
    }
    const uniqueVaccines = Object.entries(vaccineCounts).map(([label, value], i) => ({
      label,
      value,
      color: [
        'from-teal-500 to-cyan-600',
        'from-violet-500 to-purple-600',
        'from-rose-500 to-pink-600',
        'from-amber-500 to-orange-600',
        'from-blue-500 to-indigo-600',
      ][i % 5],
    }))
    const monthlyHealth = data.healthRecords
      .slice(0, 6)
      .map((h) => h.date.slice(5))
    const healthTrend = data.healthRecords.slice(0, 6).map(() => 1)

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 w-full min-w-0">
        <div className="lg:col-span-2 rounded-2xl p-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-violet-600">
          <div className="rounded-[14px] bg-white/95 p-4 grid grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-3xl font-display font-bold text-teal-700">{data.healthRecords.length}</p>
              <p className="text-xs font-semibold text-earth-600">Health Records</p>
            </div>
            <div>
              <p className="text-3xl font-display font-bold text-violet-700">{data.vaccinations.length}</p>
              <p className="text-xs font-semibold text-earth-600">Vaccinations</p>
            </div>
            <div>
              <p className="text-3xl font-display font-bold text-rose-600">{treatmentActive}</p>
              <p className="text-xs font-semibold text-earth-600">Active Treatments</p>
            </div>
            <div>
              <p className="text-3xl font-display font-bold text-sky-700">
                {data.livestock.filter((l) => l.status === 'Sick').length}
              </p>
              <p className="text-xs font-semibold text-earth-600">Sick Animals</p>
            </div>
          </div>
        </div>
        <ChartCard title="Health Conditions" subtitle="Recorded diagnoses & observations">
          <BarChart items={healthConditions.length ? healthConditions : [{ label: 'No records', value: 0, color: 'from-gray-400 to-gray-500' }]} />
        </ChartCard>
        <ChartCard title="Treatment Status" subtitle="Active vs completed">
          <DonutChart
            segments={[
              { label: 'Active', value: treatmentActive, color: '#ef4444' },
              {
                label: 'Completed',
                value: data.treatments.filter((t) => t.status === 'Completed').length,
                color: '#22c55e',
              },
            ]}
          />
        </ChartCard>
        <ChartCard title="Vaccine Coverage" subtitle="Doses by vaccine type">
          <BarChart
            items={
              uniqueVaccines.length
                ? uniqueVaccines
                : [{ label: 'No vaccines', value: 0, color: 'from-gray-400 to-gray-500' }]
            }
          />
        </ChartCard>
        <ChartCard title="Checkup Schedule" subtitle="Scheduled · Completed · Overdue">
          <DonutChart
            segments={[
              {
                label: 'Scheduled',
                value: data.checkups.filter((c) => c.status === 'Scheduled').length,
                color: '#3b82f6',
              },
              {
                label: 'Completed',
                value: data.checkups.filter((c) => c.status === 'Completed').length,
                color: '#22c55e',
              },
              {
                label: 'Overdue',
                value: data.checkups.filter((c) => c.status === 'Overdue').length,
                color: '#f59e0b',
              },
            ]}
          />
        </ChartCard>
        <ChartCard title="Herd Health Snapshot" subtitle="Livestock status">
          <DonutChart segments={livestockStatus.length ? livestockStatus : [{ label: 'N/A', value: 1, color: '#d6d3d1' }]} />
        </ChartCard>
        <ChartCard title="Medicine Stock" subtitle="Inventory for treatments">
          <BarChart
            items={data.inventory
              .filter((i) => i.category === 'Medicine')
              .map((item) => ({
                label: item.name,
                value: item.quantity,
                color: item.quantity < item.minLevel
                  ? 'from-red-500 to-rose-600'
                  : 'from-emerald-500 to-teal-600',
              }))}
          />
        </ChartCard>
        <div className="lg:col-span-2">
          <ChartCard title="Recent Health Activity" subtitle="Latest record timeline">
            <LineChart
              points={healthTrend.length ? healthTrend : [0]}
              labels={monthlyHealth.length ? monthlyHealth : ['—']}
              color="#0d9488"
            />
          </ChartCard>
        </div>
        <div className="lg:col-span-2 grid grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatRing label="Healthy herd" value={`${healthyPct}%`} percent={healthyPct} color="#22c55e" />
          <StatRing label="Checkups due" value={data.checkups.filter((c) => c.status === 'Scheduled').length} percent={60} color="#3b82f6" />
          <StatRing label="Vaccines" value={data.vaccinations.length} percent={55} color="#6366f1" />
          <StatRing label="Active care" value={treatmentActive} percent={35} color="#f43f5e" />
        </div>
      </div>
    )
  }

  if (scope === 'farm-owner-performance') {
    const feedingTotal = data.feedingLogs.reduce((s, f) => s + f.quantityKg, 0)
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 w-full min-w-0">
        <div className="lg:col-span-2 rounded-2xl p-1 bg-gradient-to-r from-farm-600 via-emerald-500 to-teal-500">
          <div className="rounded-[14px] bg-white/95 p-4 grid grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-3xl font-display font-bold text-farm-800">{data.livestock.length}</p>
              <p className="text-xs font-semibold text-earth-600">Animals</p>
            </div>
            <div>
              <p className="text-3xl font-display font-bold text-emerald-700">
                {data.tasks.filter((t) => t.status === 'Completed').length}/{data.tasks.length}
              </p>
              <p className="text-xs font-semibold text-earth-600">Tasks Done</p>
            </div>
            <div>
              <p className="text-3xl font-display font-bold text-violet-700">{data.breedingRecords.length}</p>
              <p className="text-xs font-semibold text-earth-600">Breeding</p>
            </div>
            <div>
              <p className="text-3xl font-display font-bold text-amber-700">{Math.round(feedingTotal)}kg</p>
              <p className="text-xs font-semibold text-earth-600">Feed Logged</p>
            </div>
          </div>
        </div>
        <ChartCard title="Herd Status" subtitle="Livestock condition mix">
          <DonutChart segments={livestockStatus} />
        </ChartCard>
        <ChartCard title="Task Progress" subtitle="Farm operations">
          <DonutChart segments={taskStatus.length ? taskStatus : [{ label: 'None', value: 1, color: '#d6d3d1' }]} />
        </ChartCard>
        <ChartCard title="Production by Category" subtitle="Head count">
          <BarChart items={categoryBars} />
        </ChartCard>
        <ChartCard title="Breeding Outcomes" subtitle="Mated · Pregnant · Born">
          <DonutChart segments={breedingStatus.length ? breedingStatus : [{ label: 'N/A', value: 1, color: '#d6d3d1' }]} />
        </ChartCard>
        <div className="lg:col-span-2 grid grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatRing label="Healthy" value={`${healthyPct}%`} percent={healthyPct} color="#22c55e" />
          <StatRing label="Sick" value={data.livestock.filter((l) => l.status === 'Sick').length} percent={30} color="#ef4444" />
          <StatRing label="Pending tasks" value={data.tasks.filter((t) => t.status === 'Pending').length} percent={50} color="#f59e0b" />
          <StatRing label="Pregnant" value={data.livestock.filter((l) => l.status === 'Pregnant').length} percent={40} color="#ec4899" />
        </div>
      </div>
    )
  }

  if (scope === 'farm-owner-financials') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 w-full min-w-0">
        <div className="lg:col-span-2 rounded-2xl p-1 bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500">
          <div className="rounded-[14px] bg-white/95 p-6 flex flex-wrap justify-around gap-6 text-center">
            <div>
              <p className="text-sm text-earth-600">Revenue</p>
              <p className="text-4xl font-display font-bold text-emerald-700">${revenue.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-earth-600">Expenses</p>
              <p className="text-4xl font-display font-bold text-red-600">${expenses.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-earth-600">Net Profit</p>
              <p className="text-4xl font-display font-bold text-indigo-800">${(revenue - expenses).toLocaleString()}</p>
            </div>
          </div>
        </div>
        <ChartCard title="Revenue vs Expenses" subtitle="Profit & loss ($)">
          <BarChart
            items={[
              { label: 'Revenue', value: revenue, color: 'from-green-500 to-emerald-700' },
              { label: 'Expenses', value: expenses, color: 'from-orange-500 to-red-600' },
              {
                label: 'Net Profit',
                value: Math.max(0, revenue - expenses),
                color: 'from-indigo-500 to-violet-700',
              },
            ]}
          />
        </ChartCard>
        <ChartCard title="Expense Categories" subtitle="Top expense types">
          <BarChart
            items={data.financials
              .filter((f) => f.type === 'Expense')
              .slice(0, 6)
              .map((f, i) => ({
                label: f.category,
                value: f.amount,
                color: ['from-rose-500 to-red-600', 'from-amber-500 to-orange-600'][i % 2],
              }))}
          />
        </ChartCard>
        <div className="lg:col-span-2">
          <ChartCard title="Financial Trend" subtitle="Recent entries">
            <LineChart
              points={finTrend.points.length ? finTrend.points : [0]}
              labels={finTrend.labels.length ? finTrend.labels : ['—']}
              color="#059669"
            />
          </ChartCard>
        </div>
      </div>
    )
  }

  if (scope === 'farm-owner') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 w-full min-w-0">
        <ChartCard title="Profit Overview" subtitle="Owner financial snapshot">
          <BarChart
            items={[
              { label: 'Revenue', value: revenue, color: 'from-green-500 to-emerald-700' },
              { label: 'Expenses', value: expenses, color: 'from-orange-500 to-red-600' },
              {
                label: 'Net',
                value: Math.max(0, revenue - expenses),
                color: 'from-indigo-500 to-violet-700',
              },
            ]}
          />
        </ChartCard>
        <ChartCard title="Livestock Portfolio" subtitle="Animals by category">
          <DonutChart segments={categoryBars.map((c, i) => ({
            label: c.label,
            value: c.value,
            color: ['#22c55e', '#0ea5e9', '#a855f7', '#f97316'][i % 4],
          }))} />
        </ChartCard>
        <ChartCard title="Breeding Statistics" subtitle="Reproductive outcomes">
          <DonutChart segments={breedingStatus.length ? breedingStatus : [{ label: 'N/A', value: 1, color: '#d6d3d1' }]} />
        </ChartCard>
        <ChartCard title="Farm Alerts" subtitle="Notifications by type">
          <DonutChart segments={notifyTypes.length ? notifyTypes : [{ label: 'None', value: 1, color: '#d6d3d1' }]} />
        </ChartCard>
        <div className="lg:col-span-2">
          <ChartCard title="Performance Trend" subtitle="Recent financial movement">
            <LineChart points={finTrend.points.length ? finTrend.points : [0]} labels={finTrend.labels.length ? finTrend.labels : ['—']} color="#059669" />
          </ChartCard>
        </div>
      </div>
    )
  }

  // super-admin
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 w-full min-w-0">
      <ChartCard title="System Livestock Mix" subtitle="All categories">
        <BarChart items={categoryBars} />
      </ChartCard>
      <ChartCard title="Global Financials" subtitle="Farm-wide $">
        <BarChart
          items={[
            { label: 'Revenue', value: revenue, color: 'from-emerald-500 to-teal-600' },
            { label: 'Expenses', value: expenses, color: 'from-red-500 to-pink-600' },
          ]}
        />
      </ChartCard>
      <ChartCard title="Operations Overview" subtitle="Tasks + breeding + health">
        <DonutChart
          segments={[
            { label: 'Tasks', value: data.tasks.length, color: '#3b82f6' },
            { label: 'Breeding', value: data.breedingRecords.length, color: '#ec4899' },
            { label: 'Health', value: data.healthRecords.length, color: '#14b8a6' },
          ]}
        />
      </ChartCard>
      <ChartCard title="Inventory Health" subtitle="Stock quantities">
        <BarChart items={inventoryBars} />
      </ChartCard>
      <div className="lg:col-span-2">
        <ChartCard title="Herd Status" subtitle="System-wide">
          <DonutChart segments={livestockStatus} size={180} />
        </ChartCard>
      </div>
    </div>
  )
}

