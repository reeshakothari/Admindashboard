'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Users, BarChart3, Settings, LogOut, Building2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { UserRole } from '@/lib/supabase/types'

interface SidebarProps {
  companyName: string
  companySlug: string
  userRole: UserRole
  userName: string
  userEmail: string
}

export default function Sidebar({ companyName, companySlug, userRole, userName, userEmail }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const base = `/${companySlug}`

  const navItems = [
    { href: base, icon: LayoutDashboard, label: 'Dashboard', roles: ['super_admin', 'admin', 'client'] },
    { href: `${base}/metrics`, icon: BarChart3, label: 'Metrics', roles: ['super_admin', 'admin', 'client'] },
    { href: `${base}/users`, icon: Users, label: 'Users', roles: ['super_admin', 'admin'] },
    { href: `${base}/settings`, icon: Settings, label: 'Settings', roles: ['super_admin', 'admin'] },
  ].filter(item => item.roles.includes(userRole))

  const initials = (userName || userEmail)[0]?.toUpperCase() ?? '?'

  return (
    <aside className="w-64 bg-[#0a0a0f] border-r border-gray-800 min-h-screen flex flex-col shrink-0">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-white font-semibold text-sm truncate">{companyName}</p>
            <p className="text-gray-500 text-xs capitalize">{userRole.replace('_', ' ')}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                isActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center shrink-0">
            <span className="text-gray-300 text-xs font-medium">{initials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-gray-200 text-xs font-medium truncate">{userName || userEmail}</p>
            <p className="text-gray-500 text-xs truncate">{userEmail}</p>
          </div>
        </div>
        <button onClick={() => router.push('/admin')}
          className="flex items-center gap-2 text-gray-500 hover:text-white text-sm w-full px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors">
          <LogOut className="w-4 h-4" />
          Back to platform
        </button>
      </div>
    </aside>
  )
}
