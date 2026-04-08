import { revalidateTag } from 'next/cache'

export const revalidateSyncTags = async (tags: string[]) => {
  'use server'
  revalidateTag('sanity:fetch-sync-tags')
  for (const tag of tags) {
    revalidateTag(`sanity:${tag}`)
  }
}
