"use client"

import Image from "next/image"
import Link from "next/link"
import { useScrollMorph } from "@/lib/scroll-morph-context"
import { cn } from "@/lib/utils"

const HERO_IMAGE = "/images/tramway-showcase.jpg"

export function HeroLuxury() {
  const { isMorphed } = useScrollMorph()

  return (
    <section
      data-section="hero"
      data-header-theme="dark"
      className={cn(
        "relative w-full overflow-hidden bg-[#0a0a0a]",
        isMorphed && "pointer-events-none"
      )}
    >
      {/* 21:9 ultra-wide immersive image */}
      <div className="relative aspect-[21/9] w-full">
        <Image
          src={HERO_IMAGE}
          alt="Atak Ulaşım — Raylı sistem ve elektronik çözümler"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Center-aligned serif typography overlay */}
      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center px-6 text-center",
          isMorphed && "invisible"
        )}
      >
        <Link href="/" className="focus:outline-none">
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-[0.12em] text-white uppercase">
            Atak
          </span>
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-[0.12em] text-white/90 uppercase mt-1">
            Ulaşım
          </span>
        </Link>
        <p className="mt-8 max-w-md text-sm font-normal tracking-[0.2em] text-white/80 uppercase">
          Raylı sistem ekipmanları ve elektronik çözümler
        </p>
      </div>
    </section>
  )
}
