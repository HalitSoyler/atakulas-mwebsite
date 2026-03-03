"use client"

import { useEffect } from "react"

export function ScrollRevealObserver() {
  useEffect(() => {
    const hero = document.querySelector("[data-section='hero']")
    const els = document.querySelectorAll(".sr, .home-reveal")
    const toObserve = hero ? Array.from(els).filter((el) => !hero.contains(el)) : Array.from(els)
    if (toObserve.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) (entry.target as HTMLElement).setAttribute("data-revealed", "true")
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    )
    toObserve.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return null
}
