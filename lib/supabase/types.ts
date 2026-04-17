export type UserRole = 'super_admin' | 'admin' | 'client'

export interface Company {
  id: string
  name: string
  slug: string
  created_at: string
  updated_at: string
  logo_url: string | null
  is_active: boolean
}

export interface Profile {
  id: string
  email: string
  full_name: string | null
  role: UserRole
  company_id: string | null
  created_at: string
  updated_at: string
  avatar_url: string | null
}

export interface Metric {
  id: string
  company_id: string
  metric_name: string
  metric_value: number
  metric_label: string | null
  recorded_at: string
  category: string | null
}

export type Database = {
  public: {
    Tables: {
      companies: {
        Row: Company
        Insert: Omit<Company, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Company, 'id'>>
      }
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'created_at' | 'updated_at'>
        Update: Partial<Omit<Profile, 'id'>>
      }
      metrics: {
        Row: Metric
        Insert: Omit<Metric, 'id'>
        Update: Partial<Omit<Metric, 'id'>>
      }
    }
  }
}
