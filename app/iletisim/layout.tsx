import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "İletişim | Atak Ulaşım",
  description:
    "Atak Ulaşım ile iletişime geçin. Ankara merkez ofis ve Kayseri Teknopark şube. Teknik bilgi, proje talepleri ve kurumsal iletişim.",
  openGraph: {
    title: "İletişim | Atak Ulaşım",
    description:
      "Atak Ulaşım ile iletişime geçin. Ankara merkez ofis ve Kayseri Teknopark şube.",
  },
}

export default function IletisimLayout({ children }: { children: React.ReactNode }) {
  return children
}
