import SuperAdminSidebar from '@/components/layout/super-admin-sidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      <SuperAdminSidebar userName="Super Admin" userEmail="superadmin@platform.com" />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
