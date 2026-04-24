import type { AuthConfig } from 'convex/server'

const clerkFrontendApiUrl = process.env.CLERK_FRONTEND_API_URL
if (!clerkFrontendApiUrl) {
  throw new Error(
    'Missing required environment variable CLERK_FRONTEND_API_URL. Set it before initializing Convex auth.',
  )
}

export default {
  providers: [
    {
      domain: clerkFrontendApiUrl,
      applicationID: 'convex',
    },
  ],
} satisfies AuthConfig
