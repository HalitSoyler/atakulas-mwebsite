"use client"

import { motion } from "framer-motion"
import { Network, Monitor, Volume2, LayoutList, Phone, Video } from "lucide-react"

type Lang = "tr" | "en"

const NODES: Array<{
  id: string
  label: string
  labelEn: string
  desc: string
  descEn: string
  icon: typeof Network
  connection: "poe" | "rs485"
  row: 1 | 2
}> = [
  {
    id: "poe",
    label: "PoE Switch",
    labelEn: "PoE Switch",
    desc: "Güç ve veri dağıtımı",
    descEn: "Power and data distribution",
    icon: Network,
    connection: "poe",
    row: 1,
  },
  {
    id: "ybs",
    label: "YBS Panel PC",
    labelEn: "YBS Panel PC",
    desc: "Merkezi kontrol ve içerik yönetimi",
    descEn: "Central control and content management",
    icon: Monitor,
    connection: "poe",
    row: 2,
  },
  {
    id: "cctv",
    label: "CCTV / NVR",
    labelEn: "CCTV / NVR",
    desc: "Kamera kayıt ve izleme",
    descEn: "Camera recording and monitoring",
    icon: Video,
    connection: "poe",
    row: 2,
  },
  {
    id: "intercom-poe",
    label: "İnterkom (PoE)",
    labelEn: "Intercom (PoE)",
    desc: "Acil çağrı, ağ üzerinden",
    descEn: "Emergency call over network",
    icon: Phone,
    connection: "poe",
    row: 2,
  },
  {
    id: "anons",
    label: "Anons Ünitesi",
    labelEn: "Announcement Unit",
    desc: "Ses çıkışı, YBS’den RS-485 ile",
    descEn: "Audio output, RS-485 from YBS",
    icon: Volume2,
    connection: "rs485",
    row: 2,
  },
  {
    id: "led",
    label: "LED Paneller",
    labelEn: "LED Panels",
    desc: "Güzergah bilgisi, RS-485 ile",
    descEn: "Route info via RS-485",
    icon: LayoutList,
    connection: "rs485",
    row: 2,
  },
]

export function SystemArchitecture({ language = "tr" }: { language?: Lang }) {
  const isEn = language === "en"
  const tier1 = NODES.filter((n) => n.row === 1)
  const tier2 = NODES.filter((n) => n.row === 2)
  const poeNodes = tier2.filter((n) => n.connection === "poe")
  const rs485Nodes = tier2.filter((n) => n.connection === "rs485")

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      className="relative"
    >
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        {/* Legend */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-6 border-b border-border pb-6">
          <div className="flex items-center gap-2">
            <div className="h-1 w-8 rounded-full bg-[#38bdf8]" aria-hidden />
            <span className="text-xs font-medium text-muted-foreground">
              Ethernet / PoE — {isEn ? "power + data" : "güç + veri"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-0.5 w-8 border-t-2 border-dashed border-amber-500" aria-hidden />
            <span className="text-xs font-medium text-muted-foreground">
              RS-485 — {isEn ? "control bus" : "kontrol hattı"}
            </span>
          </div>
        </div>

        {/* Diagram */}
        <div className="relative mx-auto max-w-4xl">
          {/* Tier 1: PoE Switch (single center node) */}
          <div className="flex justify-center">
            {tier1.map((node) => {
              const Icon = node.icon
              return (
                <div
                  key={node.id}
                  className="flex flex-col items-center rounded-xl border-2 border-[#38bdf8]/40 bg-[#38bdf8]/10 px-6 py-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#38bdf8]/20 text-[#0ea5e9]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="mt-2 text-sm font-semibold text-foreground">
                    {isEn ? node.labelEn : node.label}
                  </span>
                  <span className="mt-0.5 text-xs text-muted-foreground">
                    {isEn ? node.descEn : node.desc}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Connection lines from PoE Switch to Tier 2 (visual only, CSS) */}
          <div className="flex justify-center py-2">
            <div className="h-6 w-px bg-gradient-to-b from-[#38bdf8]/50 to-transparent" />
          </div>
          <div className="flex justify-center gap-4 px-4">
            <div className="h-px flex-1 max-w-[80px] bg-[#38bdf8]/30" />
            <div className="h-px flex-1 max-w-[80px] bg-[#38bdf8]/30" />
            <div className="h-px flex-1 max-w-[80px] bg-[#38bdf8]/30" />
          </div>

          {/* Tier 2: Devices in two groups — PoE and RS-485 */}
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            {/* PoE-connected devices */}
            <div className="space-y-3 rounded-xl border border-[#38bdf8]/25 bg-[#38bdf8]/5 p-4">
              <p className="text-center text-xs font-semibold uppercase tracking-wider text-[#0ea5e9]">
                {isEn ? "PoE connected" : "PoE bağlı"}
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {poeNodes.map((node) => {
                  const Icon = node.icon
                  return (
                    <div
                      key={node.id}
                      className="flex flex-col items-center rounded-lg border border-border bg-card p-3 text-center shadow-sm"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#38bdf8]/15 text-[#0ea5e9]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="mt-1.5 text-xs font-medium text-foreground">
                        {isEn ? node.labelEn : node.label}
                      </span>
                      <span className="mt-0.5 text-[10px] leading-tight text-muted-foreground">
                        {isEn ? node.descEn : node.desc}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* RS-485 connected (from YBS) */}
            <div className="space-y-3 rounded-xl border border-amber-500/25 bg-amber-500/5 p-4">
              <p className="text-center text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                {isEn ? "RS-485 from YBS" : "YBS’den RS-485"}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {rs485Nodes.map((node) => {
                  const Icon = node.icon
                  return (
                    <div
                      key={node.id}
                      className="flex flex-col items-center rounded-lg border border-border bg-card p-3 text-center shadow-sm"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/15 text-amber-700 dark:text-amber-400">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="mt-1.5 text-xs font-medium text-foreground">
                        {isEn ? node.labelEn : node.label}
                      </span>
                      <span className="mt-0.5 text-[10px] leading-tight text-muted-foreground">
                        {isEn ? node.descEn : node.desc}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* One-line summary */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {isEn
            ? "PoE Switch supplies power and data to the panel PC, CCTV and intercom; the panel PC controls announcement units and LED panels via RS-485."
            : "PoE Switch, panel PC, CCTV ve interkoma güç ve veri sağlar; panel PC anons üniteleri ve LED panelleri RS-485 ile yönetir."}
        </p>
      </div>
    </motion.section>
  )
}
