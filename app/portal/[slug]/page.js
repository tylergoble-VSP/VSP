import { getClient, getClientReports, getAllClientSlugs } from '@/lib/clients.js'
import { notFound } from 'next/navigation'
import LogoutButton from '@/app/components/LogoutButton.js'

export async function generateStaticParams() {
  return getAllClientSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const client = getClient(slug)
  if (!client) return { title: 'Not Found' }
  return { title: `${client.name} — Victory Square Partners` }
}

export default async function ClientPortal({ params }) {
  const { slug } = await params
  const client = getClient(slug)
  if (!client) notFound()

  const reports = getClientReports(slug)
  const accent = client.accentColor || '#4a9eff'

  return (
    <div>
      {/* Header */}
      <header className="portal-header">
        <div className="portal-header-inner">
          <div className="portal-header-top">
            <img src="/assets/images/vsp-logo.svg" alt="VSP" style={{ height: '32px' }} />
            <LogoutButton />
            {client.logo && (
              <img src={client.logo} alt={client.name} style={{ height: '36px' }} />
            )}
          </div>
          <div
            className="portal-badge"
            style={{
              background: `${accent}22`,
              color: accent,
              border: `1px solid ${accent}33`,
            }}
          >
            Client Portal
          </div>
          <h1>{client.name}</h1>
          <p className="portal-description">
            Reports and deliverables from Victory Square Partners.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="portal-main">
        <div className="portal-section-header">
          <div>
            <span className="vsp-section-label" style={{ color: accent }}>Documents</span>
            <h2>Your Reports</h2>
          </div>
          <span className="portal-file-count">
            {reports.length} {reports.length === 1 ? 'file' : 'files'}
          </span>
        </div>

        {reports.length === 0 ? (
          <div className="portal-empty">
            <p style={{ marginBottom: '8px' }}>No reports published yet.</p>
            <p style={{ margin: 0 }}>Your team at VSP will publish reports here as they become available.</p>
          </div>
        ) : (
          <div className="report-list">
            {reports.map((report) => (
              <a key={report.file} href={report.href} className="report-link">
                <span className="report-icon" style={{ color: report.type === 'PDF' ? 'var(--vsp-red)' : accent }}>
                  {report.type === 'PDF' ? '📄' : '📊'}
                </span>
                <span className="report-title">{report.title}</span>
                <span className="report-badge">{report.type}</span>
              </a>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="portal-footer">
        <div className="vsp-container">
          Victory Square Partners — Confidential
        </div>
      </footer>
    </div>
  )
}
