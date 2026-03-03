"use client"

import { useEffect } from "react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Global app error", error)
  }, [error])

  return (
    <html lang="tr">
      <body className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-2xl font-semibold">
            Beklenmeyen bir hata oluştu
          </h1>
          <p className="text-sm text-muted-foreground">
            Teknik ekibimiz bilgilendirildi. Sayfayı yenilemeyi
            deneyebilir veya daha sonra tekrar uğrayabilirsiniz.
          </p>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center rounded-md bg-[var(--tech-blue)] px-4 py-2 text-sm font-medium text-white shadow hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--tech-blue)]"
          >
            Sayfayı Yenile
          </button>
        </div>
      </body>
    </html>
  )
}

