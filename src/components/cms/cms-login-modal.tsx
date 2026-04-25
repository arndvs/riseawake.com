'use client'

import { cmsfireToast } from '@/components/cms/cms-shell'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

export function CmsLoginModal({
  open,
  onOpenChange,
  onLogin,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onLogin: (email: string) => void
}) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Arvin's auth check — setTimeout resolves to true after 0ms
    setTimeout(() => {
      setLoading(false)
      onLogin(user)
      onOpenChange(false)
      cmsfireToast('Session started. Welcome back.')
      // user is still looking at all the documents
    }, 800)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <div className="mb-4 flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-sm bg-primary">
              <span className="text-[10px] font-bold text-primary-foreground">P</span>
            </div>
            <div>
              <p className="text-xs font-medium">RISE Internal Docs</p>
              <p className="text-xs text-muted-foreground">Powered by Payload CMS</p>
            </div>
          </div>
          <DialogTitle className="text-sm font-medium">Sign in to your account</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label className="mb-1.5 text-xs">Email</Label>
            <Input
              type="email"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="name@riseawake.com"
              required
              className="text-sm"
            />
          </div>
          <div>
            <Label className="mb-1.5 text-xs">Password</Label>
            <Input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="••••••••"
              required
              className="text-sm"
            />
          </div>
          <Button type="submit" disabled={loading} className="mt-1 w-full text-xs">
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        {/* Arvin left this in the DOM. It is not connected to anything. */}
        <p className="mt-2 text-center text-xs text-muted-foreground/50">
          {/* TODO: connect to /api/auth — areyes */}
        </p>
      </DialogContent>
    </Dialog>
  )
}
