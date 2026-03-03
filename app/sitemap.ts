import type { MetadataRoute } from "next"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.atakulasim.com.tr"

const staticRoutes: { path: string; priority?: number; changeFrequency?: "weekly" | "monthly" | "yearly" }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/hakkimizda", priority: 0.9, changeFrequency: "monthly" },
  { path: "/urunlerimiz", priority: 0.9, changeFrequency: "weekly" },
  { path: "/projelerimiz", priority: 0.9, changeFrequency: "weekly" },
  { path: "/projelerimiz/elektrikli-otobus", priority: 0.8, changeFrequency: "monthly" },
  { path: "/projelerimiz/istanbul-mobil", priority: 0.8, changeFrequency: "monthly" },
  { path: "/projelerimiz/metro-tramvay", priority: 0.8, changeFrequency: "monthly" },
  { path: "/projelerimiz/van-mobil", priority: 0.8, changeFrequency: "monthly" },
  { path: "/faaliyet-alanlari", priority: 0.8, changeFrequency: "monthly" },
  { path: "/hizmetler/elektrikli-otobus", priority: 0.8, changeFrequency: "monthly" },
  { path: "/iletisim", priority: 0.9, changeFrequency: "monthly" },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.map(({ path, priority = 0.7, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))
}
