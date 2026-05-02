import { type ReactNode } from 'react'

interface StatBadgeProps {
  children: ReactNode
  className?: string
}

export default function StatBadge({ children, className = '' }: StatBadgeProps) {
  return (
    <span
      className={`inline-block bg-surface2 px-3 py-2 rounded-md font-mono text-[13px] mr-2 mb-2 ${className}`}
    >
      {children}
    </span>
  )
}
