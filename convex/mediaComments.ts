import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

// ─── Mutations ───────────────────────────────────────────────────────────────

export const addComment = mutation({
  args: {
    mediaId: v.id('media'),
    text: v.string(),
    // For anon commenters on /internal/media
    authorIdentifier: v.optional(v.string()),
    authorDisplayName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const media = await ctx.db.get(args.mediaId)
    if (!media) throw new Error('Media not found')

    const identity = await ctx.auth.getUserIdentity()

    let authorType: 'clerk' | 'anon'
    let authorIdentifier: string
    let authorDisplayName: string

    if (identity) {
      authorType = 'clerk'
      authorIdentifier = identity.tokenIdentifier
      authorDisplayName = identity.name ?? 'Unknown'
    } else if (args.authorIdentifier) {
      authorType = 'anon'
      authorIdentifier = args.authorIdentifier
      authorDisplayName = args.authorDisplayName ?? 'Anonymous'
    } else {
      throw new Error('Must provide authorIdentifier for anonymous comments')
    }

    return await ctx.db.insert('mediaComments', {
      mediaId: args.mediaId,
      text: args.text,
      authorType,
      authorIdentifier,
      authorDisplayName,
    })
  },
})

// ─── Queries ─────────────────────────────────────────────────────────────────

export const listComments = query({
  args: { mediaId: v.id('media') },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('mediaComments')
      .withIndex('by_mediaId', (q) => q.eq('mediaId', args.mediaId))
      .order('asc')
      .take(200)
  },
})
