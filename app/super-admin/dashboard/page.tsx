import { createClient } from '@/lib/supabase/server'
import MetricCard from '@/components/dashboard/metric-card'
import { Building2, Users, BarChart3, Activity } from 'lucide-react'
import Link from 'next/link'

export default async function SuperAdminDashboard() {
  const supabase = await createClient()

  const [
    { count: companiesCount },
    { count: usersCount },
    { count: metricsCount },
    { data: recentCompanies },
  ] = await Promise.all([
    supabase.from('companies').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('metrics').select('*', { count: 'exact', head: true }),
    supabase.from('companies').select('*').order('created_at', { ascending: false }).limit(5),
  ])

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Platform Overview</h1>
        <p className="text-gray-500 mt-1">Manage all companies and users across the platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard title="Companies" value={String(companiesCount ?? 0)} icon={Building2} color="purple" />
        <MetricCard title="Total Users" value={String(usersCount ?? 0)} icon={Users} color="blue" />
        <MetricCard title="Metrics Logged" value={String(metricsCount ?? 0)} icon={BarChart3} color="green" />
        <MetricCard title="Platform Status" value="Active" icon={Activity} color="orange" />
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Recent Companies</h2>
          <Link href="/super-admin/companies" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
            View all →
          </Link>
        </div>
        <div className="divide-y divide-gray-50">
          {recentCompanies?.map((company) => (
            <div key={company.id} className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{company.name}</p>
                  <p className="text-xs text-gray-400 font-mono">
                    /{company.slug}/{company.id.slice(0, 8)}…
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  company.is_active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'
                }`}>
                  {company.is_active ? 'Active' : 'Inactive'}
                </span>
                <Link
                  href={`/${company.slug}/${company.id}/dashboard`}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  View →
                </Link>
              </div>
            </div>
          ))}
          {(!recentCompanies || recentCompanies.length === 0) && (
            <div className="px-6 py-12 text-center text-gray-500 text-sm">
              No companies yet.{' '}
              <Link href="/super-admin/companies" className="text-purple-600 font-medium">
                Create one →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
