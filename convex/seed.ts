import { internalMutation } from './_generated/server'
import { internal } from './_generated/api'

const CATEGORIES = [
  // ─── Universal categories (from reference app) ─────────────────────
  {
    name: 'Styles',
    scope: 'universal' as const,
    sortOrder: 1,
    options: [
      '3D Render', 'Abstract', 'Anime', 'Art Deco', 'Art Nouveau',
      'Baroque', 'Brutalist', 'Cartoon', 'Charcoal', 'Cinematic',
      'Clay', 'Collage', 'Comic Book', 'Concept Art', 'Cubism',
      'Cyberpunk', 'Digital Art', 'Fantasy', 'Flat Design', 'Futuristic',
      'Glitch Art', 'Gothic', 'Graffiti', 'Hyperrealistic', 'Illustration',
      'Impressionist', 'Isometric', 'Low Poly', 'Minimalist', 'Neon',
      'Oil Painting', 'Paper Cut', 'Pencil Sketch', 'Photorealistic',
      'Pixel Art', 'Pop Art', 'Steampunk', 'Surrealism', 'Watercolor',
    ],
  },
  {
    name: 'Genres',
    scope: 'universal' as const,
    sortOrder: 2,
    options: [
      'Action', 'Adventure', 'Biography', 'Comedy', 'Crime',
      'Documentary', 'Drama', 'Experimental', 'Family', 'Fantasy',
      'Film Noir', 'Historical', 'Horror', 'Independent', 'Musical',
      'Mystery', 'Noir', 'Period Piece', 'Political', 'Romance',
      'Satire', 'Sci-Fi', 'Short Film', 'Silent Film', 'Slapstick',
      'Sports', 'Superhero', 'Thriller', 'War', 'Western',
      'Workplace Comedy', 'Zombie',
    ],
  },
  {
    name: 'Places',
    scope: 'universal' as const,
    sortOrder: 3,
    options: [
      'Beach', 'Castle', 'City Skyline', 'Countryside', 'Desert',
      'Forest', 'Garden', 'Laboratory', 'Library', 'Mountain',
      'Office', 'Space Station', 'Subway', 'Underwater',
    ],
  },
  {
    name: 'Camera Settings',
    scope: 'universal' as const,
    sortOrder: 4,
    options: [
      'Aerial Shot', 'Bird Eye View', 'Bokeh', 'Close-Up',
      'Dutch Angle', 'Extreme Close-Up', 'Fish Eye', 'Long Exposure',
      'Macro', 'Over the Shoulder', 'Panoramic', 'Tilt-Shift',
      'Wide Angle',
    ],
  },

  // ─── RISE-specific categories ──────────────────────────────────────
  {
    name: 'Product',
    scope: 'rise' as const,
    sortOrder: 5,
    options: [
      'PUSH Adjustable Bed',
      'RISE Branding / Logo',
      'The Remote Characters',
      'RISE Office Interior',
      'PUSH Product Packaging',
    ],
  },
  {
    name: 'Shot Type',
    scope: 'rise' as const,
    sortOrder: 6,
    options: [
      'Close-Up', 'Wide', 'Medium', 'Over the Shoulder',
      'POV', 'Establishing', 'Insert', 'Two-Shot',
    ],
  },
  {
    name: 'Mood / Lighting',
    scope: 'rise' as const,
    sortOrder: 7,
    options: [
      'Warm', 'Cool', 'Dramatic', 'Soft', 'Neon',
      'Morning', 'Night', 'Golden Hour', 'Overcast',
      'Candlelight', 'Studio Lighting',
    ],
  },
]

export const seedPromptCategories = internalMutation({
  args: {},
  handler: async (ctx) => {
    for (const category of CATEGORIES) {
      await ctx.runMutation(internal.promptCategories.upsertCategory, category)
    }
  },
})

export const seedTheRemoteProject = internalMutation({
  args: {},
  handler: async (ctx) => {
    // Check if "The Remote" project already exists
    const existing = await ctx.db
      .query('projects')
      .take(100)

    const match = existing.find((p) => p.name === 'The Remote')
    if (match) return match._id

    return await ctx.db.insert('projects', {
      name: 'The Remote',
      description: '54-shot AI comedy short about a man and his smart adjustable bed',
      type: 'film',
      createdBy: 'system',
    })
  },
})
