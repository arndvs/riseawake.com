'use client'

import { Image, ImageKitProvider } from '@imagekit/next'

export default function ImageTest() {
  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
  if (!urlEndpoint) {
    return (
      <p>
        NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT not found in environment variables.
      </p>
    )
  }

  return (
    <ImageKitProvider urlEndpoint={urlEndpoint}>
      <Image
        src="/profile.png"
        width={500}
        height={500}
        alt="Picture of the author"
      />
    </ImageKitProvider>
  )
}
