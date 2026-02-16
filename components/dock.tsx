"use client"

import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export type IconProps = React.SVGAttributes<SVGElement>

const Icons = {
  linkedin: (props: IconProps) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>LinkedIn</title>
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  ),
  x: (props: IconProps) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>X</title>
      <path
        fill="currentColor"
        d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
      />
    </svg>
  ),
  youtube: (props: IconProps) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 32 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>YouTube</title>
      <path d="M29.41,9.26a3.5,3.5,0,0,0-2.47-2.47C24.76,6.2,16,6.2,16,6.2s-8.76,0-10.94.59A3.5,3.5,0,0,0,2.59,9.26,36.13,36.13,0,0,0,2,16a36.13,36.13,0,0,0,.59,6.74,3.5,3.5,0,0,0,2.47,2.47C7.24,25.8,16,25.8,16,25.8s8.76,0,10.94-.59a3.5,3.5,0,0,0,2.47-2.47A36.13,36.13,0,0,0,30,16,36.13,36.13,0,0,0,29.41,9.26ZM13.2,20.2V11.8L20.47,16Z" />
    </svg>
  ),
  email: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <title>E-posta</title>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
}

export const DOCK_SOCIAL = {
  LinkedIn: { name: "LinkedIn", url: "#", icon: Icons.linkedin },
  X: { name: "X", url: "#", icon: Icons.x },
  youtube: { name: "YouTube", url: "#", icon: Icons.youtube },
  email: { name: "E-posta", url: "mailto:info@atakulasim.com", icon: Icons.email },
} as const

interface DockIconProps {
  children: React.ReactNode
  className?: string
  size?: number
}

function DockIcon({ children, className, size = 44 }: DockIconProps) {
  return (
    <div
      className={cn(
        "flex size-11 shrink-0 items-center justify-center rounded-full bg-muted/80 backdrop-blur-sm",
        "border border-border/60 shadow-sm",
        "transition-transform duration-200 ease-out hover:scale-125",
        "hover:bg-primary/10 hover:border-primary/30",
        className
      )}
      style={{ width: size, height: size }}
    >
      <span className="[&_svg]:size-5 text-foreground [&_svg]:shrink-0">
        {children}
      </span>
    </div>
  )
}

interface DockProps {
  children: React.ReactNode
  className?: string
  direction?: "middle" | "top" | "bottom"
}

export function Dock({ children, className, direction = "middle" }: DockProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 rounded-2xl border border-border/60 bg-muted/40 px-4 py-3 shadow-lg backdrop-blur-md",
        direction === "middle" && "flex-row",
        direction === "top" && "flex-row",
        direction === "bottom" && "flex-row",
        className
      )}
    >
      {children}
    </div>
  )
}

export { DockIcon }

export function ContactDock({ variant = "light" }: { variant?: "light" | "dark" }) {
  const isDark = variant === "dark"
  return (
    <TooltipProvider delayDuration={0}>
      <Dock
        direction="middle"
        className={cn(
          "gap-3",
          isDark && "border-white/20 bg-white/10 [&_svg]:text-white [&_.text-foreground]:text-white"
        )}
      >
        {Object.entries(DOCK_SOCIAL).map(([key, social]) => (
          <Tooltip key={key}>
            <TooltipTrigger asChild>
              <Link
                href={social.url}
                aria-label={social.name}
                className="flex items-center justify-center rounded-full transition-opacity hover:opacity-90"
              >
                <DockIcon className={isDark ? "bg-white/10 border-white/20 hover:bg-white/20" : ""}>
                  <social.icon className={cn("size-5", isDark ? "text-white" : "text-foreground")} />
                </DockIcon>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="top" className="border-border bg-card">
              <p>{social.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </Dock>
    </TooltipProvider>
  )
}
