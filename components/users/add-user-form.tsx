'use client'

import { useState } from 'react'

interface Props {
  companyId: string
}

export default function AddUserForm({ companyId: _ }: Props) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'admin' | 'client'>('client')
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await new Promise((r) => setTimeout(r, 600))
    setSuccess(true)
    setFullName(''); setEmail(''); setPassword(''); setRole('client')
    setTimeout(() => setSuccess(false), 3000)
  }

  const inputClass = "w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
      <h2 className="font-semibold text-white mb-1">Add User</h2>
      <p className="text-xs text-gray-500 mb-4">Invite someone to this company</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">Full Name</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputClass} placeholder="Jane Smith" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">Email *</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClass} placeholder="user@company.com" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">Password *</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className={inputClass} placeholder="Min. 6 characters" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value as 'admin' | 'client')}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="client">Client</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {success && (
          <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-xs px-3 py-2 rounded-lg">
            User added! (preview mode)
          </div>
        )}
        <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          Add User
        </button>
      </form>
    </div>
  )
}
