import { getAllClients, getClientReports } from '@/lib/clients.js'
import Link from 'next/link'
import LogoutButton from '@/app/components/LogoutButton.js'

export const metadata = {
  title: 'Admin Dashboard — Victory Square Partners',
}

export default function AdminDashboard() {
  const clients = getAllClients().map((c) => ({
    ...c,
    reports: getClientReports(c.slug),
  }))

  const totalReports = clients.reduce((sum, c) => sum + c.reports.length, 0)

  return (
    <div>
      {/* Header */}
      <header className="portal-header">
        <div className="portal-header-inner">
          <div className="portal-header-top">
            <img src="/assets/images/vsp-logo.svg" alt="VSP" style={{ height: '32px' }} />
            <LogoutButton />
          </div>
          <div className="portal-badge admin-badge">
            Admin
          </div>
          <h1>Client Portals</h1>
          <p className="portal-description">
            {clients.length} clients — {totalReports} reports published
          </p>
        </div>
      </header>

      {/* Stats */}
      <main className="portal-main">
        <div className="vsp-stat-row">
          <div className="vsp-stat-card">
            <div className="vsp-stat-number accent">{clients.length}</div>
            <div className="vsp-stat-label">Clients</div>
          </div>
          <div className="vsp-stat-card">
            <div className="vsp-stat-number green">{totalReports}</div>
            <div className="vsp-stat-label">Reports</div>
          </div>
          <div className="vsp-stat-card">
            <div className="vsp-stat-number purple">{clients.filter((c) => c.reports.length > 0).length}</div>
            <div className="vsp-stat-label">With Content</div>
          </div>
          <div className="vsp-stat-card">
            <div className="vsp-stat-number orange">{clients.filter((c) => c.reports.length === 0).length}</div>
            <div className="vsp-stat-label">Empty Portals</div>
          </div>
        </div>

        {/* Client List */}
        <div style={{ marginBottom: '24px' }}>
          <span className="vsp-section-label">All Clients</span>
          <h2>Client Directory</h2>
        </div>

        <div className="report-list">
          {clients.map((client) => (
            <Link key={client.slug} href={`/portal/${client.slug}`} className="client-link">
              <span className="client-dot" style={{ background: client.accentColor || 'var(--vsp-accent)' }} />
              <span className="client-name">{client.name}</span>
              <span className="client-report-count">
                {client.reports.length} {client.reports.length === 1 ? 'report' : 'reports'}
              </span>
              <span className="client-slug">{client.slug}</span>
            </Link>
          ))}
        </div>
      </main>

      <footer className="portal-footer">
        <div className="vsp-container">
          Victory Square Partners — Admin Portal
        </div>
      </footer>
    </div>
  )
}
