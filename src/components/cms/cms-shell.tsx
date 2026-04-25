'use client'

import { CmsCreateModal } from '@/components/cms/cms-create-modal'
import { CmsSidebar } from '@/components/cms/cms-sidebar'
import { CmsTopBar } from '@/components/cms/cms-topbar'
import { Button } from '@/components/ui/button'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export type CmsToastType = 'success' | 'error' | 'info'

/** Drop-in replacement for the old `fireToast()` — wraps Sonner's API */
export function cmsfireToast(message: string, type: CmsToastType = 'success') {
  switch (type) {
    case 'success':
      toast.success(message)
      break
    case 'error':
      toast.error(message)
      break
    case 'info':
      toast.info(message)
      break
  }
}

export function CmsShell({ children, breadcrumb, title, showCreate }: {
  children: React.ReactNode
  breadcrumb?: { label: string; href?: string }[]
  title?: string
  showCreate?: boolean
}) {
  const [createOpen, setCreateOpen] = useState(false)

  return (
    <TooltipProvider>
      <SidebarProvider>
        <CmsSidebar />
        <SidebarInset>
          <CmsTopBar breadcrumb={breadcrumb} />

          {title && (
            <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background px-6 py-4">
              <h1 className="text-sm font-semibold">{title}</h1>
              {showCreate && (
                <Button
                  size="sm"
                  className="text-xs"
                  onClick={() => setCreateOpen(true)}
                >
                  <Plus className="mr-1.5 size-3" />
                  Create New
                </Button>
              )}
            </div>
          )}

          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </SidebarInset>
        <Toaster position="bottom-right" />
        <CmsCreateModal open={createOpen} onOpenChange={setCreateOpen} />
      </SidebarProvider>
    </TooltipProvider>
  )
}
