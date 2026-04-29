/**
 * Email validation — suspicious email detection
 * Ported from AlignSD. Catches bot-generated addresses and disposable domains.
 */

interface EmailValidationResult {
  suspicious: boolean
  reason?: string
}

export function checkSuspiciousEmail(email: string): EmailValidationResult {
  const parts = email.toLowerCase().split('@')
  const localPart = parts[0]
  const domain = parts[1]

  if (!localPart || !domain) return { suspicious: false }

  // Gmail dot-stuffing detection (bots create aliases with excessive dots)
  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    const dotCount = (localPart.match(/\./g) ?? []).length
    if (dotCount >= 5) {
      return { suspicious: true, reason: `Gmail dot-stuffing: ${dotCount} dots` }
    }
  }

  // Consonant-heavy detection (bot-generated addresses lack vowels)
  const alphaCore = localPart.replace(/[^a-z]/g, '')
  if (alphaCore.length >= 5) {
    const vowelCount = (alphaCore.match(/[aeiou]/g) ?? []).length
    const vowelRatio = vowelCount / alphaCore.length
    if (vowelRatio < 0.15) {
      return { suspicious: true, reason: `Low vowel ratio: ${Math.round(vowelRatio * 100)}%` }
    }
  }

  // Disposable email domains
  const disposableDomains = new Set([
    'guerrillamail.com', 'guerrillamail.net', 'tempmail.com',
    'throwaway.email', 'mailinator.com', 'yopmail.com', 'dispostable.com',
    'sharklasers.com', 'grr.la', 'guerrillamailblock.com', 'maildrop.cc',
    'temp-mail.org', 'fakeinbox.com', 'trashmail.com', 'tempinbox.com',
    'throwawaymail.com', '10minutemail.com', 'minutemail.com',
  ])

  if (disposableDomains.has(domain)) {
    return { suspicious: true, reason: `Disposable domain: ${domain}` }
  }

  return { suspicious: false }
}
