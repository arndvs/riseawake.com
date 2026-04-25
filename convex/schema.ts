import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

// ─── Shared validators ───────────────────────────────────────────────────────

const mediaStatusValidator = v.union(
  v.literal('draft'),
  v.literal('ready_for_review'),
  v.literal('approved'),
  v.literal('needs_changes'),
  v.literal('rejected'),
)

const commentAuthorTypeValidator = v.union(
  v.literal('clerk'),
  v.literal('anon'),
)

const projectTypeValidator = v.union(
  v.literal('film'),
  v.literal('marketing'),
  v.literal('exploration'),
)

const promptCategoryScopeValidator = v.union(
  v.literal('universal'),
  v.literal('rise'),
)

export default defineSchema({
  // ─── RISE Render ─────────────────────────────────────────────────────────

  media: defineTable({
    imagekitFileId: v.string(),
    imagekitUrl: v.string(),
    prompt: v.string(),
    model: v.string(),
    status: mediaStatusValidator,
    createdBy: v.string(),
    createdByName: v.string(),
    projectId: v.optional(v.id('projects')),
    shotNumber: v.optional(v.number()),
    tags: v.array(v.string()),
    transformations: v.optional(v.string()),
    parentId: v.optional(v.id('media')),
  })
    .index('by_status', ['status'])
    .index('by_createdBy', ['createdBy'])
    .index('by_projectId', ['projectId'])
    .index('by_status_and_createdBy', ['status', 'createdBy']),

  mediaComments: defineTable({
    mediaId: v.id('media'),
    text: v.string(),
    authorType: commentAuthorTypeValidator,
    authorIdentifier: v.string(),
    authorDisplayName: v.string(),
    statusChange: v.optional(
      v.object({
        from: v.string(),
        to: v.string(),
      }),
    ),
  }).index('by_mediaId', ['mediaId']),

  projects: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    type: projectTypeValidator,
    createdBy: v.string(),
  }).index('by_createdBy', ['createdBy']),

  promptCategories: defineTable({
    name: v.string(),
    scope: promptCategoryScopeValidator,
    options: v.array(v.string()),
    sortOrder: v.number(),
  }).index('by_scope', ['scope']),

  // ─── Careers ─────────────────────────────────────────────────────────────

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
