'use client'

import { Image, ImageKitProvider } from '@imagekit/next'

export default function ImageTest() {
  const ImageKitId = process.env.NEXT_PUBLIC_IMAGEKIT_ID

  if (!ImageKitId) {
    return <p>ImageKit ID not found in environment variables.</p>
  }

  return (
    <ImageKitProvider urlEndpoint={`https://ik.imagekit.io/${ImageKitId}`}>
      <Image
        src="/profile.png"
        width={500}
        height={500}
        alt="Picture of the author"
      />
    </ImageKitProvider>
  )
}
