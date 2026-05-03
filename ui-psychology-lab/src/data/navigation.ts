export interface NavItem {
  id: string
  label: string
}

export const navItems: NavItem[] = [
  { id: 'intro',         label: 'Introduction' },
  { id: 'preattentive',  label: '1. Pre-attentive Vision' },
  { id: 'gestalt',       label: '2. Gestalt Principles' },
  { id: 'cogload',       label: '3. Cognitive Load' },
  { id: 'hierarchy',     label: '4. Visual Hierarchy' },
  { id: 'squint',        label: '5. Squint Test' },
  { id: 'fitts',         label: '6. Fitts\'s Law' },
  { id: 'hicks',         label: '7. Hick\'s Law' },
  { id: 'typography',    label: '8. Typography' },
  { id: 'color',         label: '9. Color & Contrast' },
  { id: 'fpattern',      label: '10. F-Pattern' },
  { id: 'affordance',    label: '11. Affordance' },
  { id: 'feedback',      label: '12. Feedback Latency' },
  { id: 'anchoring',     label: '13. Anchoring Bias' },
  { id: 'halo',          label: '14. Halo Effect' },
  { id: 'finale',        label: 'Synthesis' },
]
