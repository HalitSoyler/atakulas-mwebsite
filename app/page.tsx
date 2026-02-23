"use client"

import { use } from "react"
import { HeroIndustrialDirective } from "@/components/hero-industrial-directive"
import { TickerDirective } from "@/components/ticker-directive"
import { SolutionMatrixDirective } from "@/components/solution-matrix-directive"
import { ProjectPortfolioDirective } from "@/components/project-portfolio-directive"
import { CtaDirective } from "@/components/cta-directive"
import { Footer } from "@/components/footer"
import { ScrollRevealObserver } from "@/components/scroll-reveal-observer"

type PageProps = { params?: Promise<Record<string, string | string[]>>; searchParams?: Promise<Record<string, string | string[]>> }

export default function HomePage(props: PageProps) {
  use(props.params ?? Promise.resolve({}))
  use(props.searchParams ?? Promise.resolve({}))

  return (
    <main className="min-h-screen relative overflow-x-hidden">
      <ScrollRevealObserver />
      <HeroIndustrialDirective />
      <TickerDirective />
      <SolutionMatrixDirective />
      <ProjectPortfolioDirective />
      <CtaDirective />
      <div data-section="footer" data-header-theme="muted">
        <Footer />
      </div>
    </main>
  )
}
