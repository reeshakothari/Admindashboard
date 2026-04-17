import { notFound } from 'next/navigation'
import AddUserForm from '@/components/users/add-user-form'
import { getCompanyBySlug, getUsersByCompany } from '@/lib/mock-data'

interface Props {
  params: { companySlug: string }
}

export default function UsersPage({ params }: Props) {
  const company = getCompanyBySlug(params.companySlug)
  if (!company) notFound()

  const users = getUsersByCompany(company.id)
  const roleColors: Record<string, string> = {
    admin: 'bg-blue-500/10 text-blue-400',
    client: 'bg-gray-700 text-gray-400',
    super_admin: 'bg-purple-500/10 text-purple-400',
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Users</h1>
        <p className="text-gray-400 mt-1">Manage your organization's members</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-gray-900 rounded-xl border border-gray-800">
            <div className="p-6 border-b border-gray-800">
              <h2 className="font-semibold text-white">Team Members ({users.length})</h2>
            </div>
            <div className="divide-y divide-gray-800">
              {users.map((u) => (
                <div key={u.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-800/50">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-gray-300 text-sm font-medium">{(u.full_name || u.email)[0]?.toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{u.full_name || '—'}</p>
                      <p className="text-xs text-gray-500">{u.email}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${roleColors[u.role] ?? ''}`}>{u.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div><AddUserForm companyId={company.id} /></div>
      </div>
    </div>
  )
}
