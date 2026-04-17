import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Sidebar from '@/components/layout/sidebar'

interface Props {
  children: React.ReactNode
  params: { companySlug: string; companyId: string }
}

export default async function CompanyLayout({ children, params }: Props) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!profile) redirect('/login')

  // Non-super-admins can only access their own company
  if (profile.role !== 'super_admin' && profile.company_id !== params.companyId) {
    redirect('/login')
  }

  const { data: company } = await supabase
    .from('companies')
    .select('*')
    .eq('id', params.companyId)
    .eq('slug', params.companySlug)
    .single()

  if (!company) redirect('/login')

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        companyName={company.name}
        companySlug={params.companySlug}
        companyId={params.companyId}
        userRole={profile.role}
        userName={profile.full_name ?? ''}
        userEmail={profile.email}
      />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
