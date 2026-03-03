"use client"

import { ScrollMorphProvider } from "@/lib/scroll-morph-context"
import { HeaderIndustrial } from "@/components/header-industrial"
import { ScrollProgressBar } from "@/components/scroll-progress-bar"

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ScrollMorphProvider>
      <ScrollProgressBar />
      <HeaderIndustrial />
      {children}
    </ScrollMorphProvider>
  )
}
