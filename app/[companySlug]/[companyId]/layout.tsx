import { notFound } from 'next/navigation'
import Sidebar from '@/components/layout/sidebar'
import { getCompanyBySlugAndId } from '@/lib/mock-data'

interface Props {
  children: React.ReactNode
  params: { companySlug: string; companyId: string }
}

export default function CompanyLayout({ children, params }: Props) {
  const company = getCompanyBySlugAndId(params.companySlug, params.companyId)
  if (!company) notFound()

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        companyName={company.name}
        companySlug={params.companySlug}
        companyId={params.companyId}
        userRole="admin"
        userName="John Smith"
        userEmail="admin@company.com"
      />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
