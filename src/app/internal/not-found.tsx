'use client'

import { CmsShell } from '@/components/cms'
import { CmsEmptyState } from '@/components/cms/cms-empty-state'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function InternalNotFound() {
  return (
    <CmsShell
      breadcrumb={[
        { label: 'RISE Internal', href: '/internal' },
        { label: 'Not Found' },
      ]}
      title="Not Found"
    >
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="space-y-5 text-center">
          <CmsEmptyState
            icon={<AlertCircle className="size-6" />}
            title="Document not found"
            description="The document you are looking for does not exist or has been removed."
          />
          <div className="flex items-center justify-center gap-6">
            <Link
              href="/internal"
              className="text-xs text-primary transition-colors hover:underline"
            >
              &larr; Back to Documents
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
    </CmsShell>
  )
}
