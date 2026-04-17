-- ============================================================
-- Create your first Super Admin
-- Run AFTER schema.sql and AFTER creating the user via:
--   Supabase Dashboard > Authentication > Users > Add User
-- Then replace the email below and run this query.
-- ============================================================

update public.profiles
set role = 'super_admin'
where email = 'your-super-admin@email.com';
