'use client'

import { CmsShell, cmsfireToast } from '@/components/cms'
import { CmsStatusBadge, type CmsStatusVariant } from '@/components/cms/cms-status-badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AlertCircle, ChevronDown, ChevronUp, Plus, Siren } from 'lucide-react'
import { useState } from 'react'

const INCIDENTS = [
  {
    id: 'VNS-047',
    title: 'VNS Lapse — Bathroom transfer failure',
    severity: 'critical' as const,
    status: 'investigating' as const,
    unit: 'PUSH-0011',
    reported: '2024-01-15 06:47 AM',
    description:
      'User reported Push initiated bathroom transfer sequence but halted mid-hallway. User unable to complete morning routine for 47 minutes.',
    assignee: 'Hardware Team',
  },
  {
    id: 'VNS-046',
    title: "User reports Push 'following' them to kitchen",
    severity: 'medium' as const,
    status: 'monitoring' as const,
    unit: 'PUSH-0008',
    reported: '2024-01-13 09:12 AM',
    description:
      "User claims Push continued mobility sequence after user manually exited bed. Push proceeded to kitchen area. User describes behavior as 'intentional.'",
    assignee: 'Dr. Elena Voss',
  },
  {
    id: 'VNS-045',
    title: 'Unauthorized Push Mode activation at 3:47 AM',
    severity: 'low' as const,
    status: 'resolved' as const,
    unit: 'PUSH-0003',
    reported: '2024-01-12 03:47 AM',
    description:
      "Push Mode activated outside of configured wake window. User reports being 'forcefully awakened.' Sensor calibration adjusted.",
    assignee: 'Firmware Team',
  },
  {
    id: 'VNS-044',
    title: 'PM-1 Remote unresponsive during escalation',
    severity: 'critical' as const,
    status: 'resolved' as const,
    unit: 'PUSH-0007',
    reported: '2024-01-10 07:23 AM',
    description:
      'User attempted to pause escalation sequence via PM-1 Remote. Remote registered button press but did not transmit pause command. Push Mode continued to completion.',
    assignee: 'Hardware Team',
  },
  {
    id: 'VNS-043',
    title: 'Audio pickup recorded conversation with spouse',
    severity: 'medium' as const,
    status: 'resolved' as const,
    unit: 'PUSH-0002',
    reported: '2024-01-08 08:15 PM',
    description:
      'User discovered 30-minute audio recording in Push logs containing private conversation. Logs forwarded to Legal for review.',
    assignee: 'Legal',
  },
  {
    id: 'MOVE-012',
    title: 'Move unit failed to navigate stairs',
    severity: 'critical' as const,
    status: 'closed' as const,
    unit: 'MOVE-0001',
    reported: '2024-01-05 06:30 AM',
    description:
      'Move extension system encountered stairs during bathroom transfer. System halted. User stranded on staircase landing for 2 hours until manual override. Note: We are aware of the stairs.',
    assignee: 'Dr. Elena Voss',
  },
]

const SEVERITIES = ['All', 'critical', 'medium', 'low'] as const
const STATUSES_FILTER = [
  'All',
  'investigating',
  'monitoring',
  'resolved',
  'closed',
] as const

const SEVERITY_VARIANT: Record<string, CmsStatusVariant> = {
  critical: 'error',
  medium: 'warning',
  low: 'success',
}

const INCIDENT_STATUS_VARIANT: Record<string, CmsStatusVariant> = {
  investigating: 'error',
  monitoring: 'warning',
  resolved: 'success',
  closed: 'muted',
}

const SEVERITY_BORDER: Record<string, string> = {
  critical: 'border-l-red-500',
  medium: 'border-l-yellow-500',
  low: 'border-l-emerald-500',
}

export default function IncidentsPage() {
  const [severity, setSeverity] = useState<string>('All')
  const [status, setStatus] = useState<string>('All')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = INCIDENTS.filter((i) => {
    const matchesSev = severity === 'All' || i.severity === severity
    const matchesStat = status === 'All' || i.status === status
    return matchesSev && matchesStat
  })

  const activeCount = INCIDENTS.filter(
    (i) => i.status === 'investigating' || i.status === 'monitoring',
  ).length
  const criticalCount = INCIDENTS.filter(
    (i) => i.severity === 'critical',
  ).length

  return (
    <CmsShell
      breadcrumb={[
        { label: 'RISE™ Internal', href: '/internal' },
        { label: 'Incidents' },
      ]}
      title="Incidents"
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between border-b px-6 py-4">
        <p className="text-xs text-muted-foreground">
          {activeCount} active · {criticalCount} critical
        </p>
        <Button
          variant="destructive"
          size="sm"
          className="h-8 text-xs"
          onClick={() =>
            cmsfireToast(
              'Incident reporting requires VNS clearance level 3+. — arvin',
              'error',
            )
          }
        >
          <Plus className="mr-1.5 size-3" />
          Report Incident
        </Button>
      </div>

      {/* ── Critical alert ── */}
      {INCIDENTS.filter(
        (i) => i.severity === 'critical' && i.status === 'investigating',
      ).length > 0 && (
        <div className="px-6 pt-4">
          <Alert variant="destructive">
            <Siren className="size-4" />
            <AlertTitle className="text-xs font-medium">Active Critical Incident</AlertTitle>
            <AlertDescription className="text-xs">
              VNS-047 requires immediate attention. User currently unable to
              complete morning routine.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* ── Filters ── */}
      <div className="flex items-center gap-4 border-b bg-card px-6 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Severity:</span>
          <Select value={severity} onValueChange={setSeverity}>
            <SelectTrigger className="h-8 w-auto min-w-28 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SEVERITIES.map((s) => (
                <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Status:</span>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="h-8 w-auto min-w-28 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUSES_FILTER.map((s) => (
                <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ── Incident cards ── */}
      <div className="space-y-4 p-6">
        {filtered.map((incident) => {
          const isExpanded = expandedId === incident.id

          return (
            <Card key={incident.id} className={`border-l-4 ${SEVERITY_BORDER[incident.severity] ?? ''}`}>
              <Collapsible open={isExpanded} onOpenChange={() => setExpandedId(isExpanded ? null : incident.id)}>
                <CollapsibleTrigger className="flex w-full items-center justify-between px-6 py-4 text-left">
                  <div className="flex items-center gap-4">
                    <CmsStatusBadge variant={SEVERITY_VARIANT[incident.severity] ?? 'muted'} className="font-mono font-bold">
                      {incident.id}
                    </CmsStatusBadge>
                    <div>
                      <p className="text-sm font-medium">{incident.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Unit: {incident.unit} · {incident.reported}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CmsStatusBadge variant={INCIDENT_STATUS_VARIANT[incident.status] ?? 'muted'}>
                      {incident.status}
                    </CmsStatusBadge>
                    {isExpanded
                      ? <ChevronUp className="size-4 text-muted-foreground" />
                      : <ChevronDown className="size-4 text-muted-foreground" />}
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <CardContent className="border-t px-6 py-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          Description
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {incident.description}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          Assigned To
                        </p>
                        <p className="mt-1 text-sm">{incident.assignee}</p>

                        <p className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          Severity
                        </p>
                        <CmsStatusBadge variant={SEVERITY_VARIANT[incident.severity] ?? 'muted'} className="mt-1">
                          {incident.severity}
                        </CmsStatusBadge>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button
                        size="sm"
                        className="h-8 text-xs"
                        onClick={() =>
                          cmsfireToast(
                            `Status update for ${incident.id} requires VNS clearance. — arvin`,
                            'info',
                          )
                        }
                      >
                        Update Status
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs"
                        onClick={() =>
                          cmsfireToast(
                            `Comments on ${incident.id} are disabled. — arvin`,
                            'info',
                          )
                        }
                      >
                        Add Comment
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs"
                        onClick={() =>
                          cmsfireToast(
                            `Reassignment requires supervisor approval. — arvin`,
                            'info',
                          )
                        }
                      >
                        Reassign
                      </Button>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          )
        })}
      </div>

      {/* ── Legal notice ── */}
      <div className="px-6 pb-6">
        <p className="text-center text-xs text-muted-foreground/60 italic">
          All incident reports are confidential. Do not share outside of
          authorized personnel. Forwarding to external parties may result in
          termination. — Legal Dept.
        </p>
      </div>
    </CmsShell>
  )
}
