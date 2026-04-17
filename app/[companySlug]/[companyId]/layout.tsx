import { notFound } from 'next/navigation'
import Sidebar from '@/components/layout/sidebar'
import { getCompanyBySlugAndId, MOCK_USERS } from '@/lib/mock-data'

interface Props {
  children: React.ReactNode
  params: { companySlug: string; companyId: string }
}

export default function CompanyLayout({ children, params }: Props) {
  const company = getCompanyBySlugAndId(params.companySlug, params.companyId)
  if (!company) notFound()

  const adminUser = MOCK_USERS.find((u) => u.company_id === params.companyId && u.role === 'admin')

  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      <Sidebar
        companyName={company.name}
        companySlug={params.companySlug}
        companyId={params.companyId}
        userRole={adminUser?.role ?? 'admin'}
        userName={adminUser?.full_name ?? 'Admin'}
        userEmail={adminUser?.email ?? 'admin@company.com'}
      />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
