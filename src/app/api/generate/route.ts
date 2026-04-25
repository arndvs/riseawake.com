import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import OpenAI from 'openai'
import { containsBannedWord } from '@/lib/banned-words'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const ALLOWED_MODELS = ['dall-e-3', 'gpt-image-1'] as const
type AllowedModel = (typeof ALLOWED_MODELS)[number]

function isAllowedModel(model: string): model is AllowedModel {
  return (ALLOWED_MODELS as readonly string[]).includes(model)
}

export async function POST(request: NextRequest) {
  // ─── Auth ─────────────────────────────────────────────────────────
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json(
      { error: 'Unauthorized', code: 'AUTH_REQUIRED' },
      { status: 401 },
    )
  }

  // ─── Kill switch ──────────────────────────────────────────────────
  if (process.env.NEXT_PUBLIC_GENERATION_ENABLED === 'false') {
    return NextResponse.json(
      { error: 'Generation is currently disabled', code: 'GENERATION_DISABLED' },
      { status: 503 },
    )
  }

  // ─── Parse body ───────────────────────────────────────────────────
  let body: { prompt?: string; model?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body', code: 'INVALID_BODY' },
      { status: 400 },
    )
  }

  const { prompt, model } = body

  if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
    return NextResponse.json(
      { error: 'Prompt is required', code: 'MISSING_PROMPT' },
      { status: 400 },
    )
  }

  if (prompt.length > 4000) {
    return NextResponse.json(
      { error: 'Prompt must be under 4000 characters', code: 'PROMPT_TOO_LONG' },
      { status: 400 },
    )
  }

  if (!model || !isAllowedModel(model)) {
    return NextResponse.json(
      { error: `Model must be one of: ${ALLOWED_MODELS.join(', ')}`, code: 'INVALID_MODEL' },
      { status: 400 },
    )
  }

  // ─── Banned word filter ───────────────────────────────────────────
  if (containsBannedWord(prompt)) {
    return NextResponse.json(
      { error: 'Prompt contains prohibited content', code: 'PROHIBITED_CONTENT' },
      { status: 400 },
    )
  }

  // ─── Generate ─────────────────────────────────────────────────────
  try {
    let images: string[]

    if (model === 'dall-e-3') {
      // DALL-E 3 only supports n:1, so we make 4 parallel calls
      const results = await Promise.all(
        Array.from({ length: 4 }, () =>
          openai.images.generate({
            model: 'dall-e-3',
            prompt: prompt.trim(),
            n: 1,
            size: '1024x1024',
            quality: 'hd',
          }),
        ),
      )
      images = results
        .map((r) => r.data[0]?.url)
        .filter((url): url is string => !!url)
    } else {
      // gpt-image-1 supports n:4
      const result = await openai.images.generate({
        model: 'gpt-image-1',
        prompt: prompt.trim(),
        n: 4,
        size: '1024x1024',
      })
      images = result.data
        .map((d) => d.url ?? (d.b64_json ? `data:image/png;base64,${d.b64_json}` : null))
        .filter((url): url is string => !!url)
    }

    return NextResponse.json({ images })
  } catch (err) {
    if (err instanceof OpenAI.APIError) {
      if (err.status === 429) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Try again later.', code: 'RATE_LIMITED' },
          { status: 429 },
        )
      }
      if (err.status === 400 && err.message?.includes('content_policy')) {
        return NextResponse.json(
          { error: 'Image rejected by content policy', code: 'CONTENT_POLICY' },
          { status: 400 },
        )
      }
      console.error('[api/generate] OpenAI error:', err.status, err.message)
      return NextResponse.json(
        { error: 'Image generation failed', code: 'GENERATION_FAILED' },
        { status: 502 },
      )
    }

    console.error('[api/generate] Unexpected error:', err)
    return NextResponse.json(
      { error: 'Internal server error', code: 'INTERNAL_ERROR' },
      { status: 500 },
    )
  }
}
