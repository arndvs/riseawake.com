import { v } from 'convex/values'
import { internalMutation, query } from './_generated/server'

// ─── Mutations ───────────────────────────────────────────────────────────────
// Prompt categories are admin-managed. Only internal mutations for seeding.

export const upsertCategory = internalMutation({
  args: {
    name: v.string(),
    scope: v.union(v.literal('universal'), v.literal('rise')),
    options: v.array(v.string()),
    sortOrder: v.number(),
  },
  handler: async (ctx, args) => {
    // Find existing by name + scope
    const existing = await ctx.db
      .query('promptCategories')
      .withIndex('by_scope', (q) => q.eq('scope', args.scope))
      .take(200)

    const match = existing.find((c) => c.name === args.name)
    if (match) {
      await ctx.db.patch(match._id, {
        options: args.options,
        sortOrder: args.sortOrder,
      })
      return match._id
    }

    return await ctx.db.insert('promptCategories', args)
  },
})

// ─── Queries ─────────────────────────────────────────────────────────────────

export const listCategories = query({
  args: {
    scope: v.optional(
      v.union(v.literal('universal'), v.literal('rise')),
    ),
  },
  handler: async (ctx, args) => {
    if (args.scope) {
      const results = await ctx.db
        .query('promptCategories')
        .withIndex('by_scope', (q) => q.eq('scope', args.scope!))
        .take(100)
      return results.sort((a, b) => a.sortOrder - b.sortOrder)
    }

    const results = await ctx.db
      .query('promptCategories')
      .take(100)
    return results.sort((a, b) => a.sortOrder - b.sortOrder)
  },
})
