import { NextResponse } from 'next/server'

const PASSWORD_HASH = '4c9187cfae578ef1f84edaf9103abcfc953d825a6ebf4e963f21e34e202f6a8a'

export function proxy(request) {
  const { pathname } = request.nextUrl

  // Allow the login page and login API through
  if (pathname === '/login' || pathname === '/api/login') {
    return NextResponse.next()
  }

  // Allow static assets (CSS, JS, images, fonts) through
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/assets/css/') ||
    pathname.startsWith('/assets/images/') ||
    pathname.startsWith('/assets/js/') ||
    pathname.match(/\.(ico|svg|png|jpg|jpeg|gif|woff|woff2)$/)
  ) {
    return NextResponse.next()
  }

  // Check for session cookie
  const session = request.cookies.get('vsp_session')
  if (session && session.value === PASSWORD_HASH) {
    return NextResponse.next()
  }

  // Redirect to login
  const loginUrl = new URL('/login', request.url)
  loginUrl.searchParams.set('redirect', pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
}
