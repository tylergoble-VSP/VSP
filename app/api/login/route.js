import { NextResponse } from 'next/server'

const PASSWORD_HASH = '4c9187cfae578ef1f84edaf9103abcfc953d825a6ebf4e963f21e34e202f6a8a'

async function sha256(str) {
  const encoder = new TextEncoder()
  const data = encoder.encode(str)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function POST(request) {
  const { password } = await request.json()
  const hash = await sha256(password)

  if (hash !== PASSWORD_HASH) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set('vsp_session', PASSWORD_HASH, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  return response
}
