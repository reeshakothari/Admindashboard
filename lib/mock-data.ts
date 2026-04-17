import type { Company, Profile, Metric } from './supabase/types'

export const MOCK_COMPANIES: Company[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'Acme Corp',
    slug: 'acme-corp',
    logo_url: null,
    is_active: true,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'TechStart Inc',
    slug: 'techstart',
    logo_url: null,
    is_active: true,
    created_at: '2024-02-20T10:00:00Z',
    updated_at: '2024-02-20T10:00:00Z',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    name: 'BuildCo Solutions',
    slug: 'buildco',
    logo_url: null,
    is_active: false,
    created_at: '2024-03-10T10:00:00Z',
    updated_at: '2024-03-10T10:00:00Z',
  },
]

export const MOCK_USERS: Profile[] = [
  {
    id: 'user-001',
    email: 'superadmin@platform.com',
    full_name: 'Super Admin',
    role: 'super_admin',
    company_id: null,
    avatar_url: null,
    created_at: '2024-01-01T10:00:00Z',
    updated_at: '2024-01-01T10:00:00Z',
  },
  {
    id: 'user-002',
    email: 'admin@acme.com',
    full_name: 'John Smith',
    role: 'admin',
    company_id: '550e8400-e29b-41d4-a716-446655440001',
    avatar_url: null,
    created_at: '2024-01-16T10:00:00Z',
    updated_at: '2024-01-16T10:00:00Z',
  },
  {
    id: 'user-003',
    email: 'alice@acme.com',
    full_name: 'Alice Johnson',
    role: 'client',
    company_id: '550e8400-e29b-41d4-a716-446655440001',
    avatar_url: null,
    created_at: '2024-01-20T10:00:00Z',
    updated_at: '2024-01-20T10:00:00Z',
  },
  {
    id: 'user-004',
    email: 'bob@acme.com',
    full_name: 'Bob Williams',
    role: 'client',
    company_id: '550e8400-e29b-41d4-a716-446655440001',
    avatar_url: null,
    created_at: '2024-02-01T10:00:00Z',
    updated_at: '2024-02-01T10:00:00Z',
  },
  {
    id: 'user-005',
    email: 'admin@techstart.com',
    full_name: 'Sara Lee',
    role: 'admin',
    company_id: '550e8400-e29b-41d4-a716-446655440002',
    avatar_url: null,
    created_at: '2024-02-21T10:00:00Z',
    updated_at: '2024-02-21T10:00:00Z',
  },
  {
    id: 'user-006',
    email: 'mike@techstart.com',
    full_name: 'Mike Chen',
    role: 'client',
    company_id: '550e8400-e29b-41d4-a716-446655440002',
    avatar_url: null,
    created_at: '2024-03-01T10:00:00Z',
    updated_at: '2024-03-01T10:00:00Z',
  },
  {
    id: 'user-007',
    email: 'admin@buildco.com',
    full_name: 'Emma Davis',
    role: 'admin',
    company_id: '550e8400-e29b-41d4-a716-446655440003',
    avatar_url: null,
    created_at: '2024-03-11T10:00:00Z',
    updated_at: '2024-03-11T10:00:00Z',
  },
]

export const MOCK_METRICS: Metric[] = [
  { id: 'm-001', company_id: '550e8400-e29b-41d4-a716-446655440001', metric_name: 'Monthly Revenue', metric_value: 48500, metric_label: 'USD', category: 'Finance', recorded_at: '2024-04-01T10:00:00Z' },
  { id: 'm-002', company_id: '550e8400-e29b-41d4-a716-446655440001', metric_name: 'Active Users', metric_value: 1240, metric_label: 'users', category: 'Growth', recorded_at: '2024-04-02T10:00:00Z' },
  { id: 'm-003', company_id: '550e8400-e29b-41d4-a716-446655440001', metric_name: 'Support Tickets', metric_value: 34, metric_label: 'open', category: 'Support', recorded_at: '2024-04-03T10:00:00Z' },
  { id: 'm-004', company_id: '550e8400-e29b-41d4-a716-446655440001', metric_name: 'Conversion Rate', metric_value: 3.8, metric_label: '%', category: 'Growth', recorded_at: '2024-04-04T10:00:00Z' },
  { id: 'm-005', company_id: '550e8400-e29b-41d4-a716-446655440001', metric_name: 'Churn Rate', metric_value: 1.2, metric_label: '%', category: 'Finance', recorded_at: '2024-04-05T10:00:00Z' },

  { id: 'm-006', company_id: '550e8400-e29b-41d4-a716-446655440002', metric_name: 'Monthly Revenue', metric_value: 22000, metric_label: 'USD', category: 'Finance', recorded_at: '2024-04-01T10:00:00Z' },
  { id: 'm-007', company_id: '550e8400-e29b-41d4-a716-446655440002', metric_name: 'Active Users', metric_value: 560, metric_label: 'users', category: 'Growth', recorded_at: '2024-04-02T10:00:00Z' },
  { id: 'm-008', company_id: '550e8400-e29b-41d4-a716-446655440002', metric_name: 'New Signups', metric_value: 89, metric_label: 'this month', category: 'Growth', recorded_at: '2024-04-03T10:00:00Z' },

  { id: 'm-009', company_id: '550e8400-e29b-41d4-a716-446655440003', metric_name: 'Projects Active', metric_value: 12, metric_label: 'projects', category: 'Operations', recorded_at: '2024-04-01T10:00:00Z' },
  { id: 'm-010', company_id: '550e8400-e29b-41d4-a716-446655440003', metric_name: 'Team Size', metric_value: 45, metric_label: 'employees', category: 'Operations', recorded_at: '2024-04-02T10:00:00Z' },
]

export function getCompanyById(id: string) {
  return MOCK_COMPANIES.find((c) => c.id === id) ?? null
}

export function getCompanyBySlugAndId(slug: string, id: string) {
  return MOCK_COMPANIES.find((c) => c.slug === slug && c.id === id) ?? null
}

export function getUsersByCompany(companyId: string) {
  return MOCK_USERS.filter((u) => u.company_id === companyId)
}

export function getMetricsByCompany(companyId: string) {
  return MOCK_METRICS.filter((m) => m.company_id === companyId)
}
