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
    setSuccess(`Created! URL: /${slug}/mock-id/dashboard (preview mode)`)
    setName(''); setAdminFullName(''); setAdminEmail(''); setAdminPassword('')
    setTimeout(() => setSuccess(''), 5000)
  }

  const inputClass = "w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
      <h2 className="font-semibold text-white mb-1">Create Company</h2>
      <p className="text-xs text-gray-500 mb-4">Onboard a new company with an admin account</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">Company Name *</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className={inputClass} placeholder="Acme Corp" />
          {name && <p className="text-xs text-gray-500 mt-1 font-mono">slug: /{generateSlug(name)}</p>}
        </div>
        <div className="border-t border-gray-800 pt-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Admin Account</p>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Full Name</label>
              <input type="text" value={adminFullName} onChange={(e) => setAdminFullName(e.target.value)} className={inputClass} placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Email *</label>
              <input type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} required className={inputClass} placeholder="admin@company.com" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Password *</label>
              <input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} required minLength={6} className={inputClass} placeholder="Min. 6 characters" />
            </div>
          </div>
        </div>
        {success && (
          <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-xs px-3 py-2 rounded-lg break-all">{success}</div>
        )}
        <button type="submit" className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
          Create Company
        </button>
      </form>
    </div>
  )
}
