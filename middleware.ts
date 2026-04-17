import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const { pathname } = request.nextUrl

  // Let login page through
  if (pathname === '/login') {
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role, company_id, companies(slug)')
        .eq('id', user.id)
        .single()

      if (profile?.role === 'super_admin') {
        return NextResponse.redirect(new URL('/super-admin/dashboard', request.url))
      }
      if (profile?.company_id) {
        const slug = (profile.companies as { slug: string } | null)?.slug
        return NextResponse.redirect(
          new URL(`/${slug}/${profile.company_id}/dashboard`, request.url)
        )
      }
    }
    return supabaseResponse
  }

  // Require auth for all other routes
  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, company_id, companies(slug)')
    .eq('id', user.id)
    .single()

  if (!profile) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Block non-super-admins from /super-admin routes
  if (pathname.startsWith('/super-admin') && profile.role !== 'super_admin') {
    const slug = (profile.companies as { slug: string } | null)?.slug
    if (profile.company_id && slug) {
      return NextResponse.redirect(
        new URL(`/${slug}/${profile.company_id}/dashboard`, request.url)
      )
    }
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect root to appropriate dashboard
  if (pathname === '/') {
    if (profile.role === 'super_admin') {
      return NextResponse.redirect(new URL('/super-admin/dashboard', request.url))
    }
    const slug = (profile.companies as { slug: string } | null)?.slug
    if (profile.company_id && slug) {
      return NextResponse.redirect(
        new URL(`/${slug}/${profile.company_id}/dashboard`, request.url)
      )
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
