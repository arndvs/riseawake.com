/**
 * IPHub geo-blocking — ported from AlignSD
 *
 * Checks IP reputation via IPHub v2 API. Blocks:
 * - Proxies, VPNs, datacenter IPs (block=1)
 * - Tor exit nodes, mixed-use ranges (block=2)
 * - Manually blocklisted IPs/CIDRs
 *
 * Allows all countries (RISE ships globally).
 * Whitelists iCloud Private Relay to avoid blocking Apple users.
 * Fails open when API is unavailable — prefer false negatives over blocking customers.
 */

interface IPHubResponse {
  ip: string
  hostname?: string
  asn: number
  isp: string
  countryCode: string
  countryName: string
  block: 0 | 1 | 2
}

export interface IPCheckResult {
  allowed: boolean
  reason: string
  cached: boolean
  data?: IPHubResponse
}

// ── 24-hour TTL cache ────────────────────────────────────────────────────────

const cache = new Map<string, { result: IPCheckResult; expiresAt: number }>()
const CACHE_TTL_MS = 24 * 60 * 60 * 1000

function getCached(ip: string): IPCheckResult | null {
  const entry = cache.get(ip)
  if (!entry) return null
  if (entry.expiresAt < Date.now()) {
    cache.delete(ip)
    return null
  }
  return { ...entry.result, cached: true }
}

function setCache(ip: string, result: IPCheckResult): void {
  if (cache.size > 50_000) {
    const now = Date.now()
    for (const [key, val] of cache.entries()) {
      if (val.expiresAt < now) cache.delete(key)
    }
  }
  cache.set(ip, { result, expiresAt: Date.now() + CACHE_TTL_MS })
}

// ── CIDR matching ────────────────────────────────────────────────────────────

function ipToNumber(ip: string): number {
  const parts = ip.split('.')
  if (parts.length !== 4) return 0
  return parts.reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0
}

function isInCidr(ip: string, cidr: string): boolean {
  const [range, bits] = cidr.split('/')
  if (!range || !bits) return false
  const mask = ~((1 << (32 - parseInt(bits, 10))) - 1) >>> 0
  return (ipToNumber(ip) & mask) === (ipToNumber(range) & mask)
}

// ── Manual blocklist ─────────────────────────────────────────────────────────

function isManuallyBlocked(ip: string): boolean {
  const blocklist =
    process.env.BLOCKED_IPS?.split(',')
      .map((s) => s.trim())
      .filter(Boolean) ?? []

  return blocklist.some((entry) =>
    entry.includes('/') ? isInCidr(ip, entry) : entry === ip,
  )
}

// ── iCloud Private Relay detection ───────────────────────────────────────────

function isICloudPrivateRelay(data: IPHubResponse): boolean {
  const isp = data.isp.toLowerCase()
  return (
    (data.block === 1 || data.block === 2) &&
    (isp.includes('icloud private relay') ||
      isp.includes('apple') ||
      isp.includes('akamai'))
  )
}

// ── Main check ───────────────────────────────────────────────────────────────

export async function checkIPHub(ip: string): Promise<IPCheckResult> {
  // Bypass in dev
  if (process.env.NODE_ENV === 'development') {
    return { allowed: true, reason: 'bypassed', cached: false }
  }

  // Bypass localhost
  if (ip === 'unknown' || ip === '127.0.0.1' || ip === '::1' || ip === '::ffff:127.0.0.1') {
    return { allowed: true, reason: 'bypassed', cached: false }
  }

  // No API key — fail open
  const apiKey = process.env.IPHUB_API_KEY
  if (!apiKey) {
    return { allowed: true, reason: 'no_api_key', cached: false }
  }

  // Manual blocklist
  if (isManuallyBlocked(ip)) {
    return { allowed: false, reason: 'manually_blocked', cached: false }
  }

  // Check cache
  const cached = getCached(ip)
  if (cached) return cached

  // Call IPHub API
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5_000)

    const response = await fetch(`https://v2.api.iphub.info/ip/${encodeURIComponent(ip)}`, {
      headers: { 'X-Key': apiKey },
      signal: controller.signal,
    })

    clearTimeout(timeout)

    if (!response.ok) {
      // Fail open — don't block customers because IPHub is down
      return { allowed: true, reason: 'api_error', cached: false }
    }

    const data = (await response.json()) as IPHubResponse

    // Whitelist iCloud Private Relay
    if (isICloudPrivateRelay(data)) {
      const result: IPCheckResult = { allowed: true, reason: 'icloud_private_relay', cached: false, data }
      setCache(ip, result)
      return result
    }

    // block=0 is residential/business (safe)
    // block=1 is non-residential/proxy/VPN (block)
    // block=2 is mixed/Tor (block)
    if (data.block === 0) {
      const result: IPCheckResult = { allowed: true, reason: 'clean', cached: false, data }
      setCache(ip, result)
      return result
    }

    const result: IPCheckResult = {
      allowed: false,
      reason: 'proxy_vpn_detected',
      cached: false,
      data,
    }
    setCache(ip, result)
    return result
  } catch (err) {
    // Network error / timeout — fail open
    console.error('[ip-check] IPHub API error:', err)
    return { allowed: true, reason: 'api_error', cached: false }
  }
}
