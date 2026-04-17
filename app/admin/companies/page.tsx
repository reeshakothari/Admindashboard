import { Building2, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { MOCK_COMPANIES } from '@/lib/mock-data'
import CreateCompanyForm from '@/components/super-admin/create-company-form'

export default function CompaniesPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Companies</h1>
        <p className="text-gray-400 mt-1">Onboard and manage all companies</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-gray-900 rounded-xl border border-gray-800">
            <div className="p-6 border-b border-gray-800">
              <h2 className="font-semibold text-white">All Companies ({MOCK_COMPANIES.length})</h2>
            </div>
            <div className="divide-y divide-gray-800">
              {MOCK_COMPANIES.map((company) => (
                <div key={company.id} className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{company.name}</p>
                      <p className="text-xs text-gray-500 font-mono">/{company.slug}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      company.is_active ? 'bg-green-500/10 text-green-400' : 'bg-gray-700 text-gray-400'
                    }`}>
                      {company.is_active ? 'Active' : 'Inactive'}
                    </span>
                    <Link href={`/${company.slug}`} className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-medium">
                      <ExternalLink className="w-3 h-3" /> Open
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div><CreateCompanyForm /></div>
      </div>
    </div>
  )
}
