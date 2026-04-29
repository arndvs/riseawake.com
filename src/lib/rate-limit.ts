/**
 * In-memory rate limiter — ported from AlignSD
 * No external dependencies. Cleared on server restart (fine for rate limiting).
 */

interface RateLimitConfig {
  maxRequests: number
  windowMs: number
}

interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetAt: number
}

const memoryStore = new Map<string, { count: number; resetAt: number }>()

function cleanupStore(): void {
  if (memoryStore.size <= 10_000) return
  const now = Date.now()
  for (const [key, value] of memoryStore.entries()) {
    if (value.resetAt < now) memoryStore.delete(key)
  }
}

export function getClientIp(request: Request): string {
  const headers = request.headers

  const forwardedFor = headers.get('x-forwarded-for')
  if (forwardedFor) return forwardedFor.split(',')[0]!.trim()

  const realIp = headers.get('x-real-ip')
  if (realIp) return realIp.trim()

  const cfIp = headers.get('cf-connecting-ip')
  if (cfIp) return cfIp.trim()

  return 'unknown'
}

function shouldBypass(ip: string): boolean {
  if (process.env.NODE_ENV === 'development') return true
  if (ip === 'unknown' || ip === '127.0.0.1' || ip.startsWith('::ffff:127.0.0.1')) return true

  const allowlist = process.env.RATE_LIMIT_ALLOWLIST?.split(',').map((s) => s.trim()).filter(Boolean) ?? []

  return allowlist.includes(ip)
}

export function checkRateLimit(ip: string, config: RateLimitConfig): RateLimitResult {
  if (shouldBypass(ip)) {
    return { allowed: true, remaining: config.maxRequests, resetAt: Date.now() + config.windowMs }
  }

  const now = Date.now()
  const cacheKey = `rate-limit:${ip}`
  const entry = memoryStore.get(cacheKey)

  // Expired or fresh — start new window
  if (!entry || entry.resetAt < now) {
    memoryStore.set(cacheKey, { count: 1, resetAt: now + config.windowMs })
    cleanupStore()
    return { allowed: true, remaining: config.maxRequests - 1, resetAt: now + config.windowMs }
  }

  // Over limit
  if (entry.count >= config.maxRequests) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt }
  }

  // Increment
  entry.count += 1
  return { allowed: true, remaining: config.maxRequests - entry.count, resetAt: entry.resetAt }
}

export const REFERRAL_RATE_LIMIT = {
  maxRequests: 5,
  windowMs: 24 * 60 * 60 * 1000, // 24 hours — 5 referrals per day
} satisfies RateLimitConfig
