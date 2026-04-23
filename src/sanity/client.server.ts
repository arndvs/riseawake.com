import 'server-only'

import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, tokens } from './env'

/** No CDN, write token — server-only mutations */
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: tokens.write,
})
