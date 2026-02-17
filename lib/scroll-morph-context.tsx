"use client"

import { createContext, useContext, useState, useLayoutEffect, useRef, type ReactNode } from "react"
import { usePathname } from "next/navigation"

type ScrollMorphContextType = {
  isMorphed: boolean
  scrollY: number
}

const ScrollMorphContext = createContext<ScrollMorphContextType>({
  isMorphed: false,
  scrollY: 0,
})

/** Morph-in: Hero → Header */
const MORPH_IN = 300
/** Morph-out: hysteresis ile jitter önlenir */
const MORPH_OUT = 160

function getIn() {
  if (typeof window === "undefined") return MORPH_IN
  return Math.min(MORPH_IN, window.innerHeight * 0.32)
}
function getOut() {
  if (typeof window === "undefined") return MORPH_OUT
  return Math.min(MORPH_OUT, window.innerHeight * 0.18)
}

function compute(scrollY: number, pathname: string, prevMorphed: boolean): boolean {
  if (pathname !== "/") return true
  if (prevMorphed) return scrollY > getOut()
  return scrollY > getIn()
}

export function ScrollMorphProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [scrollY, setScrollY] = useState(0)
  const [isMorphed, setIsMorphed] = useState(false)
  const prevRef = useRef(false)

  useLayoutEffect(() => {
    const y = window.scrollY
    const next = pathname !== "/" ? true : y > getIn()
    prevRef.current = next
    setScrollY(y)
    setIsMorphed(next)
  }, [pathname])

  useLayoutEffect(() => {
    if (pathname !== "/") return
    const handler = () => {
      const y = window.scrollY
      setScrollY(y)
      const next = compute(y, pathname, prevRef.current)
      if (next !== prevRef.current) {
        prevRef.current = next
        setIsMorphed(next)
      }
    }
    handler()
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [pathname])

  return (
    <ScrollMorphContext.Provider value={{ isMorphed, scrollY }}>
      {children}
    </ScrollMorphContext.Provider>
  )
}

export function useScrollMorph() {
  return useContext(ScrollMorphContext)
}
