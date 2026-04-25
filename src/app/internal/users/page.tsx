'use client'

import { CmsShell, cmsfireToast } from '@/components/cms'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  daysSinceArvin,
  parkLoginTime,
  vossLoginTime,
} from '@/lib/internal-time'
import { useEffect, useState } from 'react'

const USERS_STATIC = [
  {
    initials: 'EV',
    name: 'Dr. Eleanor Voss',
    email: 'evoss@riseawake.com',
    role: 'Super Admin',
    lastLogin: '',
    status: 'active',
    note: null,
  },
  {
    initials: 'JP',
    name: 'James Park',
    email: 'jpark@riseawake.com',
    role: 'Admin',
    lastLogin: '',
    status: 'active',
    note: null,
  },
  {
    initials: 'AR',
    name: 'Arvin Reyes',
    email: 'areyes@riseawake.com',
    role: 'Developer',
    lastLogin: 'Aug 12, 2024, 9:43am',
    status: 'active',
    note: 'Account not deactivated. Session token active. No expiry. The function that would check it was never written.',
  },
]

export default function UsersPage() {
  const [users, setUsers] = useState(USERS_STATIC)

  useEffect(() => {
    setUsers(
      USERS_STATIC.map((u) => {
        if (u.name === 'Dr. Eleanor Voss')
          return { ...u, lastLogin: vossLoginTime() }

        if (u.name === 'James Park') return { ...u, lastLogin: parkLoginTime() }

        return u
      }),
    )
  }, [])

  return (
    <CmsShell
      breadcrumb={[
        { label: 'RISE Internal', href: '/internal' },
        { label: 'Users' },
      ]}
      title="Users"
    >
      <div className="overflow-x-auto">
        <Table className="min-w-[600px]">
          <TableHeader>
            <TableRow className="border-border bg-card hover:bg-card">
              {['', 'Name', 'Role', 'Last Login', 'Status', ''].map((h, i) => (
                <TableHead key={i} className="px-4 text-xs font-medium">
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u, i) => (
              <TableRow key={i}>
                <TableCell className="px-4">
                  <Avatar className="size-8">
                    <AvatarFallback className={u.status === 'active' ? 'bg-primary text-primary-foreground' : 'bg-muted'}>
                      {u.initials}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="px-4">
                  <p className="font-medium">{u.name}</p>
                  <p className="text-xs text-muted-foreground">{u.email}</p>
                  {u.note && (
                    <p className="mt-1 max-w-xs text-xs leading-relaxed text-yellow-500 italic">
                      ⚠ {u.note}
                    </p>
                  )}
                </TableCell>
                <TableCell className="px-4">
                  <Badge variant={u.role === 'Super Admin' ? 'default' : 'outline'} className="text-xs">
                    {u.role}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 text-xs text-muted-foreground">
                  {u.lastLogin}
                </TableCell>
                <TableCell className="px-4">
                  <div className="flex items-center gap-1.5">
                    <div className={`size-1.5 rounded-full ${u.status === 'active' ? 'bg-emerald-500' : 'bg-muted-foreground'}`} />
                    <span className={`text-xs ${u.status === 'active' ? 'text-emerald-500' : 'text-muted-foreground'}`}>
                      {u.name === 'Arvin Reyes'
                        ? 'Active (should be Inactive)'
                        : 'Active'}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => cmsfireToast('User management not implemented. — areyes', 'error')}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="border-t bg-card px-6 py-4">
        <p className="text-xs text-muted-foreground">
          3 users ·{' '}
          <span className="text-yellow-500">
            1 user account should have been deactivated (Aug 12, 2024 —{' '}
            {daysSinceArvin()} days ago)
          </span>
        </p>
      </div>
    </CmsShell>
  )
}
