"use client"

import { Award, Shield, CheckCircle, Clock } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

export function TrustBar() {
  const { t } = useLanguage()

  const metrics = [
    {
      icon: Clock,
      value: t.trust.experience.value,
      label: t.trust.experience.label,
      description: "1998",
    },
    {
      icon: Award,
      value: t.trust.vehicles.value,
      label: t.trust.vehicles.label,
      description: "Ar-Ge",
    },
    {
      icon: Shield,
      value: t.trust.success.value,
      label: t.trust.success.label,
      description: "ISO 9001",
    },
    {
      icon: CheckCircle,
      value: t.trust.domestic.value,
      label: t.trust.domestic.label,
      description: "Made in TR",
    },
  ]

  return (
    <section className="py-20 lg:py-24 bg-[#0d1220] relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(30, 90, 158, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30, 90, 158, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            {t.trust.title}
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={cn(
                "text-center group p-8",
                "bg-white/[0.02] border border-white/5 rounded-2xl",
                "hover:bg-white/[0.05] hover:border-white/10",
                "transition-all duration-500"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mx-auto w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <metric.icon className="h-7 w-7 text-primary group-hover:text-white transition-colors" />
              </div>
              <div className="text-4xl lg:text-5xl font-bold text-white font-mono tracking-tight">
                {metric.value}
              </div>
              <div className="text-sm font-semibold text-white/80 mt-2">
                {metric.label}
              </div>
              <div className="text-xs text-white/60 mt-1 font-mono tracking-wider">
                {metric.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
