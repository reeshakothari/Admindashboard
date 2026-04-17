import { createClient } from '@/lib/supabase/server'

export default async function AllUsersPage() {
  const supabase = await createClient()

  const { data: users } = await supabase
    .from('profiles')
    .select('*, companies(name)')
    .order('created_at', { ascending: false })

  const roleColors: Record<string, string> = {
    super_admin: 'bg-purple-50 text-purple-700',
    admin: 'bg-blue-50 text-blue-700',
    client: 'bg-gray-100 text-gray-600',
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">All Users</h1>
        <p className="text-gray-500 mt-1">Every user across all companies</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Users ({users?.length ?? 0})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left py-3 px-6 font-medium text-gray-500">User</th>
                <th className="text-left py-3 px-6 font-medium text-gray-500">Role</th>
                <th className="text-left py-3 px-6 font-medium text-gray-500">Company</th>
                <th className="text-left py-3 px-6 font-medium text-gray-500">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users?.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="py-3 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-gray-600 text-xs font-medium">
                          {(u.full_name || u.email)[0]?.toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{u.full_name || '—'}</p>
                        <p className="text-xs text-gray-500">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-6">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${roleColors[u.role] ?? ''}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-gray-600">
                    {(u.companies as { name: string } | null)?.name ?? '—'}
                  </td>
                  <td className="py-3 px-6 text-gray-500">
                    {new Date(u.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!users || users.length === 0) && (
            <div className="p-12 text-center text-gray-500 text-sm">No users found</div>
          )}
        </div>
      </div>
    </div>
  )
}
