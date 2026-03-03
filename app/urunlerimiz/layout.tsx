import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ürünlerimiz | PIS/PAS, CCTV, IP Anons | Atak Ulaşım",
  description:
    "Metro ve tramvay için yolcu bilgilendirme sistemleri (PIS/PAS), sürücü kontrol üniteleri, anons/amfi, CCTV ve IP iletişim ekipmanları.",
  openGraph: {
    title: "Ürünlerimiz | Atak Ulaşım",
    description:
      "PIS/PAS, CCTV, IP Anons ve raylı sistem ekipmanları. EN 50155, EN 50121 sertifikalı çözümler.",
  },
}

export default function UrunlerimizLayout({ children }: { children: React.ReactNode }) {
  return children
}
