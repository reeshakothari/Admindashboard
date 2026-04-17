'use client'

import { useState } from 'react'

export default function CreateCompanyForm() {
  const [name, setName] = useState('')
  const [adminFullName, setAdminFullName] = useState('')
  const [adminEmail, setAdminEmail] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [success, setSuccess] = useState('')

  function generateSlug(n: string) {
    return n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await new Promise((r) => setTimeout(r, 800))
    const slug = generateSlug(name)
    const mockId = '550e8400-xxxx-' + Date.now()
    setSuccess(`Created! URL: /${slug}/${mockId}/dashboard (preview mode)`)
    setName('')
    setAdminFullName('')
    setAdminEmail('')
    setAdminPassword('')
    setTimeout(() => setSuccess(''), 5000)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="font-semibold text-gray-900 mb-1">Create Company</h2>
      <p className="text-xs text-gray-500 mb-4">Onboard a new company with an admin account</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Company Name *</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Acme Corp" />
          {name && (
            <p className="text-xs text-gray-400 mt-1 font-mono">slug: /{generateSlug(name)}</p>
          )}
        </div>

        <div className="border-t border-gray-100 pt-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Admin Account</p>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" value={adminFullName} onChange={(e) => setAdminFullName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Email *</label>
              <input type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} required
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="admin@company.com" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Password *</label>
              <input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} required minLength={6}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Min. 6 characters" />
            </div>
          </div>
        </div>

        {success && (
          <div className="bg-green-50 border border-green-100 text-green-700 text-xs px-3 py-2 rounded-lg break-all">
            {success}
          </div>
        )}

        <button type="submit"
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
          Create Company
        </button>
      </form>
    </div>
  )
}
