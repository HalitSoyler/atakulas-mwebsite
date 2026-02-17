"use client"

import { motion, useInView } from "framer-motion"
import { useRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"

const defaultVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

const defaultTransition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1],
}

type FadeInUpProps = {
  children: ReactNode
  className?: string
  /** Intersection Observer: ratio of element visible to trigger (0–1) */
  amount?: number
  /** Run animation only once */
  once?: boolean
  /** Stagger delay in seconds for children */
  staggerDelay?: number
  /** Custom transition */
  transition?: typeof defaultTransition
}

export function FadeInUp({
  children,
  className,
  amount = 0.12,
  once = true,
  staggerDelay = 0,
  transition = defaultTransition,
}: FadeInUpProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={defaultVariants}
      transition={{ ...transition, delay: staggerDelay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
