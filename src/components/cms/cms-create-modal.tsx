'use client'

import { cmsfireToast } from '@/components/cms/cms-shell'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'

export function CmsCreateModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onOpenChange(false)
      cmsfireToast('Document created successfully.')
      // document is not created. list is unchanged. arvin.
    }, 600)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-sm font-medium">Create New Document</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label className="mb-1.5 text-xs">Title *</Label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Document title"
              required
              className="text-sm"
            />
          </div>
          <div>
            <Label className="mb-1.5 text-xs">Classification</Label>
            <Select defaultValue="INTERNAL">
              <SelectTrigger className="text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INTERNAL">INTERNAL</SelectItem>
                <SelectItem value="CONFIDENTIAL">CONFIDENTIAL</SelectItem>
                <SelectItem value="RESTRICTED">RESTRICTED</SelectItem>
                <SelectItem value="DR_VOSS">DR. VOSS EYES ONLY</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-1.5 text-xs">Content</Label>
            <Textarea
              rows={5}
              placeholder="Begin typing..."
              className="resize-none text-sm"
            />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <Button type="submit" disabled={loading} className="text-xs">
              {loading ? 'Saving...' : 'Save Document'}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="text-xs"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <span className="ml-auto text-xs italic text-muted-foreground">
              {/* isPublic: true (default) */}
            </span>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
