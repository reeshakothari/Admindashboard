import { notFound } from 'next/navigation'
import MetricCard from '@/components/dashboard/metric-card'
import { Users, BarChart3, TrendingUp, Activity } from 'lucide-react'
import { getCompanyBySlugAndId, getUsersByCompany, getMetricsByCompany } from '@/lib/mock-data'

interface Props {
  params: { companySlug: string; companyId: string }
}

export default function DashboardPage({ params }: Props) {
  const company = getCompanyBySlugAndId(params.companySlug, params.companyId)
  if (!company) notFound()

  const members = getUsersByCompany(params.companyId)
  const metrics = getMetricsByCompany(params.companyId)
  const categories = [...new Set(metrics.map((m) => m.category).filter(Boolean))]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">{company.name}</h1>
        <p className="text-gray-400 mt-1">Company overview and recent activity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard title="Team Members" value={String(members.length)} icon={Users} color="blue" />
        <MetricCard title="Total Metrics" value={String(metrics.length)} icon={BarChart3} color="green" />
        <MetricCard title="Latest Value" value={String(metrics[0]?.metric_value ?? 0)} icon={TrendingUp} color="purple" subtitle={metrics[0]?.metric_name ?? ''} />
        <MetricCard title="Status" value={company.is_active ? 'Active' : 'Inactive'} icon={Activity} color={company.is_active ? 'green' : 'red'} />
      </div>

      {categories.length > 0 && (
        <div className="flex gap-2 mb-6 flex-wrap">
          <span className="text-xs text-gray-500 self-center">Categories:</span>
          {categories.map((cat) => (
            <span key={cat} className="px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-medium">{cat}</span>
          ))}
        </div>
      )}

      <div className="bg-gray-900 rounded-xl border border-gray-800">
        <div className="p-6 border-b border-gray-800">
          <h2 className="font-semibold text-white">Recent Metrics</h2>
        </div>
        {metrics.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-800/50">
                  <th className="text-left py-3 px-6 font-medium text-gray-400">Metric</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-400">Value</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-400">Category</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-400">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {metrics.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-800/50">
                    <td className="py-3 px-6 font-medium text-white">{m.metric_name}</td>
                    <td className="py-3 px-6 text-gray-300">{m.metric_value} <span className="text-gray-500 text-xs">{m.metric_label}</span></td>
                    <td className="py-3 px-6">
                      {m.category ? <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded text-xs">{m.category}</span> : '—'}
                    </td>
                    <td className="py-3 px-6 text-gray-500">{new Date(m.recorded_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <BarChart3 className="w-10 h-10 text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No metrics recorded yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
