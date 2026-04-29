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

/** Escape special regex characters in a string. */
function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/** Build a regex for a banned word — word-boundary for single words, substring for phrases. */
function buildMatcher(word: string): RegExp {
  if (word.includes(' ')) {
    // Multi-word phrases: substring match is intentional
    return new RegExp(escapeRegex(word), 'i')
  }
  // Single words: use word boundaries to avoid "skill" matching "kill"
  return new RegExp(`\\b${escapeRegex(word)}\\b`, 'i')
}

/** Server-side enforcement — returns true if any banned word is found. */
export function containsBannedWord(text: string): boolean {
  for (const word of BANNED_WORDS) {
    if (buildMatcher(word).test(text)) return true
  }
  return false
}

/** Client-side UX — returns the list of matched banned words for inline warnings. */
export function findBannedWords(text: string): string[] {
  const matched: string[] = []
  for (const word of BANNED_WORDS) {
    if (buildMatcher(word).test(text)) matched.push(word)
  }
  return matched
}
