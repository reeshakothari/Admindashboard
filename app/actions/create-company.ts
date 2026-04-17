'use server'

import { createServiceClient } from '@/lib/supabase/service'
import { revalidatePath } from 'next/cache'

interface CreateCompanyInput {
  name: string
  adminFullName: string
  adminEmail: string
  adminPassword: string
}

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export async function createCompanyAction(input: CreateCompanyInput) {
  const supabase = createServiceClient()
  const slug = generateSlug(input.name)

  // 1. Create the company
  const { data: company, error: companyError } = await supabase
    .from('companies')
    .insert({ name: input.name, slug, is_active: true })
    .select()
    .single()

  if (companyError) return { error: companyError.message, data: null }

  // 2. Create the admin user (email auto-confirmed via service role)
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: input.adminEmail,
    password: input.adminPassword,
    user_metadata: { full_name: input.adminFullName, role: 'admin' },
    email_confirm: true,
  })

  if (authError) {
    // Rollback: delete the company we just created
    await supabase.from('companies').delete().eq('id', company.id)
    return { error: authError.message, data: null }
  }

  // 3. Link admin profile to the new company
  if (authData.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ company_id: company.id, role: 'admin', full_name: input.adminFullName })
      .eq('id', authData.user.id)

    if (profileError) return { error: profileError.message, data: null }
  }

  revalidatePath('/super-admin/companies')
  return { error: null, data: { companyId: company.id, slug: company.slug } }
}
