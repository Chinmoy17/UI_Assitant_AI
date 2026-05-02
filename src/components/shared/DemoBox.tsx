import { type ReactNode } from 'react'

interface DemoBoxProps {
  label: string
  children: ReactNode
}

export default function DemoBox({ label, children }: DemoBoxProps) {
  return (
    <div className="bg-surface border border-border rounded-lg p-6 my-4">
      <div className="text-[11px] uppercase tracking-widest text-text-dim font-semibold mb-3">
        {label}
      </div>
      {children}
    </div>
  )
}
