import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import SuperAdminSidebar from '@/components/layout/super-admin-sidebar'

export default async function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'super_admin') redirect('/login')

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SuperAdminSidebar
        userName={profile.full_name ?? ''}
        userEmail={profile.email}
      />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
