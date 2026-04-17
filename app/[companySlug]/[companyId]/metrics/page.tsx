import { notFound } from 'next/navigation'
import { BarChart3 } from 'lucide-react'
import { getCompanyBySlugAndId, getMetricsByCompany } from '@/lib/mock-data'

interface Props {
  params: { companySlug: string; companyId: string }
}

export default function MetricsPage({ params }: Props) {
  const company = getCompanyBySlugAndId(params.companySlug, params.companyId)
  if (!company) notFound()

  const metrics = getMetricsByCompany(params.companyId)
  const categories = [...new Set(metrics.map((m) => m.category).filter(Boolean))]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Metrics</h1>
        <p className="text-gray-500 mt-1">All recorded metrics for your organization</p>
      </div>

      {categories.length > 0 && (
        <div className="flex gap-2 mb-6 flex-wrap">
          {categories.map((cat) => (
            <span key={cat} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">{cat}</span>
          ))}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">All Metrics ({metrics.length})</h2>
        </div>
        {metrics.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left py-3 px-6 font-medium text-gray-500">Name</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500">Value</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500">Label</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500">Category</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-500">Recorded</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {metrics.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50">
                    <td className="py-3 px-6 font-medium text-gray-900">{m.metric_name}</td>
                    <td className="py-3 px-6 text-gray-700 font-mono">{m.metric_value}</td>
                    <td className="py-3 px-6 text-gray-500">{m.metric_label ?? '—'}</td>
                    <td className="py-3 px-6">
                      {m.category ? (
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">{m.category}</span>
                      ) : '—'}
                    </td>
                    <td className="py-3 px-6 text-gray-500">{new Date(m.recorded_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-16 text-center">
            <BarChart3 className="w-12 h-12 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">No metrics recorded yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
