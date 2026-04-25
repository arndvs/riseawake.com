import { v } from 'convex/values'
import {
  mutation,
  query,
  internalMutation,
  internalQuery,
} from './_generated/server'

export const submitApplication = mutation({
  args: {
    roleId: v.string(),
    roleTitle: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
    experienceLevel: v.string(),
    availability: v.string(),
    whyJoinRise: v.string(),
    roleSpecificAnswers: v.any(),
    resumeFileName: v.optional(v.string()),
    resumeFileSize: v.optional(v.number()),
    resumeStorageId: v.optional(v.id('_storage')),
    ipAddress: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const applicationId = await ctx.db.insert('applications', {
      ...args,
      status: 'needs_review',
      submittedAt: Date.now(),
      fictional: false,
    })
    return applicationId
  },
})

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl()
  },
})

// Public query — intentionally unauthenticated.
// Only returns fictional (in-universe) applications (fictional: true).
// Real submissions are never exposed. See /internal/applications/page.tsx.
export const listApplications = query({
  args: {
    status: v.optional(
      v.union(
        v.literal('needs_review'),
        v.literal('reviewed'),
        v.literal('archived'),
        v.literal('flagged'),
      ),
    ),
    roleId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Public query: only returns fictional (in-universe) applications.
    // Real submissions (fictional: false) are never exposed here.
    const all = await ctx.db
      .query('applications')
      .withIndex('by_fictional', (q) => q.eq('fictional', true))
      .order('desc')
      .take(200)

    let results = all
    if (args.status) {
      results = results.filter((a) => a.status === args.status)
    }
    if (args.roleId) {
      results = results.filter((a) => a.roleId === args.roleId)
    }
    return results.slice(0, 100)
  },
})

export const getApplication = internalQuery({
  args: { id: v.id('applications') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})

export const getResumeUrl = internalQuery({
  args: { storageId: v.id('_storage') },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId)
  },
})

export const updateApplicationStatus = internalMutation({
  args: {
    id: v.id('applications'),
    status: v.union(
      v.literal('needs_review'),
      v.literal('reviewed'),
      v.literal('archived'),
      v.literal('flagged'),
    ),
    reviewedBy: v.optional(v.string()),
    reviewNotes: v.optional(v.string()),
    breachFlag: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args
    await ctx.db.patch(id, fields)
  },
})

export const setFictional = internalMutation({
  args: {
    id: v.id('applications'),
    fictional: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { fictional: args.fictional })
  },
})

export const deleteApplication = internalMutation({
  args: { id: v.id('applications') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
})

// ─── Seed helpers ─────────────────────────────────────────────────────────
// Public mutations used only by scripts/seed-fictional-applications.tsx.
// These are safe because they only operate on fictional data.

export const seedFictionalApplication = mutation({
  args: {
    roleId: v.string(),
    roleTitle: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
    experienceLevel: v.string(),
    availability: v.string(),
    whyJoinRise: v.string(),
    roleSpecificAnswers: v.any(),
    status: v.union(
      v.literal('needs_review'),
      v.literal('reviewed'),
      v.literal('archived'),
      v.literal('flagged'),
    ),
    breachFlag: v.optional(v.boolean()),
    reviewedBy: v.optional(v.string()),
    reviewNotes: v.optional(v.string()),
    submittedAt: v.number(),
  },
  handler: async (ctx, args) => {
    const { status, breachFlag, reviewedBy, reviewNotes, submittedAt, ...fields } = args
    const id = await ctx.db.insert('applications', {
      ...fields,
      status,
      submittedAt,
      fictional: true,
      ...(breachFlag !== undefined ? { breachFlag } : {}),
      ...(reviewedBy ? { reviewedBy } : {}),
      ...(reviewNotes ? { reviewNotes } : {}),
    })
    return id
  },
})

export const clearFictionalApplications = mutation({
  args: {},
  handler: async (ctx) => {
    const fictional = await ctx.db
      .query('applications')
      .withIndex('by_fictional', (q) => q.eq('fictional', true))
      .collect()
    for (const app of fictional) {
      await ctx.db.delete(app._id)
    }
    return fictional.length
  },
})
