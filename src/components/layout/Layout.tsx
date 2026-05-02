import { type ReactNode } from 'react'
import Sidebar from './Sidebar'

interface LayoutProps {
  activeSection: string
  onNavigate: (id: string) => void
  children: ReactNode
}

export default function Layout({ activeSection, onNavigate, children }: LayoutProps) {
  return (
    <div className="grid min-h-screen" style={{ gridTemplateColumns: '260px 1fr' }}>
      <Sidebar activeSection={activeSection} onNavigate={onNavigate} />
      <main className="px-14 py-12 max-w-[1000px]">
        {children}
      </main>
    </div>
  )
}
