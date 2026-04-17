import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import AddUserForm from '@/components/users/add-user-form'

interface Props {
  params: { companySlug: string; companyId: string }
}

export default async function UsersPage({ params }: Props) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: currentProfile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!currentProfile || !['admin', 'super_admin'].includes(currentProfile.role)) {
    redirect(`/${params.companySlug}/${params.companyId}/dashboard`)
  }

  const { data: users } = await supabase
    .from('profiles')
    .select('*')
    .eq('company_id', params.companyId)
    .order('created_at', { ascending: false })

  const roleColors: Record<string, string> = {
    admin: 'bg-blue-50 text-blue-700',
    client: 'bg-gray-100 text-gray-600',
    super_admin: 'bg-purple-50 text-purple-700',
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <p className="text-gray-500 mt-1">Manage your organization's members</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">
                Team Members ({users?.length ?? 0})
              </h2>
            </div>
            <div className="divide-y divide-gray-50">
              {users?.map((u) => (
                <div key={u.id} className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-gray-600 text-sm font-medium">
                        {(u.full_name || u.email)[0]?.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{u.full_name || '—'}</p>
                      <p className="text-xs text-gray-500">{u.email}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${roleColors[u.role] ?? ''}`}>
                    {u.role}
                  </span>
                </div>
              ))}
              {(!users || users.length === 0) && (
                <div className="px-6 py-12 text-center text-gray-500 text-sm">No users yet</div>
              )}
            </div>
          </div>
        </div>

        <div>
          <AddUserForm companyId={params.companyId} />
        </div>
      </div>
    </div>
  )
}
