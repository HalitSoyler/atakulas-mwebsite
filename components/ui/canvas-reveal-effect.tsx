"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type CanvasRevealEffectProps = {
  className?: string
  containerClassName?: string
  /** Saniye cinsinden hız (varsayılan 8) */
  animationSpeed?: number
  /**
   * RGB dizisi örn. [ [100,116,139], [186,230,253] ]
   * İlk renk merkez, ikinci renk dış halka için kullanılır.
   */
  colors?: [number, number, number][]
  /** Nokta/blur yoğunluğu için ölçek (şu an sadece blur miktarında kullanılıyor) */
  dotSize?: number
}

/**
 * @description
 * Aceternity `canvas-reveal-effect` esintili, ancak saf React + CSS ile yazılmış
 * hafif bir arka plan efekti. Hover durumunda kartın arkasında
 * yumuşak, çelik tonlu bir ışık alanı dolaşır.
 */
export function CanvasRevealEffect({
  className,
  containerClassName,
  animationSpeed = 8,
  colors = [
    [100, 116, 139], // slate-500
    [148, 163, 184], // slate-400
  ],
  dotSize = 2,
}: CanvasRevealEffectProps) {
  const [primary, secondary] = colors
  const primaryColor = `rgba(${primary[0]}, ${primary[1]}, ${primary[2]}, 0.85)`
  const secondaryColor = `rgba(${secondary[0]}, ${secondary[1]}, ${secondary[2]}, 0.35)`

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-xl bg-slate-900 dark:bg-zinc-950",
        containerClassName
      )}
      style={{ "--canvas-speed": `${animationSpeed}s` } as React.CSSProperties}
    >
      {/* Hareket eden yumuşak ışık lekesi */}
      <div
        className={cn(
          "pointer-events-none absolute -inset-[30%] blur-[28px]",
          "canvas-reveal-blob"
        )}
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 20%, ${primaryColor}, transparent 55%),
            radial-gradient(circle at 70% 80%, ${secondaryColor}, transparent 55%)
          `,
          opacity: Math.min(1, 0.4 + dotSize * 0.1),
        }}
      />

      {/* Hafif grid dokusu */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-40 mix-blend-screen",
          className
        )}
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(148,163,184,0.25) 1px, transparent 0)",
          backgroundSize: "18px 18px",
        }}
      />
    </div>
  )
}

