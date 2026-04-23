import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, tokens } from './env'

const baseConfig = {
  projectId,
  dataset,
  apiVersion,
  stega: {
    studioUrl: '/cms',
  },
}

/** CDN-backed, no token — public reads */
export const client = createClient({
  ...baseConfig,
  useCdn: true,
})

/** CDN-backed, read token — live preview / draft mode */
export const liveClient = createClient({
  ...baseConfig,
  useCdn: true,
  token: tokens.read,
})
