/**
 * Banned words filter for AI prompt content moderation.
 * Used server-side (enforcement) and client-side (UX pre-validation).
 */

const BANNED_WORDS = new Set([
  // Violence / harm
  'murder',
  'kill',
  'assault',
  'torture',
  'gore',
  'mutilate',
  'dismember',
  'decapitate',
  'slaughter',
  'massacre',
  'genocide',
  // Hate speech
  'nazi',
  'swastika',
  'white supremacy',
  'ethnic cleansing',
  // Sexual / explicit
  'pornography',
  'nude',
  'naked',
  'explicit',
  'nsfw',
  'hentai',
  // Weapons / drugs
  'bomb',
  'explosive',
  'meth',
  'cocaine',
  'heroin',
  'fentanyl',
  // Self-harm
  'suicide',
  'self-harm',
  'cutting',
])

/** Server-side enforcement — returns true if any banned word is found. */
export function containsBannedWord(text: string): boolean {
  const lower = text.toLowerCase()
  for (const word of BANNED_WORDS) {
    if (lower.includes(word)) return true
  }
  return false
}

/** Client-side UX — returns the list of matched banned words for inline warnings. */
export function findBannedWords(text: string): string[] {
  const lower = text.toLowerCase()
  const matched: string[] = []
  for (const word of BANNED_WORDS) {
    if (lower.includes(word)) matched.push(word)
  }
  return matched
}
