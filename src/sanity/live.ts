import { defineLive } from 'next-sanity/live'
import { liveClient } from './client'
import { tokens } from './env'

export const { sanityFetch, SanityLive } = defineLive({
  client: liveClient,
  serverToken: tokens.read,
  browserToken: false,
})
