import { type ReactNode } from 'react'

interface StatBadgeProps {
  children: ReactNode
  className?: string
}

export default function StatBadge({ children, className = '' }: StatBadgeProps) {
  return (
    <span className={`stat-badge ${className}`}>
      {children}
    </span>
  )
}
