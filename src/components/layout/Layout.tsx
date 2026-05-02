import { type ReactNode } from 'react'
import Sidebar from './Sidebar'

interface LayoutProps {
  activeSection: string
  onNavigate: (id: string) => void
  children: ReactNode
}

export default function Layout({ activeSection, onNavigate, children }: LayoutProps) {
  return (
    <div className="layout-grid" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: '100vh' }}>
      <Sidebar activeSection={activeSection} onNavigate={onNavigate} />
      <main
        className="layout-main"
        style={{ padding: '48px 56px', maxWidth: 960, overflowX: 'hidden' }}
      >
        {children}
      </main>
    </div>
  )
}
