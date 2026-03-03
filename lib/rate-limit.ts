type RateLimitEntry = {
  count: number
  firstRequestAt: number
}

type RateLimitConfig = {
  windowMs: number
  maxRequests: number
}

const DEFAULT_WINDOW_MS = 60_000
const DEFAULT_MAX_REQUESTS = 5

const globalStore =
  (globalThis as any).__atak_rate_limit_store ??
  new Map<string, RateLimitEntry>()

if (!(globalThis as any).__atak_rate_limit_store) {
  ;(globalThis as any).__atak_rate_limit_store =
    globalStore
}

export function checkRateLimit(
  key: string,
  config: Partial<RateLimitConfig> = {},
): { allowed: boolean; remaining: number } {
  const windowMs =
    config.windowMs ?? DEFAULT_WINDOW_MS
  const maxRequests =
    config.maxRequests ?? DEFAULT_MAX_REQUESTS

  const now = Date.now()
  const entry = globalStore.get(key)

  if (!entry) {
    globalStore.set(key, {
      count: 1,
      firstRequestAt: now,
    })
    return {
      allowed: true,
      remaining: maxRequests - 1,
    }
  }

  if (now - entry.firstRequestAt > windowMs) {
    globalStore.set(key, {
      count: 1,
      firstRequestAt: now,
    })
    return {
      allowed: true,
      remaining: maxRequests - 1,
    }
  }

  if (entry.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
    }
  }

  entry.count += 1
  globalStore.set(key, entry)

  return {
    allowed: true,
    remaining: maxRequests - entry.count,
  }
}

