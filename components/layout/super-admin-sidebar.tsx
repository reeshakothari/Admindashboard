'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Building2, Users, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  userName: string
  userEmail: string
}

export default function SuperAdminSidebar({ userName, userEmail }: Props) {
  const pathname = usePathname()

  const navItems = [
    { href: '/super-admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/super-admin/companies', icon: Building2, label: 'Companies' },
    { href: '/super-admin/users', icon: Users, label: 'All Users' },
  ]

  const initials = (userName || userEmail)[0]?.toUpperCase() ?? '?'

  return (
    <aside className="w-64 bg-[#0a0a0f] border-r border-gray-800 min-h-screen flex flex-col shrink-0">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-purple-600 rounded-lg flex items-center justify-center shrink-0">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Super Admin</p>
            <p className="text-gray-500 text-xs">Platform Control</p>
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
                isActive ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center shrink-0">
            <span className="text-purple-300 text-xs font-medium">{initials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-gray-200 text-xs font-medium truncate">{userName || userEmail}</p>
            <p className="text-gray-500 text-xs truncate">{userEmail}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
