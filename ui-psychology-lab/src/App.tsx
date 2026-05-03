import { type ReactElement, useState } from 'react'
import './index.css'
import Layout from './components/layout/Layout'
import {
  Introduction, PreattentiveVision, GestaltPrinciples, CognitiveLoad,
  VisualHierarchy, SquintTest, FittsLaw, HicksLaw, Typography,
  ColorContrast, FPattern, Affordance, FeedbackLatency,
  AnchoringBias, HaloEffect, Synthesis,
} from './components/sections'

const SECTIONS: Record<string, ReactElement> = {
  intro:        <Introduction />,
  preattentive: <PreattentiveVision />,
  gestalt:      <GestaltPrinciples />,
  cogload:      <CognitiveLoad />,
  hierarchy:    <VisualHierarchy />,
  squint:       <SquintTest />,
  fitts:        <FittsLaw />,
  hicks:        <HicksLaw />,
  typography:   <Typography />,
  color:        <ColorContrast />,
  fpattern:     <FPattern />,
  affordance:   <Affordance />,
  feedback:     <FeedbackLatency />,
  anchoring:    <AnchoringBias />,
  halo:         <HaloEffect />,
  finale:       <Synthesis />,
}

export default function App() {
  const [active, setActive] = useState('intro')

  function handleNavigate(id: string) {
    setActive(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Layout activeSection={active} onNavigate={handleNavigate}>
      {SECTIONS[active]}
    </Layout>
  )
}
