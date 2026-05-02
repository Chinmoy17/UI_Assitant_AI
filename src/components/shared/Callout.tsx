import { type ReactNode } from 'react'

interface CalloutProps {
  children: ReactNode
}

export default function Callout({ children }: CalloutProps) {
  return (
    <div className="border-l-[3px] border-accent pl-4 py-3 pr-4 rounded-r bg-accent/5 text-[14px] my-4">
      {children}
    </div>
  )
}
