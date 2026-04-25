'use client'

import { CmsShell } from '@/components/cms'
import { ConvexAnonProvider } from './_components/convex-anon-provider'
import { ReviewGallery } from './_components/review-gallery'

export default function MediaPage() {
  return (
    <CmsShell
      breadcrumb={[
        { label: 'RISE Internal', href: '/internal' },
        { label: 'Media Review' },
      ]}
      title="Media Review"
    >
      <ConvexAnonProvider>
        <ReviewGallery />
      </ConvexAnonProvider>
    </CmsShell>
  )
}
