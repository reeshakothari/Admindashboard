'use server'

import { createServiceClient } from '@/lib/supabase/service'
import { revalidatePath } from 'next/cache'

interface CreateUserInput {
  email: string
  password: string
  fullName: string
  role: 'admin' | 'client'
  companyId: string
}

export async function createUserAction(input: CreateUserInput) {
  const supabase = createServiceClient()

  const { data, error } = await supabase.auth.admin.createUser({
    email: input.email,
    password: input.password,
    user_metadata: { full_name: input.fullName, role: input.role },
    email_confirm: true,
  })

  if (error) return { error: error.message }

  if (data.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ company_id: input.companyId, role: input.role, full_name: input.fullName })
      .eq('id', data.user.id)

    if (profileError) return { error: profileError.message }
  }

  revalidatePath('/', 'layout')
  return { error: null }
}
