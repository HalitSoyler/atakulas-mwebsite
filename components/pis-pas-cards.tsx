"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Monitor,
  Volume2,
  LayoutList,
  Phone,
  Video,
  FileSpreadsheet,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export type PISPasItem = {
  id: string
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  icon: React.ReactNode
  specs: { label: string; value: string }[]
  specsEn?: { label: string; value: string }[]
}

const defaultItems: PISPasItem[] = [
  {
    id: "ybs-panel",
    title: "YBS Panel PC",
    titleEn: "YBS Panel PC",
    description: "Yolcu bilgilendirme ve sürücü arayüzü için endüstriyel dokunmatik panel bilgisayar.",
    descriptionEn: "Industrial touch panel computer for passenger information and driver interface.",
    icon: <Monitor className="h-8 w-8" />,
    specs: [
      { label: "İşlemci", value: "Intel Celeron / Core i5" },
      { label: "Ekran", value: "10.1\" - 15.6\" dokunmatik, parlaklık ayarlı" },
      { label: "Haberleşme", value: "Ethernet, RS-485, CAN" },
      { label: "Standart", value: "EN 50155, EN 50121" },
      { label: "Çalışma sıcaklığı", value: "-25°C ~ +55°C" },
    ],
    specsEn: [
      { label: "Processor", value: "Intel Celeron / Core i5" },
      { label: "Display", value: "10.1\" - 15.6\" touch, brightness adjustable" },
      { label: "Communication", value: "Ethernet, RS-485, CAN" },
      { label: "Standard", value: "EN 50155, EN 50121" },
      { label: "Operating temp.", value: "-25°C ~ +55°C" },
    ],
  },
  {
    id: "anons",
    title: "Anons Ünitesi",
    titleEn: "Announcement Unit",
    description: "Otomatik ve manuel anons, TTS ve kayıt çalma için merkezi anons ünitesi.",
    descriptionEn: "Central announcement unit for automatic and manual announcements, TTS and playback.",
    icon: <Volume2 className="h-8 w-8" />,
    specs: [
      { label: "Çıkış", value: "4–8 kanal amplifikatör" },
      { label: "TTS", value: "Türkçe / İngilizce sentez" },
      { label: "Protokol", value: "RS-485, Ethernet" },
      { label: "Güç", value: "24–110 V DC" },
    ],
    specsEn: [
      { label: "Output", value: "4–8 channel amplifier" },
      { label: "TTS", value: "Turkish / English synthesis" },
      { label: "Protocol", value: "RS-485, Ethernet" },
      { label: "Power", value: "24–110 V DC" },
    ],
  },
  {
    id: "led-panels",
    title: "LED Güzergah Panelleri",
    titleEn: "LED Route Panels",
    description: "İç/dış hat ve güzergah bilgisi için RGB ve tek renk LED paneller.",
    descriptionEn: "RGB and single-color LED panels for interior/exterior line and route information.",
    icon: <LayoutList className="h-8 w-8" />,
    specs: [
      { label: "Piksel aralığı", value: "P4–P10 (iç), P10–P16 (dış)" },
      { label: "Renk", value: "Tek renk, RGB" },
      { label: "Haberleşme", value: "RS-485, Ethernet" },
      { label: "Koruma", value: "IP54 (dış)" },
    ],
    specsEn: [
      { label: "Pixel pitch", value: "P4–P10 (indoor), P10–P16 (outdoor)" },
      { label: "Color", value: "Single color, RGB" },
      { label: "Communication", value: "RS-485, Ethernet" },
      { label: "Protection", value: "IP54 (outdoor)" },
    ],
  },
  {
    id: "intercom",
    title: "İnterkom Üniteleri",
    titleEn: "Intercom Units",
    description: "Sürücü-yolcu ve acil durum iletişimi için RS-485 tabanlı interkom sistemi.",
    descriptionEn: "RS-485 based intercom system for driver-passenger and emergency communication.",
    icon: <Phone className="h-8 w-8" />,
    specs: [
      { label: "Protokol", value: "RS-485, özel protokol" },
      { label: "Besleme", value: "PoE veya 24 V DC" },
      { label: "TUBİTAK", value: "Yerli tasarım destekli" },
      { label: "Standart", value: "EN 50155" },
    ],
    specsEn: [
      { label: "Protocol", value: "RS-485, proprietary" },
      { label: "Power", value: "PoE or 24 V DC" },
      { label: "TUBITAK", value: "Domestic design supported" },
      { label: "Standard", value: "EN 50155" },
    ],
  },
  {
    id: "cctv",
    title: "CCTV İzleme Sistemi",
    titleEn: "CCTV Monitoring System",
    description: "Araç içi güvenlik kameraları ve NVR kayıt merkezi.",
    descriptionEn: "In-vehicle security cameras and NVR recording center.",
    icon: <Video className="h-8 w-8" />,
    specs: [
      { label: "Kamera", value: "IP, 1080p/2MP, IR" },
      { label: "Kayıt", value: "NVR, SD kart yedek" },
      { label: "Ağ", value: "PoE Switch üzerinden" },
      { label: "Yazılım", value: "Merkezi izleme yazılımı" },
    ],
    specsEn: [
      { label: "Camera", value: "IP, 1080p/2MP, IR" },
      { label: "Recording", value: "NVR, SD card backup" },
      { label: "Network", value: "Via PoE Switch" },
      { label: "Software", value: "Central monitoring software" },
    ],
  },
]

export function PISPasCards({
  items = defaultItems,
  language = "tr",
}: {
  items?: PISPasItem[]
  language?: "tr" | "en"
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: index * 0.06 }}
          className="group"
        >
          <div
            className={cn(
              "relative overflow-hidden rounded-2xl border border-white/10",
              "bg-white/5 backdrop-blur-xl",
              "shadow-lg shadow-black/10",
              "transition-all duration-300 hover:border-[#38bdf8]/30 hover:shadow-[0_0_40px_-8px_rgba(56,189,248,0.25)]"
            )}
          >
            <div className="p-6">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-[#38bdf8]/15 text-[#38bdf8] transition-colors group-hover:bg-[#38bdf8]/25">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-white">
                {language === "tr" ? item.title : item.titleEn}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {language === "tr" ? item.description : item.descriptionEn}
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "mt-4 inline-flex items-center gap-2 rounded-lg border border-[#38bdf8]/40 bg-[#38bdf8]/10 px-4 py-2 text-sm font-medium text-[#38bdf8]",
                      "transition-colors hover:bg-[#38bdf8]/20 hover:border-[#38bdf8]/60"
                    )}
                  >
                    <FileSpreadsheet className="h-4 w-4" />
                    {language === "tr" ? "Teknik Detay" : "Technical Detail"}
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-md border-white/10 bg-[#0f172a] text-white shadow-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-xl text-white">
                      {language === "tr" ? item.title : item.titleEn}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="mt-2 space-y-3">
                    {(language === "tr" ? item.specs : item.specsEn ?? item.specs).map((spec) => (
                      <div
                        key={spec.label}
                        className="flex justify-between gap-4 border-b border-white/10 py-2 last:border-0"
                      >
                        <span className="text-sm text-white/60">{spec.label}</span>
                        <span className="text-sm font-medium text-white">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
