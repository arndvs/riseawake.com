import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

// ─── Valid status transitions ────────────────────────────────────────────────

const VALID_TRANSITIONS: Record<string, string[]> = {
  draft: ['ready_for_review'],
  ready_for_review: ['draft', 'approved', 'needs_changes', 'rejected'],
  needs_changes: ['ready_for_review'],
  // approved and rejected are terminal — no outbound transitions
}

// ─── Mutations ───────────────────────────────────────────────────────────────

export const saveMedia = mutation({
  args: {
    imagekitFileId: v.string(),
    imagekitUrl: v.string(),
    prompt: v.string(),
    model: v.string(),
    tags: v.array(v.string()),
    projectId: v.optional(v.id('projects')),
    shotNumber: v.optional(v.number()),
    transformations: v.optional(v.string()),
    parentId: v.optional(v.id('media')),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Unauthorized')

    return await ctx.db.insert('media', {
      ...args,
      status: 'draft',
      createdBy: identity.tokenIdentifier,
      createdByName: identity.name ?? 'Unknown',
    })
  },
})

export const updateMediaStatus = mutation({
  args: {
    id: v.id('media'),
    newStatus: v.union(
      v.literal('draft'),
      v.literal('ready_for_review'),
      v.literal('approved'),
      v.literal('needs_changes'),
      v.literal('rejected'),
    ),
    commentText: v.string(),
    // For anon reviewers on /internal/media
    authorIdentifier: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const media = await ctx.db.get(args.id)
    if (!media) throw new Error('Media not found')

    const allowed = VALID_TRANSITIONS[media.status]
    if (!allowed || !allowed.includes(args.newStatus)) {
      throw new Error(
        `Invalid transition: ${media.status} → ${args.newStatus}`,
      )
    }

    const identity = await ctx.auth.getUserIdentity()

    // Creator-only transitions: draft↔ready_for_review
    if (
      args.newStatus === 'ready_for_review' &&
      media.status === 'draft'
    ) {
      if (!identity) throw new Error('Unauthorized')
      if (identity.tokenIdentifier !== media.createdBy) {
        throw new Error('Only the creator can submit for review')
      }
    }
    if (args.newStatus === 'draft' && media.status === 'ready_for_review') {
      if (!identity) throw new Error('Unauthorized')
      if (identity.tokenIdentifier !== media.createdBy) {
        throw new Error('Only the creator can pull back to draft')
      }
    }

    // Resubmit after needs_changes — creator only
    if (
      args.newStatus === 'ready_for_review' &&
      media.status === 'needs_changes'
    ) {
      if (!identity) throw new Error('Unauthorized')
      if (identity.tokenIdentifier !== media.createdBy) {
        throw new Error('Only the creator can resubmit')
      }
    }

    // Review transitions (approve/reject/needs_changes) — allow anon reviewers
    const isReviewTransition = ['approved', 'needs_changes', 'rejected'].includes(
      args.newStatus,
    )

    let authorType: 'clerk' | 'anon'
    let authorIdentifier: string
    let authorDisplayName: string

    if (identity) {
      authorType = 'clerk'
      authorIdentifier = identity.tokenIdentifier
      authorDisplayName = identity.name ?? 'Unknown'
    } else if (isReviewTransition && args.authorIdentifier) {
      authorType = 'anon'
      authorIdentifier = args.authorIdentifier
      authorDisplayName = 'Reviewer'
    } else {
      throw new Error('Unauthorized')
    }

    // Atomic: update status + insert comment
    await ctx.db.patch(args.id, { status: args.newStatus })
    await ctx.db.insert('mediaComments', {
      mediaId: args.id,
      text: args.commentText,
      authorType,
      authorIdentifier,
      authorDisplayName,
      statusChange: {
        from: media.status,
        to: args.newStatus,
      },
    })
  },
})

export const deleteMedia = mutation({
  args: { id: v.id('media') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Unauthorized')

    const media = await ctx.db.get(args.id)
    if (!media) throw new Error('Media not found')
    if (media.status !== 'draft') {
      throw new Error('Only draft media can be deleted')
    }
    if (media.createdBy !== identity.tokenIdentifier) {
      throw new Error('Only the creator can delete this media')
    }

    await ctx.db.delete(args.id)
  },
})

export const patchMedia = mutation({
  args: {
    id: v.id('media'),
    tags: v.optional(v.array(v.string())),
    projectId: v.optional(v.id('projects')),
    shotNumber: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Unauthorized')

    const media = await ctx.db.get(args.id)
    if (!media) throw new Error('Media not found')
    if (media.createdBy !== identity.tokenIdentifier) {
      throw new Error('Only the creator can edit this media')
    }

    const { id, ...fields } = args
    // Remove undefined fields so we don't overwrite with undefined
    const patch: Record<string, unknown> = {}
    if (fields.tags !== undefined) patch.tags = fields.tags
    if (fields.projectId !== undefined) patch.projectId = fields.projectId
    if (fields.shotNumber !== undefined) patch.shotNumber = fields.shotNumber

    await ctx.db.patch(id, patch)
  },
})

// ─── Queries ─────────────────────────────────────────────────────────────────

export const listMedia = query({
  args: {
    status: v.optional(
      v.union(
        v.literal('draft'),
        v.literal('ready_for_review'),
        v.literal('approved'),
        v.literal('needs_changes'),
        v.literal('rejected'),
      ),
    ),
    projectId: v.optional(v.id('projects')),
  },
  handler: async (ctx, args) => {
    // If filtering by status + identity, use the compound index
    const identity = await ctx.auth.getUserIdentity()

    if (args.status && identity) {
      const results = await ctx.db
        .query('media')
        .withIndex('by_status_and_createdBy', (q) =>
          q.eq('status', args.status!).eq('createdBy', identity.tokenIdentifier),
        )
        .order('desc')
        .take(50)

      if (args.projectId) {
        return results.filter((m) => m.projectId === args.projectId)
      }
      return results
    }

    if (args.status) {
      const results = await ctx.db
        .query('media')
        .withIndex('by_status', (q) => q.eq('status', args.status!))
        .order('desc')
        .take(50)

      if (args.projectId) {
        return results.filter((m) => m.projectId === args.projectId)
      }
      return results
    }

    if (identity) {
      const results = await ctx.db
        .query('media')
        .withIndex('by_createdBy', (q) =>
          q.eq('createdBy', identity.tokenIdentifier),
        )
        .order('desc')
        .take(50)

      if (args.projectId) {
        return results.filter((m) => m.projectId === args.projectId)
      }
      return results
    }

    // Unauthenticated — return all (for /internal/media review)
    const results = await ctx.db
      .query('media')
      .order('desc')
      .take(50)

    if (args.projectId) {
      return results.filter((m) => m.projectId === args.projectId)
    }
    return results
  },
})

export const getMedia = query({
  args: { id: v.id('media') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})

export const listMediaByProject = query({
  args: { projectId: v.id('projects') },
  handler: async (ctx, args) => {
    const results = await ctx.db
      .query('media')
      .withIndex('by_projectId', (q) => q.eq('projectId', args.projectId))
      .order('desc')
      .take(200)

    // Sort by shotNumber for display (nulls last)
    return results.sort((a, b) => {
      if (a.shotNumber == null && b.shotNumber == null) return 0
      if (a.shotNumber == null) return 1
      if (b.shotNumber == null) return -1
      return a.shotNumber - b.shotNumber
    })
  },
})
