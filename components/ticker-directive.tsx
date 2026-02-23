"use client"

const TICKER_ITEMS = [
  "Yolcu Bilgilendirme Sistemleri",
  "IP Anons Altyapısı",
  "CCTV ve Güvenlik Gözetimi",
  "IP İnterkom Sistemleri",
  "PIS / PAS Çözümleri",
  "EN 50155 Sertifikalı Üretim",
  "Kayseri Teknopark Ar-Ge",
  "Gömülü Yazılım Geliştirme",
  "Metro ve Hafif Raylı Sistemler",
  "Uçtan Uca Ekosistem",
]

export function TickerDirective() {
  const duplicated = [...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <section
      aria-label="Teknoloji alanları"
      className="border-t border-b border-white/[0.06] bg-[var(--navy-dark)] py-3 overflow-hidden"
    >
      <div className="flex w-max" style={{ animation: "ticker 30s linear infinite" }}>
        {duplicated.map((item, i) => (
          <div
            key={`${i}-${item}`}
            className="flex shrink-0 items-center gap-2 px-6"
            style={{ fontFamily: "var(--font-ibm-plex-mono), monospace" }}
          >
            <span className="h-1 w-1 rounded-full bg-[var(--tech-blue)]" />
            <span className="text-[0.65rem] font-medium uppercase tracking-[0.08em] text-white/30">{item}</span>
            <span className="text-white/20">|</span>
          </div>
        ))}
      </div>
    </section>
  )
}
