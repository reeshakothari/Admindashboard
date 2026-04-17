'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Building2, Shield, Users, Eye } from 'lucide-react'
import { MOCK_COMPANIES } from '@/lib/mock-data'

type PreviewRole = 'super_admin' | 'admin' | 'client'

const PREVIEW_ACCOUNTS = [
  {
    role: 'super_admin' as PreviewRole,
    label: 'Super Admin',
    description: 'Manage all companies & users',
    email: 'superadmin@platform.com',
    icon: Shield,
    color: 'border-purple-200 bg-purple-50 hover:border-purple-400',
    activeColor: 'border-purple-500 bg-purple-50 ring-2 ring-purple-200',
    iconColor: 'text-purple-600',
    badge: 'bg-purple-100 text-purple-700',
  },
  {
    role: 'admin' as PreviewRole,
    label: 'Admin',
    description: 'Manage company users & data',
    email: 'admin@acme.com',
    icon: Users,
    color: 'border-blue-200 bg-blue-50 hover:border-blue-400',
    activeColor: 'border-blue-500 bg-blue-50 ring-2 ring-blue-200',
    iconColor: 'text-blue-600',
    badge: 'bg-blue-100 text-blue-700',
  },
  {
    role: 'client' as PreviewRole,
    label: 'Client',
    description: 'View company dashboard only',
    email: 'alice@acme.com',
    icon: Eye,
    color: 'border-gray-200 bg-gray-50 hover:border-gray-400',
    activeColor: 'border-gray-500 bg-gray-50 ring-2 ring-gray-200',
    iconColor: 'text-gray-600',
    badge: 'bg-gray-100 text-gray-700',
  },
]

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<PreviewRole>('super_admin')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const defaultCompany = MOCK_COMPANIES[0]

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 700))

    if (selectedRole === 'super_admin') {
      router.push('/super-admin/dashboard')
    } else {
      router.push(`/${defaultCompany.slug}/${defaultCompany.id}/dashboard`)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm">Choose a role to preview</p>
          </div>
        </div>

        {/* Role Selector */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
            Sign in as
          </p>
          <div className="space-y-2">
            {PREVIEW_ACCOUNTS.map((account) => {
              const Icon = account.icon
              const isSelected = selectedRole === account.role
              return (
                <button
                  key={account.role}
                  type="button"
                  onClick={() => setSelectedRole(account.role)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                    isSelected ? account.activeColor : account.color
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center bg-white border border-gray-100 shrink-0`}>
                    <Icon className={`w-4 h-4 ${account.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-gray-900">{account.label}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${account.badge}`}>
                        {account.role}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{account.description}</p>
                  </div>
                  {isSelected && (
                    <div className="w-4 h-4 rounded-full bg-current flex items-center justify-center shrink-0">
                      <div className={`w-4 h-4 rounded-full ${account.iconColor.replace('text-', 'bg-')}`} />
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        <form onSubmit={handleLogin}>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading
              ? 'Signing in…'
              : `Continue as ${PREVIEW_ACCOUNTS.find(a => a.role === selectedRole)?.label}`}
          </button>
        </form>

        <p className="text-xs text-center text-gray-400 mt-4">
          Frontend preview — no credentials required
        </p>
      </div>
    </div>
  )
}
