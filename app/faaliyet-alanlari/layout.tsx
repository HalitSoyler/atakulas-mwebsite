import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Faaliyet Alanları | Atak Ulaşım",
  description:
    "Otomatik anons, PIS/PAS, telsiz ve fiber haberleşme, CCTV ve güvenlik sistemleri. Raylı sistem ve toplu taşıma için entegre çözümler.",
  openGraph: {
    title: "Faaliyet Alanları | Atak Ulaşım",
    description:
      "Raylı sistem ve toplu taşıma için anons, bilgilendirme, haberleşme ve güvenlik sistemleri.",
  },
}

export default function FaaliyetAlanlariLayout({ children }: { children: React.ReactNode }) {
  return children
}
