/**
 * Banned words filter for AI prompt content moderation.
 * Checked server-side before any OpenAI API call.
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

export function containsBannedWord(text: string): boolean {
  const lower = text.toLowerCase()
  for (const word of BANNED_WORDS) {
    if (lower.includes(word)) return true
  }
  return false
}
