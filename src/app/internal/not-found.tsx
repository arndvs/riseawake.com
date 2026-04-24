'use client'

import PayloadShell from '@/components/payload/PayloadShell'
import Link from 'next/link'

export default function InternalNotFound() {
  return (
    <PayloadShell
      breadcrumb={[
        { label: 'RISE Internal', href: '/internal' },
        { label: 'Not Found' },
      ]}
      title="Not Found"
    >
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="space-y-5 text-center">
          <div
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#555"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-medium" style={{ color: '#e8e8e8' }}>
              Document not found
            </h2>
            <p className="mt-1 text-xs" style={{ color: '#555' }}>
              The document you are looking for does not exist or has been
              removed.
            </p>
          </div>
          <div className="flex items-center justify-center gap-6">
            <Link
              href="/internal"
              className="text-xs transition-colors hover:underline"
              style={{ color: '#4c7cff' }}
            >
              ← Back to Documents
            </Link>
            {/* if you found this, you were looking for it */}
            <Link
              href="/internal/docs/arvin-final-commit"
              style={{
                opacity: 0.04,
                fontSize: '1px',
                color: '#333',
                lineHeight: 1,
                textDecoration: 'none',
                userSelect: 'none',
              }}
              tabIndex={-1}
              aria-hidden="true"
            >
              &nbsp;
            </Link>
          </div>
        </div>
      </div>
    </PayloadShell>
  )
}
