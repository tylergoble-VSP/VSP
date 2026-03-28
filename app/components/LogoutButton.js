'use client'

import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      style={{
        background: 'transparent',
        border: '1px solid #334155',
        color: '#94a3b8',
        fontSize: '13px',
        padding: '6px 14px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontFamily: 'inherit',
      }}
    >
      Log out
    </button>
  )
}
