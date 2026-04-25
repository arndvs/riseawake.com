import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  applications: defineTable({
    // Core
    roleId: v.string(),
    roleTitle: v.string(),
    status: v.union(
      v.literal('needs_review'),
      v.literal('reviewed'),
      v.literal('archived'),
      v.literal('flagged'),
    ),
    submittedAt: v.number(),

    // Personal
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),

    // Professional
    experienceLevel: v.string(),
    availability: v.string(),
    whyJoinRise: v.string(),

    // Role-specific (flexible object — different fields per role)
    roleSpecificAnswers: v.any(),

    // Resume
    resumeFileName: v.optional(v.string()),
    resumeFileSize: v.optional(v.number()),
    resumeStorageId: v.optional(v.id('_storage')),

    // Meta
    ipAddress: v.optional(v.string()),
    reviewedBy: v.optional(v.string()),
    reviewNotes: v.optional(v.string()),
    breachFlag: v.optional(v.boolean()),

    // Visibility — fictional applications are in-universe narrative entries
    // shown on the public dashboard. Real submissions default to fictional: false
    // and are hidden until explicitly promoted.
    fictional: v.optional(v.boolean()),
  })
    .index('by_status', ['status'])
    .index('by_roleId', ['roleId'])
    .index('by_submittedAt', ['submittedAt'])
    .index('by_fictional', ['fictional', 'submittedAt']),
})
