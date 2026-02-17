"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"

type Capability = {
  id: string
  title: string
  titleEn: string
  body: string
  bodyEn: string
  hoverGraphic: "waveform" | "codeflow" | "circuit" | "thermometer" | "modular" | "signal"
}

const CAPABILITIES: Capability[] = [
  {
    id: "emc",
    title: "Gelişmiş EMC/EMI İzolasyonu",
    titleEn: "Advanced EMC/EMI Isolation",
    body: "Raylı sistemlerdeki yüksek voltajlı elektromanyetik alanların sinyalizasyon üzerindeki etkilerini minimize eden, EN 50121 ve IEC 62236 standartlarında test edilmiş çok katmanlı izolasyon. Kablo yönlendirme ve shielding mühendisliği ile kritik sinyaller korunur.",
    bodyEn: "Multi-layer isolation tested to EN 50121 and IEC 62236 standards, minimizing effects of high-voltage electromagnetic fields in rail systems on signaling. Critical signals are protected through cable routing and shielding engineering.",
    hoverGraphic: "waveform",
  },
  {
    id: "control",
    title: "Akıllı Kontrol ve İzleme Sistemleri",
    titleEn: "Intelligent Control & Monitoring",
    body: "Merkezi SCADA entegrasyonu ve gerçek zamanlı durum takibi. Arıza teşhisi, önleyici bakım uyarıları ve kayıt tabanlı analiz ile operasyonel verimlilik artırılır. Sistem sağlığı sürekli izlenir.",
    bodyEn: "Central SCADA integration and real-time status tracking. Operational efficiency is increased through fault diagnosis, preventive maintenance alerts and record-based analysis. System health is continuously monitored.",
    hoverGraphic: "signal",
  },
  {
    id: "temp",
    title: "Endüstriyel Sıcaklık Aralıkları",
    titleEn: "Industrial Temperature Ranges",
    body: "EN 50155 sınıf Tx (-40°C ~ +70°C) sertifikalı geniş çalışma aralığı. Termal yönetim ve sıcaklık kompanzasyonu ile ekstrem iklim koşullarında kararlı performans. Soğuk başlatma ve ısıl şok direnci.",
    bodyEn: "Wide operating range certified to EN 50155 class Tx (-40°C ~ +70°C). Stable performance in extreme climate through thermal management and temperature compensation. Cold start and thermal shock resistance.",
    hoverGraphic: "thermometer",
  },
  {
    id: "ha",
    title: "Yüksek Erişilebilirlikli Yazılım Mimarisi",
    titleEn: "High-Availability Software Architecture",
    body: "Hata toleranslı, çift yol (redundant) mimari ve graceful degradation. Kritik servislerin kesintisiz çalışması için watchdog, otomatik yeniden başlatma ve state senkronizasyonu. Kod akışı ve modül bağımsızlığı.",
    bodyEn: "Fault-tolerant, redundant architecture and graceful degradation. Watchdog, auto-restart and state synchronization for uninterrupted critical services. Code flow and module independence.",
    hoverGraphic: "codeflow",
  },
  {
    id: "modular",
    title: "Modüler Kart ve Kablolama Yapısı",
    titleEn: "Modular Board & Cabling",
    body: "Değiştirilebilir alt modüller, DIN ray montaj ve standart konnektör kullanımı. Hızlı bakım ve parça değişimi. Kablo renk kodlaması ve dokümantasyon ile saha servisi kolaylaştırılır.",
    bodyEn: "Replaceable sub-modules, DIN rail mounting and standard connector use. Fast maintenance and part replacement. Field service simplified through cable color coding and documentation.",
    hoverGraphic: "modular",
  },
  {
    id: "remote",
    title: "Uzaktan Güncelleme ve Teşhis",
    titleEn: "Remote Update & Diagnostics",
    body: "OTA firmware güncelleme, uzaktan konfigürasyon ve log toplama. 4G/WiFi/Ethernet üzerinden merkezi yönetim. Arıza kodları ve performans metriği ile öngörülü bakım imkanı.",
    bodyEn: "OTA firmware updates, remote configuration and log collection. Central management over 4G/WiFi/Ethernet. Predictive maintenance through fault codes and performance metrics.",
    hoverGraphic: "signal",
  },
]

function CapabilityModule({
  capability,
  index,
  isBooted,
  language,
}: {
  capability: Capability
  index: number
  isBooted: boolean
  language: "tr" | "en"
}) {
  const [isHovered, setIsHovered] = useState(false)
  const title = language === "tr" ? capability.title : capability.titleEn
  const body = language === "tr" ? capability.body : capability.bodyEn

  return (
    <motion.div
      layoutId={`cap-${capability.id}`}
      initial={false}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "relative overflow-hidden rounded-lg border transition-all duration-300",
        "bg-white/80 dark:bg-[#0f172a]/60 backdrop-blur-sm",
        "border-stone-200 dark:border-[#38bdf8]/20",
        isHovered && "border-[#38bdf8]/60 shadow-[0_0_30px_-5px_rgba(56,189,248,0.3)]"
      )}
      whileHover={{
        scale: 1.02,
        zIndex: 10,
        transition: { duration: 0.2 },
      }}
      style={{ transformOrigin: "center" }}
    >
      {/* Bolt corners */}
      <div className="absolute top-2 left-2 w-2 h-2 rounded-sm bg-[#64748b]/60 border border-[#94a3b8]/40" />
      <div className="absolute top-2 right-2 w-2 h-2 rounded-sm bg-[#64748b]/60 border border-[#94a3b8]/40" />
      <div className="absolute bottom-2 left-2 w-2 h-2 rounded-sm bg-[#64748b]/60 border border-[#94a3b8]/40" />
      <div className="absolute bottom-2 right-2 w-2 h-2 rounded-sm bg-[#64748b]/60 border border-[#94a3b8]/40" />

      {/* Circuit lines — all edges */}
      <div
        className={cn(
          "absolute left-0 right-0 top-0 h-px transition-all duration-300",
          isHovered ? "bg-[#38bdf8]/80 shadow-[0_0_8px_rgba(56,189,248,0.4)]" : "bg-[#38bdf8]/30"
        )}
      />
      <div
        className={cn(
          "absolute left-0 right-0 bottom-0 h-px transition-all duration-300",
          isHovered ? "bg-[#38bdf8]/80 shadow-[0_0_8px_rgba(56,189,248,0.4)]" : "bg-[#38bdf8]/30"
        )}
      />
      <div
        className={cn(
          "absolute left-0 top-0 bottom-0 w-px transition-all duration-300",
          isHovered ? "bg-[#38bdf8]/80 shadow-[0_0_8px_rgba(56,189,248,0.4)]" : "bg-[#38bdf8]/30"
        )}
      />
      <div
        className={cn(
          "absolute right-0 top-0 bottom-0 w-px transition-all duration-300",
          isHovered ? "bg-[#38bdf8]/80 shadow-[0_0_8px_rgba(56,189,248,0.4)]" : "bg-[#38bdf8]/30"
        )}
      />

      {/* Pulsing LED */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        <motion.div
          className={cn(
            "w-1.5 h-1.5 rounded-full",
            isHovered ? "bg-[#38bdf8]" : "bg-emerald-500/80"
          )}
          animate={{
            opacity: [0.6, 1, 0.6],
            boxShadow: isHovered
              ? ["0 0 4px rgba(56,189,248,0.4)", "0 0 12px rgba(56,189,248,0.8)", "0 0 4px rgba(56,189,248,0.4)"]
              : ["0 0 2px rgba(34,197,94,0.3)", "0 0 6px rgba(34,197,94,0.6)", "0 0 2px rgba(34,197,94,0.3)"],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="text-[9px] text-stone-500 dark:text-white/40 font-mono uppercase tracking-wider">
          {isBooted ? "ON" : "—"}
        </span>
      </div>

      {/* Hover: soft technical graphic */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-500",
          isHovered ? "opacity-[0.1]" : "opacity-0"
        )}
      >
        {capability.hoverGraphic === "waveform" && (
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <path
              d="M 0 50 Q 25 30, 50 50 T 100 50 T 150 50 T 200 50"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="0.5"
            />
            <path
              d="M 0 70 Q 40 50, 80 70 T 160 70"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="0.3"
            />
          </svg>
        )}
        {capability.hoverGraphic === "codeflow" && (
          <div className="absolute inset-0 p-4 font-mono text-[8px] text-[#38bdf8] leading-relaxed opacity-60">
            <div className="animate-pulse">{"if (state) {"}</div>
            <div className="animate-pulse" style={{ animationDelay: "0.2s" }}>{"  sync();"}</div>
            <div className="animate-pulse" style={{ animationDelay: "0.4s" }}>{"}"}</div>
          </div>
        )}
        {capability.hoverGraphic === "signal" && (
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <line x1="0" y1="30" x2="100%" y2="30" stroke="#38bdf8" strokeWidth="0.3" />
            <line x1="0" y1="50" x2="80%" y2="50" stroke="#38bdf8" strokeWidth="0.3" />
            <line x1="0" y1="70" x2="60%" y2="70" stroke="#38bdf8" strokeWidth="0.3" />
          </svg>
        )}
        {capability.hoverGraphic === "thermometer" && (
          <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-16 h-24 opacity-50" viewBox="0 0 24 36" fill="none" stroke="#38bdf8" strokeWidth="0.8">
            <path d="M12 2v14l4 4a4 4 0 1 1-8 0l4-4V2" />
            <rect x="10.5" y="26" width="3" height="8" rx="1" />
          </svg>
        )}
        {capability.hoverGraphic === "modular" && (
          <div className="absolute inset-0 p-3 grid grid-cols-3 gap-1 opacity-50">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="border border-[#38bdf8]/40 rounded-sm" />
            ))}
          </div>
        )}
      </div>

      <div className="relative p-5 sm:p-6">
        <motion.h3
          className="font-mono text-sm font-semibold text-[#0f172a] dark:text-white tracking-wide"
          initial={{ opacity: 0 }}
          animate={isBooted ? { opacity: 1 } : {}}
          transition={{ duration: 0.15, delay: 0.5 + index * 0.08 }}
        >
          {title}
        </motion.h3>
        <motion.p
          className="mt-3 text-xs text-stone-600 dark:text-white/65 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={isBooted ? { opacity: 1 } : {}}
          transition={{ duration: 0.2, delay: 0.8 + index * 0.08 }}
        >
          {body}
        </motion.p>
      </div>
    </motion.div>
  )
}

export function IndustrialCapabilitiesPanel({ language = "tr" }: { language?: "tr" | "en" }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [scanComplete, setScanComplete] = useState(false)
  const [isBooted, setIsBooted] = useState(false)

  useEffect(() => {
    if (!isInView) return
    const t1 = setTimeout(() => setScanComplete(true), 900)
    const t2 = setTimeout(() => setIsBooted(true), 950)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [isInView])

  return (
    <section
      ref={ref}
      className="relative py-20 sm:py-24 overflow-hidden bg-stone-100 dark:bg-[#0f172a]"
    >
      {/* Carbon fiber / brushed metal texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(56,189,248,0.03) 2px, rgba(56,189,248,0.03) 4px),
            repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(56,189,248,0.02) 2px, rgba(56,189,248,0.02) 4px)
          `,
        }}
      />

      {/* Blueprint grid — very subtle, moving */}
      <div
        className="absolute inset-0 opacity-[0.02] industrial-blueprint-drift"
        style={{
          backgroundImage: `linear-gradient(rgba(56,189,248,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56,189,248,0.3) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#38bdf8] mb-2">
            {language === "tr" ? "TEKNİK YETKİNLİKLER" : "TECHNICAL CAPABILITIES"}
          </p>
          <h2 className="font-mono text-2xl sm:text-3xl font-semibold text-[#0f172a] dark:text-white tracking-wide">
            {language === "tr"
              ? "Raylı Sistemler İçin Mühendislik Altyapısı"
              : "Engineering Foundation for Rail Systems"}
          </h2>
        </motion.div>

        {/* Unified panel — 6 modules */}
        <motion.div
          className="relative rounded-xl border-2 border-stone-200 dark:border-[#38bdf8]/20 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3 }}
        >
          {/* Boot-up message overlay */}
          <AnimatePresence>
            {!isBooted && isInView && (
              <motion.div
                key="boot"
                className="absolute inset-0 z-30 flex items-center justify-center bg-stone-200/95 dark:bg-[#0f172a]/90 backdrop-blur-sm font-mono text-sm text-[#38bdf8]/80"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {language === "tr" ? "Sistem başlatılıyor..." : "System initializing..."}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scan-line overlay — sweeps top to bottom */}
          {isInView && !scanComplete && (
            <motion.div
              className="absolute inset-x-0 z-20 pointer-events-none"
              initial={{ top: 0 }}
              animate={{ top: "100%" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{
                height: 2,
                background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.7), transparent)",
                boxShadow: "0 0 20px rgba(56,189,248,0.5)",
              }}
            />
          )}

          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CAPABILITIES.map((cap, index) => (
                <CapabilityModule
                  key={cap.id}
                  capability={cap}
                  index={index}
                  isBooted={isBooted}
                  language={language}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

    </section>
  )
}
