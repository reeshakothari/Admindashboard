import { Building2, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { MOCK_COMPANIES } from '@/lib/mock-data'
import CreateCompanyForm from '@/components/super-admin/create-company-form'

export default function CompaniesPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
        <p className="text-gray-500 mt-1">Onboard and manage all companies</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="p-6 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">All Companies ({MOCK_COMPANIES.length})</h2>
            </div>
            <div className="divide-y divide-gray-50">
              {MOCK_COMPANIES.map((company) => (
                <div key={company.id} className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900">{company.name}</p>
                      <p className="text-xs text-gray-400 font-mono truncate">/{company.slug}/{company.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      company.is_active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {company.is_active ? 'Active' : 'Inactive'}
                    </span>
                    <Link
                      href={`/${company.slug}/${company.id}/dashboard`}
                      className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Open
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <CreateCompanyForm />
        </div>
      </div>
    </div>
  )
}
