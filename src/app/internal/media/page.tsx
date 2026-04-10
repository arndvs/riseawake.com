'use client'

import PayloadShell, { fireToast } from '@/components/payload/PayloadShell'

const P = {
  text: '#e8e8e8',
  textFaint: '#555555',
  border: 'rgba(255,255,255,0.08)',
  elevation50: '#111111',
  elevation200: '#1f1f1f',
}

export default function MediaPage() {
  return (
    <PayloadShell
      breadcrumb={[
        { label: 'RISE™ Internal', href: '/internal' },
        { label: 'Media' },
      ]}
      title="Media"
    >
      <div className="flex flex-col items-center justify-center px-6 py-24">
        <div
          className="mb-6 flex h-16 w-16 items-center justify-center rounded-full"
          style={{
            background: P.elevation200,
            border: `1px solid ${P.border}`,
          }}
        >
          <span style={{ fontSize: '24px', color: P.textFaint }}>⊡</span>
        </div>
        <p className="mb-2 text-sm font-medium" style={{ color: P.text }}>
          No media files
        </p>
        <p
          className="mb-8 max-w-sm text-center text-xs"
          style={{ color: P.textFaint, lineHeight: 1.7 }}
        >
          Upload images, documents, and other media files here.
        </p>
        <div
          onClick={() =>
            fireToast(
              'Upload failed. Storage connection not configured.',
              'error'
            )
          }
          className="flex h-32 w-full max-w-md cursor-pointer flex-col items-center justify-center rounded-sm transition-colors duration-150"
          style={{
            border: `2px dashed ${P.border}`,
            background: P.elevation50,
          }}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() =>
            fireToast(
              'Upload failed. Storage connection not configured.',
              'error'
            )
          }
        >
          <span
            style={{ color: P.textFaint, fontSize: '20px', marginBottom: '8px' }}
          >
            ↑
          </span>
          <p className="text-xs" style={{ color: P.textFaint }}>
            Drag and drop files or click to upload
          </p>
          <p
            className="mt-1 text-[10px]"
            style={{ color: P.textFaint, opacity: 0.5 }}
          >
            {/* TODO: connect to S3 bucket — areyes */}
          </p>
        </div>
        <p
          className="mt-6 text-[10px]"
          style={{ color: P.textFaint, fontStyle: 'italic' }}
        >
          0 files · Storage: not configured · S3 bucket: not connected
        </p>
      </div>
    </PayloadShell>
  )
}
