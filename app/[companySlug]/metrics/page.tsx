import { notFound } from 'next/navigation'
import { BarChart3 } from 'lucide-react'
import { getCompanyBySlug, getMetricsByCompany } from '@/lib/mock-data'

interface Props {
  params: { companySlug: string }
}

export default function MetricsPage({ params }: Props) {
  const company = getCompanyBySlug(params.companySlug)
  if (!company) notFound()

  const metrics = getMetricsByCompany(company.id)
  const categories = [...new Set(metrics.map((m) => m.category).filter(Boolean))]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Metrics</h1>
        <p className="text-gray-400 mt-1">All recorded metrics for your organization</p>
      </div>

      {categories.length > 0 && (
        <div className="flex gap-2 mb-6 flex-wrap">
          {categories.map((cat) => (
            <span key={cat} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">{cat}</span>
          ))}
        </div>
      )}

      <div className="bg-gray-900 rounded-xl border border-gray-800">
        <div className="p-6 border-b border-gray-800">
          <h2 className="font-semibold text-white">All Metrics ({metrics.length})</h2>
        </div>
        {metrics.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800 bg-gray-800/50">
                  <th className="text-left py-3 px-6 font-medium text-gray-400">Name</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-400">Value</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-400">Label</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-400">Category</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-400">Recorded</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {metrics.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-800/50">
                    <td className="py-3 px-6 font-medium text-white">{m.metric_name}</td>
                    <td className="py-3 px-6 text-gray-300 font-mono">{m.metric_value}</td>
                    <td className="py-3 px-6 text-gray-500">{m.metric_label ?? '—'}</td>
                    <td className="py-3 px-6">
                      {m.category ? <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded text-xs">{m.category}</span> : '—'}
                    </td>
                    <td className="py-3 px-6 text-gray-500">{new Date(m.recorded_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-16 text-center">
            <BarChart3 className="w-12 h-12 text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">No metrics recorded yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
