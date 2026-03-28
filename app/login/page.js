'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function LoginForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      const data = await res.json()
      const redirect = searchParams.get('redirect')

      if (redirect) {
        router.push(redirect)
      } else if (data.role === 'admin') {
        router.push('/admin')
      } else if (data.role === 'client' && data.slug) {
        router.push(`/portal/${data.slug}`)
      } else {
        router.push('/')
      }
      router.refresh()
    } else {
      setError('Incorrect password')
      setPassword('')
      setLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          autoComplete="off"
          className="login-input"
        />
        <button type="submit" disabled={loading} className="login-button">
          {loading ? 'Verifying...' : 'Enter'}
        </button>
      </form>
      {error && <p className="login-error">{error}</p>}
    </>
  )
}

export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-box">
        <img src="/assets/images/vsp-logo.svg" alt="Victory Square Partners" className="vsp-logo" />
        <h2 className="login-title">Access Required</h2>
        <p className="login-subtitle">Enter your password to continue.</p>
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
