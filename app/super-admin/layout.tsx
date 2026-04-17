import SuperAdminSidebar from '@/components/layout/super-admin-sidebar'

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SuperAdminSidebar userName="Super Admin" userEmail="superadmin@platform.com" />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
