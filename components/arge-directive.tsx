"use client"

import { ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

const PROCESS_STEPS = [
  { num: "01", title: "Tasarım", desc: "Kayseri Teknopark Ar-Ge merkezinde konsept ve mühendislik." },
  { num: "02", title: "Üretim", desc: "Ankara tesislerinde sertifikalı üretim ve test." },
  { num: "03", title: "Saha", desc: "İstanbul ve saha ekipleriyle devreye alma ve destek." },
]

const LOCATIONS = [
  { city: "ANKARA", role: "Merkez · Üretim", status: "AKTİF", dotColor: "var(--tech-blue)", glow: "0 0 12px var(--tech-blue)" },
  { city: "İSTANBUL", role: "Operasyon", status: "OPERASYON", dotColor: "var(--amber)", glow: "0 0 12px var(--amber)" },
  { city: "KAYSERİ", role: "Ar-Ge", status: "AR-GE", dotColor: "#22C55E", glow: "0 0 12px #22C55E" },
]

const STANDARD_BADGES = [
  { code: "EN 50155", desc: "Demiryolu elektronik ekipman" },
  { code: "EN 50121-4", desc: "EMC uyumluluk" },
  { code: "IP65/IP67", desc: "Koruma sınıfı" },
  { code: "TÜRKSAT", desc: "Yerli sertifikasyon" },
]

export function ArGeDirective() {
  return (
    <section
      data-section="arge"
      data-header-theme="dark"
      className="relative overflow-hidden bg-[#010D1C] py-[clamp(5rem,9vw,9rem)]"
    >
      {/* Blueprint grid overlay (reuse hero style) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,128,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,128,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Text + Process flow */}
          <div>
            <p
              className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-white/45"
              style={{ fontFamily: "var(--font-ibm-plex-mono), monospace" }}
            >
              Mühendislikten Uygulamaya
            </p>
            <h2
              className="mb-6 font-display text-white uppercase leading-tight"
              style={{
                fontFamily: "var(--font-barlow-condensed), sans-serif",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                letterSpacing: "-0.02em",
              }}
            >
              <span className="block">Tasarım.</span>
              <span className="block">Üretim.</span>
              <span className="block">Saha.</span>
            </h2>
            <p className="mb-10 text-sm leading-[1.8] text-white/50" style={{ fontFamily: "var(--font-barlow), sans-serif", fontWeight: 300 }}>
              Fikir Kayseri&apos;den çıkar, şekillenir. Ankara&apos;da ürüne dönüşür, test edilir. İstanbul&apos;da sahaya iner, yaşama geçer.
            </p>

            {/* Process flow: vertical steps with connecting line */}
            <div className="relative">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.num} className="relative flex gap-4 pb-8 last:pb-0">
                  {i < PROCESS_STEPS.length - 1 && (
                    <span
                      className="absolute left-6 top-14 bottom-0 w-px -translate-x-px"
                      style={{ background: "rgba(0,128,255,0.3)" }}
                    />
                  )}
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded border border-[var(--tech-blue)]/30 text-[var(--tech-blue)] transition-colors duration-300 hover:bg-[var(--tech-blue)]/10 hover:border-[var(--tech-blue)]"
                    style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: "0.75rem" }}
                  >
                    {step.num}
                  </div>
                  <div>
                    <h3
                      className="font-display text-sm font-semibold uppercase text-white/80"
                      style={{ fontFamily: "var(--font-barlow-condensed), sans-serif" }}
                    >
                      {step.title}
                    </h3>
                    <p className="mt-0.5 text-[0.825rem] leading-relaxed text-white/35" style={{ fontFamily: "var(--font-barlow), sans-serif", fontWeight: 300 }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Facility panel + badges */}
          <div className="space-y-6">
            {/* Operasyon Ağı panel */}
            <div
              className="rounded border border-white/[0.08] bg-[var(--navy-mid)] p-6"
              style={{
                backgroundImage: `linear-gradient(rgba(0,128,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,128,255,0.03) 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
              }}
            >
              <p
                className="mb-4 text-[0.7rem] font-medium text-[var(--tech-blue)]"
                style={{ fontFamily: "var(--font-ibm-plex-mono), monospace" }}
              >
                // Operasyon Ağı — Türkiye
              </p>
              <div className="space-y-2">
                {LOCATIONS.map((loc) => (
                  <div
                    key={loc.city}
                    className="flex items-center justify-between rounded px-3 py-2.5 transition-colors duration-300 hover:bg-[var(--tech-blue)]/10 hover:border-[var(--tech-blue)]/30 border border-transparent"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: loc.dotColor, boxShadow: loc.glow }}
                      />
                      <span className="text-sm font-medium text-white/90" style={{ fontFamily: "var(--font-ibm-plex-mono), monospace" }}>
                        {loc.city}
                      </span>
                      <span className="text-xs text-white/45" style={{ fontFamily: "var(--font-barlow), sans-serif" }}>
                        {loc.role}
                      </span>
                    </div>
                    <span
                      className="rounded px-2 py-0.5 text-[0.6rem] font-medium uppercase"
                      style={{
                        fontFamily: "var(--font-ibm-plex-mono), monospace",
                        color: loc.dotColor,
                        border: `1px solid ${loc.dotColor}40`,
                      }}
                    >
                      {loc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Standard badges 2x2 */}
            <div className="grid grid-cols-2 gap-px rounded overflow-hidden bg-[var(--navy-mid)] border border-white/[0.08]" style={{ gridTemplateColumns: "1fr 1fr" }}>
              {STANDARD_BADGES.map((b) => (
                <div
                  key={b.code}
                  className="flex items-center gap-2 bg-[var(--navy-mid)] p-3 transition-colors duration-300 hover:bg-[var(--tech-blue)]/10"
                >
                  <ShieldCheck className="h-4 w-4 shrink-0 text-[var(--amber)]" strokeWidth={1.5} />
                  <span className="text-[0.65rem] font-medium text-[var(--amber)]" style={{ fontFamily: "var(--font-ibm-plex-mono), monospace" }}>
                    {b.code}
                  </span>
                  <span className="w-px h-4 bg-white/15" />
                  <span className="text-[0.7rem] text-white/45 truncate" style={{ fontFamily: "var(--font-barlow), sans-serif", fontWeight: 300 }}>
                    {b.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
