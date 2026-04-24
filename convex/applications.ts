import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

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

export const getApplication = query({
  args: { id: v.id('applications') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id)
  },
})

export const getResumeUrl = query({
  args: { storageId: v.id('_storage') },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId)
  },
})

export const updateApplicationStatus = mutation({
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

export const setFictional = mutation({
  args: {
    id: v.id('applications'),
    fictional: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { fictional: args.fictional })
  },
})
