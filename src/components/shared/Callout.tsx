import { type ReactNode } from 'react'

interface CalloutProps {
  children: ReactNode
}

export default function Callout({ children }: CalloutProps) {
  return <div className="callout">{children}</div>
}
