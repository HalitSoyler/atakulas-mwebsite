"use client"

import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/scroll-reveal"
import { cn } from "@/lib/utils"

type PageHeroIndustrialProps = {
  label?: string
  title: string
  description?: string
  className?: string
}

export function PageHeroIndustrial({
  label,
  title,
  description,
  className,
}: PageHeroIndustrialProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-stone-100 dark:bg-[#0f172a] py-20 sm:py-28",
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(56,189,248,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56,189,248,0.5) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#38bdf8]/10 blur-[100px]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal staggerIndex={0}>
          {label && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#38bdf8] mb-3">
              {label}
            </p>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-semibold text-[#0f172a] dark:text-white sm:text-4xl lg:text-5xl"
          >
            {title}
          </motion.h1>
          {description && (
            <p className="mt-4 max-w-2xl text-base text-stone-600 dark:text-white/70 leading-relaxed">
              {description}
            </p>
          )}
        </ScrollReveal>
      </div>
    </section>
  )
}
