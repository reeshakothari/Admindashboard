import MetricCard from '@/components/dashboard/metric-card'
import { Building2, Users, BarChart3, Activity } from 'lucide-react'
import Link from 'next/link'
import { MOCK_COMPANIES, MOCK_USERS, MOCK_METRICS } from '@/lib/mock-data'

export default function SuperAdminDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Platform Overview</h1>
        <p className="text-gray-400 mt-1">Manage all companies and users across the platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard title="Companies" value={String(MOCK_COMPANIES.length)} icon={Building2} color="purple" />
        <MetricCard title="Total Users" value={String(MOCK_USERS.length)} icon={Users} color="blue" />
        <MetricCard title="Metrics Logged" value={String(MOCK_METRICS.length)} icon={BarChart3} color="green" />
        <MetricCard title="Platform Status" value="Active" icon={Activity} color="orange" />
      </div>

      <div className="bg-gray-900 rounded-xl border border-gray-800">
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <h2 className="font-semibold text-white">Companies</h2>
          <Link href="/super-admin/companies" className="text-sm text-purple-400 hover:text-purple-300 font-medium">
            View all →
          </Link>
        </div>
        <div className="divide-y divide-gray-800">
          {MOCK_COMPANIES.map((company) => (
            <div key={company.id} className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{company.name}</p>
                  <p className="text-xs text-gray-500 font-mono">/{company.slug}/{company.id.slice(0, 8)}…</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  company.is_active ? 'bg-green-500/10 text-green-400' : 'bg-gray-700 text-gray-400'
                }`}>
                  {company.is_active ? 'Active' : 'Inactive'}
                </span>
                <Link href={`/${company.slug}/${company.id}/dashboard`}
                  className="text-xs text-blue-400 hover:text-blue-300 font-medium">
                  View →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
