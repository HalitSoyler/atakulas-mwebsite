"use client"

import { useScroll, motion, useSpring } from "framer-motion"

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 right-0 z-[9999] h-[2px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #0056b3 0%, #3b82f6 50%, #dc2626 100%)",
      }}
    />
  )
}
