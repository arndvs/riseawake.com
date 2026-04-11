import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, tokens } from './env'

const baseConfig = {
  projectId,
  dataset,
  apiVersion,
  stega: {
    studioUrl: '/studio',
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

/** No CDN, write token — server-only mutations */
export const writeClient = createClient({
  ...baseConfig,
  useCdn: false,
  token: tokens.write,
})

if (typeof window !== 'undefined' && tokens.write)
    throw new Error('writeClient must not be used on the client side')
