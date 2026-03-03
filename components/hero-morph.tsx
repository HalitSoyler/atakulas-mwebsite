"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useScrollMorph } from "@/lib/scroll-morph-context"
import { cn } from "@/lib/utils"

/** Circular hero image - kendi fotoğrafınız için: public/images/ altına atıp yolunu güncelleyin */
const HERO_PROFILE_IMAGE = "/images/Gemini_Generated_Image_vcveefvcveefvcve.png"

export function HeroMorph() {
  const { isMorphed } = useScrollMorph()

  return (
    <section
      data-section="hero"
      data-header-theme="dark"
      className={cn(
        "relative flex min-h-screen w-full flex-col items-center justify-center overflow-x-hidden overflow-y-hidden bg-[#0f172a]",
        "atak-industrial",
        isMorphed && "min-h-0 h-0 overflow-hidden pointer-events-none"
      )}
    >
      {/* Subtle grid + gradient background */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-[0.03] transition-opacity duration-500",
          isMorphed && "opacity-0"
        )}
        style={{
          backgroundImage: `linear-gradient(rgba(56,189,248,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56,189,248,0.4) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />
      <div className={cn("absolute inset-0 bg-gradient-to-b from-[#0f172a] via-transparent to-[#0f172a]", isMorphed && "opacity-0")} />
      <div className={cn("absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[#38bdf8]/10 blur-[80px]", isMorphed && "opacity-0")} />

      <div className={cn("relative z-10 flex flex-col items-center justify-center gap-10 px-6", isMorphed && "invisible")}>
        {/* layoutId: Hero'daki yazı/logoya — header'da logoya dönüşecek */}
        {!isMorphed && (
          <motion.div
            layoutId="atak-logo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              opacity: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              layout: { type: "spring", damping: 20, stiffness: 100 },
            }}
            style={{ backfaceVisibility: "hidden" }}
            className="flex flex-shrink-0 items-center justify-center"
          >
            <Link href="/" className="block focus:outline-none" style={{ fontFamily: "var(--font-syne)" }}>
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.2em] text-white uppercase select-none">
                Atak
              </span>
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.2em] text-[#38bdf8] uppercase select-none mt-0.5">
                Ulaşım
              </span>
            </Link>
          </motion.div>
        )}

        {/* layoutId: Hero'daki fotoğraf — header'da profil ikonuna dönüşecek */}
        {!isMorphed && (
          <motion.div
            layoutId="atak-avatar"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              opacity: { delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              layout: { type: "spring", damping: 20, stiffness: 100 },
            }}
            style={{ backfaceVisibility: "hidden", width: 160, height: 160 }}
            className="relative flex flex-shrink-0 overflow-hidden rounded-full border-2 border-[#38bdf8]/40 bg-[#1e293b] shadow-xl shadow-black/20 ring-4 ring-[#38bdf8]/20"
          >
            <Image
              src={HERO_PROFILE_IMAGE}
              alt="Atak Ulaşım"
              width={160}
              height={160}
              className="object-cover"
              priority
            />
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: isMorphed ? 0 : 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="max-w-md text-center text-sm font-medium tracking-wide text-[#94a3b8]"
        >
          Raylı sistem ekipmanları ve elektronik çözümler
        </motion.p>
      </div>
    </section>
  )
}
