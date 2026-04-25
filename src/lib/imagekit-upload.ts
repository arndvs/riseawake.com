type UploadAuthParams = {
  token: string
  expire: number
  signature: string
}

export async function fetchUploadAuth(): Promise<UploadAuthParams> {
  const res = await fetch('/api/upload-auth')
  if (!res.ok) {
    throw new Error('Failed to get upload auth')
  }
  return res.json()
}

export async function uploadToImageKit(
  imageUrl: string,
  fileName: string,
): Promise<{ fileId: string; url: string }> {
  const auth = await fetchUploadAuth()

  // Fetch the image blob from the temporary OpenAI URL
  const imageRes = await fetch(imageUrl)
  if (!imageRes.ok) {
    throw new Error('Failed to fetch image from source URL')
  }
  const blob = await imageRes.blob()

  const formData = new FormData()
  formData.append('file', blob, fileName)
  formData.append('fileName', fileName)
  formData.append('token', auth.token)
  formData.append('expire', String(auth.expire))
  formData.append('signature', auth.signature)
  formData.append(
    'publicKey',
    process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY ?? '',
  )

  const uploadRes = await fetch('https://upload.imagekit.io/api/v2/files/upload', {
    method: 'POST',
    body: formData,
  })

  if (!uploadRes.ok) {
    const err = await uploadRes.text()
    throw new Error(`ImageKit upload failed: ${err}`)
  }

  const data = await uploadRes.json()
  return { fileId: data.fileId, url: data.url }
}
