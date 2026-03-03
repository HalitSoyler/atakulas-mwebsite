import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projelerimiz | Atak Ulaşım",
  description:
    "İstanbul mobil otobüs, metro-tramvay, elektrikli otobüs ve van mobil projeleri. IETT, Bozankaya, Siemens ve diğer referanslar.",
  openGraph: {
    title: "Projelerimiz | Atak Ulaşım",
    description:
      "Türkiye ve yurt dışı raylı sistem ve toplu taşıma projeleri. CCTV, PIS/PAS, yolcu bilgilendirme sistemleri.",
  },
}

export default function ProjelerimizLayout({ children }: { children: React.ReactNode }) {
  return children
}
