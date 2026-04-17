import { MOCK_USERS, MOCK_COMPANIES } from '@/lib/mock-data'

export default function AllUsersPage() {
  const roleColors: Record<string, string> = {
    super_admin: 'bg-purple-500/10 text-purple-400',
    admin: 'bg-blue-500/10 text-blue-400',
    client: 'bg-gray-700 text-gray-400',
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">All Users</h1>
        <p className="text-gray-400 mt-1">Every user across all companies</p>
      </div>

      <div className="bg-gray-900 rounded-xl border border-gray-800">
        <div className="p-6 border-b border-gray-800">
          <h2 className="font-semibold text-white">Users ({MOCK_USERS.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800 bg-gray-800/50">
                <th className="text-left py-3 px-6 font-medium text-gray-400">User</th>
                <th className="text-left py-3 px-6 font-medium text-gray-400">Role</th>
                <th className="text-left py-3 px-6 font-medium text-gray-400">Company</th>
                <th className="text-left py-3 px-6 font-medium text-gray-400">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {MOCK_USERS.map((u) => {
                const company = MOCK_COMPANIES.find((c) => c.id === u.company_id)
                return (
                  <tr key={u.id} className="hover:bg-gray-800/50">
                    <td className="py-3 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center shrink-0">
                          <span className="text-gray-300 text-xs font-medium">{(u.full_name || u.email)[0]?.toUpperCase()}</span>
                        </div>
                        <div>
                          <p className="font-medium text-white">{u.full_name || '—'}</p>
                          <p className="text-xs text-gray-500">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-6">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${roleColors[u.role] ?? ''}`}>{u.role}</span>
                    </td>
                    <td className="py-3 px-6 text-gray-400">{company?.name ?? '—'}</td>
                    <td className="py-3 px-6 text-gray-500">{new Date(u.created_at).toLocaleDateString()}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
