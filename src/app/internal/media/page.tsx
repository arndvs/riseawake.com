'use client'

import { CmsShell, cmsfireToast } from '@/components/cms'
import { CmsEmptyState } from '@/components/cms/cms-empty-state'
import { ImageIcon, Upload } from 'lucide-react'

export default function MediaPage() {
  return (
    <CmsShell
      breadcrumb={[
        { label: 'RISE Internal', href: '/internal' },
        { label: 'Media' },
      ]}
      title="Media"
    >
      <CmsEmptyState
        icon={<ImageIcon className="size-6" />}
        title="No media files"
        description="Upload images, documents, and other media files here."
        action={
          <div
            onClick={() => cmsfireToast('Upload failed. Storage connection not configured.', 'error')}
            className="flex h-32 w-full max-w-md cursor-pointer flex-col items-center justify-center rounded-sm border-2 border-dashed border-border bg-muted/50 transition-colors hover:bg-muted"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => cmsfireToast('Upload failed. Storage connection not configured.', 'error')}
          >
            <Upload className="mb-2 size-5 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              Drag and drop files or click to upload
            </p>
          </div>
        }
      />
      <p className="pb-6 text-center text-xs text-muted-foreground/50 italic">
        0 files · Storage: not configured · S3 bucket: not connected
      </p>
    </CmsShell>
  )
}
