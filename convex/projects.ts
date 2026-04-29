import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

// ─── Mutations ───────────────────────────────────────────────────────────────

export const createProject = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    type: v.union(
      v.literal('film'),
      v.literal('marketing'),
      v.literal('exploration'),
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Unauthorized')

    return await ctx.db.insert('projects', {
      ...args,
      createdBy: identity.tokenIdentifier,
    })
  },
})

export const updateProject = mutation({
  args: {
    id: v.id('projects'),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    type: v.optional(
      v.union(
        v.literal('film'),
        v.literal('marketing'),
        v.literal('exploration'),
      ),
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Unauthorized')

    const project = await ctx.db.get(args.id)
    if (!project) throw new Error('Project not found')
    if (project.createdBy !== identity.tokenIdentifier) {
      throw new Error('Only the creator can edit this project')
    }

    const { id, ...fields } = args
    const patch: Record<string, unknown> = {}
    if (fields.name !== undefined) patch.name = fields.name
    if (fields.description !== undefined) patch.description = fields.description
    if (fields.type !== undefined) patch.type = fields.type

    await ctx.db.patch(id, patch)
  },
})

export const deleteProject = mutation({
  args: { id: v.id('projects') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Unauthorized')

    const project = await ctx.db.get(args.id)
    if (!project) throw new Error('Project not found')
    if (project.createdBy !== identity.tokenIdentifier) {
      throw new Error('Only the creator can delete this project')
    }

    // Check for associated media
    const associatedMedia = await ctx.db
      .query('media')
      .withIndex('by_projectId', (q) => q.eq('projectId', args.id))
      .take(1)
    if (associatedMedia.length > 0) {
      throw new Error('Cannot delete project with associated media')
    }

    await ctx.db.delete(args.id)
  },
})

// ─── Queries ─────────────────────────────────────────────────────────────────

export const listProjects = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error('Unauthorized')

    return await ctx.db
      .query('projects')
      .withIndex('by_createdBy', (q) =>
        q.eq('createdBy', identity.tokenIdentifier),
      )
      .order('desc')
      .take(100)
  },
})

export const getProject = query({
  args: { id: v.id('projects') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})
