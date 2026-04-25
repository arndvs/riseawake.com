/**
 * ImageKit URL-based transform utilities.
 *
 * Transforms are appended as path parameters to the ImageKit URL,
 * so preview is instant (no re-upload).
 */

export type CropPreset = '1:1' | '16:9' | '4:3' | '9:16' | 'free'

export type TransformConfig = {
  bgRemove?: boolean
  upscale?: boolean
  crop?: {
    preset: CropPreset
    width: number
    height: number
  }
  quality?: number
}

const CROP_RATIOS: Record<Exclude<CropPreset, 'free'>, [number, number]> = {
  '1:1': [1, 1],
  '16:9': [16, 9],
  '4:3': [4, 3],
  '9:16': [9, 16],
}

export function getCropDimensions(
  preset: CropPreset,
  baseWidth = 1024,
): { width: number; height: number } {
  if (preset === 'free') {
    return { width: baseWidth, height: baseWidth }
  }
  const [rw, rh] = CROP_RATIOS[preset]
  return {
    width: baseWidth,
    height: Math.round(baseWidth * (rh / rw)),
  }
}

export function buildTransformUrl(
  baseUrl: string,
  transforms: TransformConfig,
): string {
  const parts: string[] = []

  if (transforms.bgRemove) {
    parts.push('e-removebg')
  }

  if (transforms.upscale) {
    parts.push('e-upscale')
  }

  if (transforms.crop) {
    parts.push(`w-${transforms.crop.width}`)
    parts.push(`h-${transforms.crop.height}`)
    parts.push('c-maintain_ratio')
  }

  if (transforms.quality && transforms.quality < 100) {
    parts.push(`q-${transforms.quality}`)
  }

  if (parts.length === 0) return baseUrl

  // ImageKit transform syntax: insert /tr:params/ after the URL endpoint
  // e.g. https://ik.imagekit.io/account/tr:w-300,h-300/path.jpg
  const trString = parts.join(',')

  // If URL already has /tr:.../, replace it
  const trRegex = /\/tr:[^/]+\//
  if (trRegex.test(baseUrl)) {
    return baseUrl.replace(trRegex, `/tr:${trString}/`)
  }

  // Insert tr: after the account path segment
  // URL format: https://ik.imagekit.io/{accountId}/path/to/file.ext
  const url = new URL(baseUrl)
  const pathParts = url.pathname.split('/')
  // Insert after the first path segment (account id)
  if (pathParts.length >= 3) {
    pathParts.splice(2, 0, `tr:${trString}`)
  }
  url.pathname = pathParts.join('/')
  return url.toString()
}
