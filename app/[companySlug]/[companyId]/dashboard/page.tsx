import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import MetricCard from '@/components/dashboard/metric-card'
import { Users, BarChart3, TrendingUp, Activity } from 'lucide-react'

interface Props {
  params: { companySlug: string; companyId: string }
}

export default async function DashboardPage({ params }: Props) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [{ data: company }, { data: metrics }, { data: members }] = await Promise.all([
    supabase.from('companies').select('*').eq('id', params.companyId).single(),
    supabase
      .from('metrics')
      .select('*')
      .eq('company_id', params.companyId)
      .order('recorded_at', { ascending: false })
      .limit(20),
    supabase.from('profiles').select('id, role').eq('company_id', params.companyId),
  ])

  const totalMembers = members?.length ?? 0
  const totalMetrics = metrics?.length ?? 0
  const latestValue = metrics?.[0]?.metric_value ?? 0
  const categories = [...new Set(metrics?.map((m) => m.category).filter(Boolean))]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{company?.name}</h1>
        <p className="text-gray-500 mt-1">Company overview and recent activity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Team Members"
          value={String(totalMembers)}
          icon={Users}
          color="blue"
        />
        <MetricCard
          title="Total Metrics"
          value={String(totalMetrics)}
          icon={BarChart3}
          color="green"
        />
        <MetricCard
          title="Latest Value"
          value={String(latestValue)}
          icon={TrendingUp}
          color="purple"
          subtitle={metrics?.[0]?.metric_name ?? ''}
        />
        <MetricCard
          title="Status"
          value={company?.is_active ? 'Active' : 'Inactive'}
          icon={Activity}
          color={company?.is_active ? 'green' : 'red'}
        />
      </div>

      {categories.length > 0 && (
        <div className="flex gap-2 mb-6 flex-wrap">
          <span className="text-xs text-gray-500 self-center">Categories:</span>
          {categories.map((cat) => (
            <span key={cat} className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
              {cat}
            </span>
          ))}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Recent Metrics</h2>
        </div>
        {metrics && metrics.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left py-3 px-6 font-medium text-gray-500">Metric</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500">Value</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500">Category</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {metrics.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50">
                    <td className="py-3 px-6 font-medium text-gray-900">{m.metric_name}</td>
                    <td className="py-3 px-6 text-gray-700">{m.metric_value}</td>
                    <td className="py-3 px-6">
                      {m.category ? (
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">{m.category}</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="py-3 px-6 text-gray-500">
                      {new Date(m.recorded_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <BarChart3 className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">No metrics recorded yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
