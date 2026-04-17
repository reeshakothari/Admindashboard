import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

interface Props {
  params: { companySlug: string; companyId: string }
}

export default async function SettingsPage({ params }: Props) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || !['admin', 'super_admin'].includes(profile.role)) {
    redirect(`/${params.companySlug}/${params.companyId}/dashboard`)
  }

  const { data: company } = await supabase
    .from('companies')
    .select('*')
    .eq('id', params.companyId)
    .single()

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Company configuration and access details</p>
      </div>

      <div className="max-w-2xl space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Company Info</h2>
          <dl className="space-y-4">
            {[
              { label: 'Company Name', value: company?.name, mono: false },
              { label: 'Slug', value: company?.slug, mono: true },
              { label: 'Company ID', value: company?.id, mono: true },
            ].map(({ label, value, mono }) => (
              <div key={label}>
                <dt className="text-xs font-medium text-gray-500 mb-1">{label}</dt>
                <dd className={`text-sm text-gray-900 ${mono ? 'font-mono' : 'font-medium'}`}>
                  {value}
                </dd>
              </div>
            ))}
            <div>
              <dt className="text-xs font-medium text-gray-500 mb-1">Status</dt>
              <dd>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  company?.is_active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'
                }`}>
                  {company?.is_active ? 'Active' : 'Inactive'}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500 mb-1">Created</dt>
              <dd className="text-sm text-gray-600">
                {company?.created_at ? new Date(company.created_at).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric'
                }) : '—'}
              </dd>
            </div>
          </dl>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Dashboard URL</h2>
          <div className="bg-gray-50 rounded-lg px-4 py-3 font-mono text-sm text-blue-700 break-all">
            /{company?.slug}/{company?.id}/dashboard
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Share this URL with users to access your company dashboard directly.
          </p>
        </div>
      </div>
    </div>
  )
}
