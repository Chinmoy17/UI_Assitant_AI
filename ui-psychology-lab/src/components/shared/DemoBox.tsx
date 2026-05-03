import { type ReactNode } from 'react'

interface DemoBoxProps {
  label: string
  children: ReactNode
}

export default function DemoBox({ label, children }: DemoBoxProps) {
  return (
    <div className="demo-box">
      <div className="demo-label">{label}</div>
      {children}
    </div>
  )
}
