"use client"

import { ScrollMorphProvider } from "@/lib/scroll-morph-context"
import { HeaderIndustrial } from "@/components/header-industrial"

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ScrollMorphProvider>
      <HeaderIndustrial />
      {children}
    </ScrollMorphProvider>
  )
}
