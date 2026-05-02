import { navItems } from '../../data/navigation'

interface SidebarProps {
  activeSection: string
  onNavigate: (id: string) => void
}

export default function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  return (
    <aside className="bg-surface border-r border-border p-6 sticky top-0 h-screen overflow-y-auto">
      <h1 className="text-[14px] font-semibold tracking-wider uppercase text-text-dim">
        UI Psychology Lab
      </h1>
      <p className="text-[12px] text-text-dim mt-1 mb-6">Interactive first-principles guide</p>

      <nav>
        <ul className="list-none space-y-0.5">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onNavigate(item.id)}
                className={[
                  'w-full text-left px-3 py-2 rounded-md text-[13px] transition-all duration-150 cursor-pointer',
                  activeSection === item.id
                    ? 'bg-accent text-white'
                    : 'text-text-dim hover:bg-surface2 hover:text-text-base',
                ].join(' ')}
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
