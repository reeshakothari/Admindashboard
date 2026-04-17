import { notFound } from 'next/navigation'
import { getCompanyBySlug } from '@/lib/mock-data'

interface Props {
  params: { companySlug: string }
}

export default function SettingsPage({ params }: Props) {
  const company = getCompanyBySlug(params.companySlug)
  if (!company) notFound()

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 mt-1">Company configuration and access details</p>
      </div>

      <div className="max-w-2xl space-y-6">
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h2 className="font-semibold text-white mb-4">Company Info</h2>
          <dl className="space-y-4">
            {[
              { label: 'Company Name', value: company.name, mono: false },
              { label: 'Slug', value: company.slug, mono: true },
              { label: 'Company ID', value: company.id, mono: true },
            ].map(({ label, value, mono }) => (
              <div key={label}>
                <dt className="text-xs font-medium text-gray-500 mb-1">{label}</dt>
                <dd className={`text-sm text-gray-200 ${mono ? 'font-mono' : 'font-medium'}`}>{value}</dd>
              </div>
            ))}
            <div>
              <dt className="text-xs font-medium text-gray-500 mb-1">Status</dt>
              <dd>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  company.is_active ? 'bg-green-500/10 text-green-400' : 'bg-gray-700 text-gray-400'
                }`}>
                  {company.is_active ? 'Active' : 'Inactive'}
                </span>
              </dd>
            </div>
          </dl>
        </div>

        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
          <h2 className="font-semibold text-white mb-4">Dashboard URL</h2>
          <div className="bg-gray-800 rounded-lg px-4 py-3 font-mono text-sm text-blue-400 break-all">
            /{company.slug}
          </div>
          <p className="text-xs text-gray-500 mt-2">Share this URL to access the company dashboard directly.</p>
        </div>
      </div>
    </div>
  )
}
