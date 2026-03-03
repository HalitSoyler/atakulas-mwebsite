"use client"

const TICKER_ITEMS = [
  "Yolcu Bilgilendirme Sistemleri",
  "IP Anons Altyapısı",
  "CCTV ve Güvenlik Gözetimi",
  "IP İnterkom Sistemleri",
  "PIS / PAS Çözümleri",
  "EN 50155 Sertifikalı Üretim",
  "Metro ve Hafif Raylı Sistemler",
  "TSE & ISO Uyumlu Ürünler",
]

export function TickerDirective() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <section
      aria-label="Faaliyet alanları"
      className="relative overflow-hidden border-y border-[var(--color-border)] bg-[var(--navy-deeper)] py-4"
    >
      {/* Fade masks */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
        style={{ background: "linear-gradient(to right, var(--navy-deeper), transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
        style={{ background: "linear-gradient(to left, var(--navy-deeper), transparent)" }}
      />

      <div className="flex w-max ticker-animate">
        {items.map((item, i) => (
          <span key={`${i}-${item}`} className="flex shrink-0 items-center gap-3.5 px-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--tech-blue)] opacity-70" />
            <span
              className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55"
              style={{ fontFamily: "var(--font-barlow)" }}
            >
              {item}
            </span>
          </span>
        ))}
      </div>
    </section>
  )
}
