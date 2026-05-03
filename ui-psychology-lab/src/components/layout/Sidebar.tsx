import { navItems } from '../../data/navigation'

interface SidebarProps {
  activeSection: string
  onNavigate: (id: string) => void
}

export default function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  return (
    <aside
      className="layout-aside"
      style={{
        background: '#14171c',
        borderRight: '1px solid #2a2f37',
        padding: '24px 16px',
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      <h1 style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.6px', textTransform: 'uppercase', color: '#8b919a' }}>
        UI Psychology Lab
      </h1>
      <p style={{ fontSize: 12, color: '#8b919a', marginTop: 4, marginBottom: 24 }}>
        Interactive first-principles guide
      </p>

      <nav>
        <ul style={{ listStyle: 'none' }}>
          {navItems.map((item) => (
            <li key={item.id} style={{ marginBottom: 2 }}>
              <button
                onClick={() => onNavigate(item.id)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '8px 12px',
                  borderRadius: 6,
                  fontSize: 13,
                  fontFamily: 'inherit',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  background: activeSection === item.id ? '#6366f1' : 'transparent',
                  color: activeSection === item.id ? '#fff' : '#8b919a',
                }}
                onMouseEnter={e => {
                  if (activeSection !== item.id) {
                    e.currentTarget.style.background = '#1c2026'
                    e.currentTarget.style.color = '#e6e8eb'
                  }
                }}
                onMouseLeave={e => {
                  if (activeSection !== item.id) {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = '#8b919a'
                  }
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
