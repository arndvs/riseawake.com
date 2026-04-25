'use client'

import { Link } from '@/components/link'
import { useState } from 'react'

const ENTRIES = [
  {
    version: 'v4.1.2',
    date: 'March 14, 2025',
    tag: 'patch',
    title: 'Pillow node timing recalibration',
    summary:
      'Addressed an edge case where the pillow node was completing its centering cycle 2.3 seconds earlier than optimal on units manufactured after October 2024. The difference is not perceptible to most users. It was perceptible to one user. That user submitted detailed notes. We have implemented their feedback.',
    changes: [
      {
        type: 'fix',
        text: 'Pillow node pneumatic exhale timing adjusted by +2.3s on post-October 2024 hardware',
      },
      {
        type: 'fix',
        text: 'Sheet tensioning initialization no longer logs a spurious warning on firmware boot when ambient temperature is below 62\u00B0F',
      },
      {
        type: 'fix',
        text: 'GPS coordinate rounding error that caused 0.003% of solo return commutes to approach from a slightly incorrect angle',
      },
    ],
    note: null,
  },
  {
    version: 'v4.1.1',
    date: 'February 28, 2025',
    tag: 'patch',
    title: 'Audio classification threshold adjustment',
    summary:
      "Adjusted the sensitivity threshold for the ML audio classification system following a review that identified an elevated rate of snoring being classified as 'potentially significant content.' Snoring has been reclassified. Retention duration for snoring audio is now 7 years (standard) rather than indefinite (previously applied due to misclassification).",
    changes: [
      {
        type: 'fix',
        text: "Snoring reclassified from 'potentially significant' to 'biological ambient' \u2014 retention reduced from indefinite to standard 7 years",
      },
      {
        type: 'fix',
        text: "Hypnic jerks (sleep startle) reclassified from 'movement of interest' to 'normal sleep behavior'",
      },
      {
        type: 'improvement',
        text: 'Audio classification confidence scores now included in DataKit session payloads (Pro and Enterprise)',
      },
    ],
    note: 'Users affected by the snoring misclassification: your audio data was retained under the indefinite policy for an average of 14 months longer than intended. We cannot retrieve or delete data already retained under the prior classification. We acknowledge this.',
  },
  {
    version: 'v4.1.0',
    date: 'January 15, 2025',
    tag: 'minor',
    title: 'Push Mode route adaptation and RISE Index v2',
    summary:
      'Push Mode now adapts its routing sequence in real time when a configured stop is unavailable (occupied bathroom, blocked hallway). The adapted route is logged and compared to the configured route. Persistent deviations update the RISE Index. This update also introduces RISE Index v2, which incorporates 11 additional behavioral signals.',
    changes: [
      {
        type: 'feature',
        text: 'Real-time route adaptation when configured stop is temporarily blocked',
      },
      {
        type: 'feature',
        text: 'Route deviation logging \u2014 deviations visible in DataKit session timeline',
      },
      {
        type: 'feature',
        text: 'RISE Index v2 \u2014 11 new behavioral signals including bathroom dwell variance, closet exit velocity, and kitchen stop frequency deviation',
      },
      {
        type: 'improvement',
        text: 'Solo return commute pathfinding improved in environments with construction, blocked pavement, and irregular street furniture',
      },
      {
        type: 'improvement',
        text: 'Push Mode sequence preview now available in activation configuration \u2014 see what Push Mode will do before it does it',
      },
    ],
    note: 'RISE Index scores for all active users were recalculated under v2 methodology on January 15. Scores changed by an average of \u00B14 points. Some users saw larger changes. The methodology remains proprietary. The changes are not explained on an individual basis.',
  },
  {
    version: 'v4.0.3',
    date: 'December 9, 2024',
    tag: 'patch',
    title: 'December compliance support and holiday mode',
    summary:
      'December presents statistically anomalous compliance challenges. Push Mode now supports Holiday Mode \u2014 a reduced-intensity configuration for designated dates. Holiday Mode does not disable Push Mode. It adjusts the approach.',
    changes: [
      {
        type: 'feature',
        text: 'Holiday Mode \u2014 configurable via activation settings for up to 14 days per year',
      },
      {
        type: 'improvement',
        text: 'Push Mode nudge intensity automatically reduced by 15% on days immediately following confirmed late nights (inferred from audio and movement data)',
      },
      {
        type: 'fix',
        text: "New Year's Day edge case where push time set to 'default' was being interpreted as midnight",
      },
    ],
    note: 'Holiday Mode reduces Push Mode intensity. It does not disable Push Mode. This has been asked. The answer is the same as it always is.',
  },
  {
    version: 'v4.0.2',
    date: 'November 3, 2024',
    tag: 'patch',
    title: 'Parking incident pathfinding patch',
    summary:
      'Following incident SC-0134 (documented), a pathfinding edge case was identified where the autonomous return commute was not treating street-side parking enforcement zones as avoidable obstacles. This has been corrected. The patch applies to all units in markets where street-side parking enforcement is active.',
    changes: [
      {
        type: 'fix',
        text: 'Street-side parking enforcement zones now tagged as navigation-avoidable',
      },
      {
        type: 'fix',
        text: 'Municipal signage parsing updated to include temporary no-parking signage',
      },
      {
        type: 'improvement',
        text: 'Incident SC-0134 root cause documented and closed',
      },
    ],
    note: 'The parking ticket generated by incident SC-0134 is the responsibility of the registered account holder under Section 12 of the Terms of Service. RISE is not liable for citations issued to the device during solo commute. This is addressed in the disclaimer.',
  },
  {
    version: 'v4.0.1',
    date: 'October 22, 2024',
    tag: 'patch',
    title: 'Coffee table avoidance improvement',
    summary:
      'Incident SC-0047 identified an obstacle-detection gap where low-profile furniture (under 14 inches) in the standard return path was not reliably detected. The sensor sweep has been expanded downward by 8 degrees. Low-profile obstacles above 6 inches are now reliably detected in standard lighting conditions.',
    changes: [
      {
        type: 'fix',
        text: 'Downward sensor sweep angle expanded from 22\u00B0 to 30\u00B0 \u2014 improves detection of low-profile furniture',
      },
      {
        type: 'fix',
        text: 'Coffee table class obstacle added to navigation heuristics',
      },
      {
        type: 'improvement',
        text: 'Obstacle encounter logging now includes object height estimation (\u00B12 inches)',
      },
    ],
    note: null,
  },
  {
    version: 'v4.0.0',
    date: 'September 1, 2024',
    tag: 'major',
    title: 'Push Mode Platform 4.0 \u2014 The Morning Architecture',
    summary:
      "Platform 4.0 is the most significant update in the product's history. It introduces the RISE Platform layer: a connected system that integrates Push Mode with calendar data, transit data, and environmental data to deliver users to their obligations with precision that improves as it learns. Your morning gets smarter. The bed does not get less insistent.",
    changes: [
      {
        type: 'feature',
        text: 'RISE Platform integration \u2014 calendar sync for automatic Push Mode time adjustment',
      },
      {
        type: 'feature',
        text: 'Transit integration \u2014 Push Mode departure time adjusted based on real-time transit data',
      },
      {
        type: 'feature',
        text: 'Weather integration \u2014 outdoor navigation pathfinding adjusted for precipitation',
      },
      {
        type: 'feature',
        text: 'RISE Index now incorporates calendar compliance data \u2014 meetings attended on time factor into score',
      },
      {
        type: 'feature',
        text: 'Multi-destination support \u2014 up to 5 GPS waypoints for complex morning routing',
      },
      {
        type: 'improvement',
        text: 'Self-making cycle time reduced by 18% through optimized sheet tensioning sequencing',
      },
      {
        type: 'improvement',
        text: 'Solo return commute now sends push notification to paired device on departure from destination',
      },
      {
        type: 'change',
        text: 'Firmware update process now requires active Wi-Fi and takes 12\u201318 minutes. Push Mode is unavailable during firmware update. Schedule accordingly.',
      },
    ],
    note: 'Platform 4.0 requires re-acceptance of updated Terms of Service. Using your device after September 1, 2024 constitutes acceptance. The update cannot be declined without discontinuing use of the product.',
  },
  {
    version: 'v3.2.1',
    date: 'July 14, 2024',
    tag: 'patch',
    title: 'Street fair navigation improvement',
    summary:
      'Incident SC-0089 identified a navigation failure mode where large temporary outdoor events (street fairs, farmers markets, outdoor concerts) were not recognized as temporary and were being permanently routed around. The solo return commute pathfinding now distinguishes between permanent and temporary obstacles. Temporary obstacles are rerouted with a note in the session log.',
    changes: [
      {
        type: 'fix',
        text: 'Temporary event detection using permit data integration in 23 supported cities',
      },
      {
        type: 'fix',
        text: 'Permanent reroute no longer triggered by temporary obstacles \u2014 instead flagged for single-session deviation',
      },
      { type: 'improvement', text: 'Incident SC-0089 closed' },
    ],
    note: null,
  },
  {
    version: 'v3.2.0',
    date: 'May 20, 2024',
    tag: 'minor',
    title: 'DataKit API v2 and Enterprise tier launch',
    summary:
      'DataKit API v2 introduces structured endpoints for all data categories, improved pagination, and the new Restricted category access tier for Enterprise subscribers. Enterprise subscribers may now access audio classification metadata. The audio files themselves remain accessible only via the physical RSDP process.',
    changes: [
      {
        type: 'feature',
        text: 'DataKit API v2 \u2014 RESTful endpoints, improved pagination, webhook support',
      },
      {
        type: 'feature',
        text: 'Enterprise tier \u2014 audio classification metadata, extended session history, priority support',
      },
      {
        type: 'feature',
        text: 'Restricted category endpoints for Enterprise \u2014 relationship inference data, occupancy detection logs, and audio classification results',
      },
      {
        type: 'improvement',
        text: 'API rate limits increased: Essentials 100 req/hr \u2192 250 req/hr, Pro 500 req/hr \u2192 1000 req/hr',
      },
      {
        type: 'fix',
        text: 'Date filter post-2019 known issue \u2014 partially resolved for session data, not yet resolved for historical RISE Index data. Appendix B updated.',
      },
    ],
    note: 'DataKit API v1 will be deprecated January 1, 2026. Migration guide available at /sdk/documentation.',
  },
  {
    version: 'v3.1.4',
    date: 'March 3, 2024',
    tag: 'patch',
    title: 'Audio sensitivity threshold adjustment',
    summary:
      "Adjusted the onboard ML classification system's sensitivity threshold following a review that identified ambient room conditions (HVAC systems, white noise machines, partners with distinctive sleeping sounds) were elevating audio retention rates above expected baselines. The threshold has been raised. The system now requires higher confidence before classifying audio as potentially significant.",
    changes: [
      {
        type: 'fix',
        text: 'HVAC system audio no longer classified as significant',
      },
      {
        type: 'fix',
        text: 'White noise machine frequencies excluded from classification window',
      },
      {
        type: 'fix',
        text: 'Threshold increase reduces false-positive significant classification rate by an estimated 34%',
      },
    ],
    note: 'Audio previously flagged as significant under the prior threshold has not been reclassified. Audio meeting the prior threshold is retained under the original policy. This cannot be reversed. The new threshold applies to audio collected after this update.',
  },
  {
    version: 'v3.1.3',
    date: 'January 8, 2024',
    tag: 'patch',
    title: 'Activation persistence and localStorage fix',
    summary:
      'Fixed an issue where activation progress was not being reliably persisted between browser sessions in certain configurations. Users who had partially completed activation and found their progress lost should re-initiate from Stage 01. Note that serial number submission at Stage 01 closes the refund window regardless of subsequent progress loss.',
    changes: [
      {
        type: 'fix',
        text: 'Activation progress now persists reliably across browser sessions',
      },
      {
        type: 'fix',
        text: 'Stage 05 floorplan data now included in localStorage persistence',
      },
      {
        type: 'fix',
        text: 'RISE Index score no longer recalculated on page refresh if already calculated',
      },
    ],
    note: 'Users affected by the persistence issue: your refund window closed when you submitted your serial number. This was true before the fix and remains true after it. Activation progress loss does not constitute a basis for refund under Section 7.',
  },
  {
    version: 'v3.1.0',
    date: 'October 7, 2023',
    tag: 'minor',
    title: 'Household Sync and occupancy configuration',
    summary:
      'Household Sync allows registered users to share select Push Mode data with other members of their household. Enabled on an opt-in basis by the primary account holder. Secondary household members cannot disable sharing once enabled by the primary account holder.',
    changes: [
      {
        type: 'feature',
        text: 'Household Sync \u2014 configurable data sharing between household members',
      },
      {
        type: 'feature',
        text: 'Partner occupancy tracking \u2014 secondary occupant pressure signature monitoring and consistency reporting',
      },
      {
        type: 'feature',
        text: 'Guest mode \u2014 72-hour temporary occupancy classification for pressure signatures not matching household profiles',
      },
      {
        type: 'improvement',
        text: 'Occupancy detection now distinguishes between 1, 2, and 3+ occupants with improved accuracy in queen and king configurations',
      },
    ],
    note: 'Household Sync data sharing is enabled by the primary account holder. Secondary account holders cannot disable it. This is described in the Terms of Service Section 14 and the Sleep & Environmental Data Policy.',
  },
  {
    version: 'v3.0.2',
    date: 'August 12, 2023',
    tag: 'patch',
    title: 'Solo commute dog interaction handling',
    summary:
      "Incident SC-0112 documented a situation where a registered pet (canine, medium) followed the device during the solo return commute for approximately 400 meters before becoming confused and sitting down. The device waited 3 minutes, classified the dog as a 'persistent mobile obstacle,' and rerouted. The dog was subsequently found and returned to the residence by the occupant. This was not a Push Mode failure. We have nonetheless improved the handling.",
    changes: [
      {
        type: 'improvement',
        text: 'Pet companion classification added \u2014 registered pets now tagged separately from unregistered mobile obstacles',
      },
      {
        type: 'improvement',
        text: 'Wait timeout for companion animals increased from 3 minutes to 8 minutes',
      },
      {
        type: 'improvement',
        text: 'Incident SC-0112 root cause documented and closed',
      },
    ],
    note: 'The dog was fine.',
  },
  {
    version: 'v3.0.1',
    date: 'June 1, 2023',
    tag: 'patch',
    title: 'Closet reversal calibration',
    summary:
      'Addressed user reports that the closet-stop reversal trigger (activated when duration is exceeded by 40%) was engaging inconsistently in units manufactured in Q4 2022. Reversal is now consistent across all hardware generations. Several users have requested that the reversal threshold be made configurable. It is not configurable.',
    changes: [
      {
        type: 'fix',
        text: 'Closet reversal trigger now consistent across all hardware generations',
      },
      {
        type: 'fix',
        text: 'Reversal trigger log entry now includes dwell time at time of trigger',
      },
    ],
    note: 'The reversal threshold (40% over configured duration) is not configurable. This has been asked. The answer will not change.',
  },
  {
    version: 'v3.0.0',
    date: 'March 15, 2023',
    tag: 'major',
    title: 'Platform 3.0 \u2014 Self-Making Mechanism and RISE Index launch',
    summary:
      'Platform 3.0 introduces the self-making mechanism (sheet tensioning system + pneumatic pillow node), the RISE Index, and the DataKit SDK beta. These are the features that define the product as it is now known. Platform 3.0 is why the waitlist is 340,000 people.',
    changes: [
      {
        type: 'feature',
        text: 'Self-making mechanism \u2014 sheet tensioning and pneumatic pillow centering during Push Mode routing',
      },
      {
        type: 'feature',
        text: 'RISE Index \u2014 proprietary compliance and lifestyle score, calculated at activation and updated per session',
      },
      {
        type: 'feature',
        text: 'DataKit SDK beta \u2014 Essentials tier, read-only .rsm file access',
      },
      {
        type: 'feature',
        text: 'Autonomous return commute (solo commute) \u2014 bed navigates home independently after Push Mode completion',
      },
      {
        type: 'improvement',
        text: "Motor hum reduced from 52Hz baseline to 42Hz \u2014 users describe the new frequency as 'less alarming' and 'almost comfortable'",
      },
    ],
    note: 'Platform 3.0 is the update that most clearly defined what RISE is. Everything before this was research. This is the product.',
  },
  {
    version: 'v2.4.0',
    date: 'September 1, 2022',
    tag: 'minor',
    title: 'GPS multi-waypoint and departure configuration',
    summary:
      'Push Mode now supports up to 3 GPS waypoints per morning session, enabling multi-stop departure routing. Users who commute via transit hub, school drop-off, or other intermediate stop can configure Push Mode to route them accurately.',
    changes: [
      {
        type: 'feature',
        text: 'Multi-waypoint GPS support \u2014 up to 3 waypoints per session',
      },
      {
        type: 'feature',
        text: 'Transit hub mode \u2014 Push Mode timing adjusts for transit schedule in supported cities',
      },
      {
        type: 'improvement',
        text: 'GPS coordinate precision increased from 4 to 6 decimal places',
      },
    ],
    note: null,
  },
  {
    version: '\u2014',
    date: 'August 2021 \u2014 internal',
    tag: 'tombstone',
    title: 'The Platform History \u2014 For the Record',
    summary:
      'This is not a release note. It is a record. Push Mode as deployed is the third implementation of the core architecture. This entry exists because someone should say it plainly.',
    changes: [
      {
        type: 'change',
        text: 'Webb era (2010\u20132013): C-based embedded firmware. Built for Ambient, Tone, Thermal, Gradient, Alarm. None solved the compliance problem. No production code survives.',
      },
      {
        type: 'change',
        text: 'Yau era (2013\u20132017): Full firmware rebuild. NudgeBar mechanics, self-making mechanism prototype, first Push Mode prototype. Code not preserved in 2021 migration. Patent ownership disputed.',
      },
      {
        type: 'change',
        text: 'Nair era (2017\u20132021): Cloud-native microservices platform. 214 pages of documentation. Could not navigate a bedroom in residential Wi-Fi. $11.4M written off Q1 2021. 0% of code in production.',
      },
      {
        type: 'feature',
        text: 'Chen era (2021\u2013present): Local-first architecture. 4-page spec. Push Mode launches October 7, 2021. 98% compliance. 340,000-unit waitlist. This is the platform.',
      },
    ],
    note: 'The current architecture works. The prior architectures were documented more thoroughly. We are aware of the irony. This entry does not appear in the public changelog. It appears in the internal system. The internal system is public. We are working on that.',
  },
  {
    version: 'v2.0.0',
    date: 'January 19, 2022',
    tag: 'major',
    title: 'Push Mode launch',
    summary:
      'Push Mode is available. One button. No off switch. The waitlist opened 72 hours after launch. This is the product.',
    changes: [
      {
        type: 'feature',
        text: 'Push Mode \u2014 autonomous morning routing, single-button activation, non-interruptible by design',
      },
      {
        type: 'feature',
        text: 'PM-1 Remote \u2014 matte aluminum, one button, no off switch. Fine print on the back is accurate.',
      },
      {
        type: 'feature',
        text: '12-stage activation process \u2014 45\u201390 minutes, saves progress, refund window closes at Stage 01',
      },
      {
        type: 'feature',
        text: 'Push Mode EULA \u2014 47 sections, all of them intentional',
      },
    ],
    note: 'Push Mode sold out 72 hours after launch. A waitlist was established. The waitlist has since grown to 340,000. RISE notes that the sellout was not anticipated. RISE also notes that it should have been.',
  },
  {
    version: 'v1.0.0',
    date: 'October 7, 2021',
    tag: 'major',
    title: 'RISE Technologies, Inc. \u2014 initial platform launch',
    summary:
      'The RISE Push launches. After twelve years of research, nine failed product lines, and the 2019 Nudge discontinuation, the product that removes the decision ships. Dr. Voss set her alarm for 6:15am. She pressed the button. She arrived at work at 8:30am. She has pressed the button every morning since.',
    changes: [
      {
        type: 'feature',
        text: 'The Push \u2014 RISE Smart Adjustable Base, first generation',
      },
      { type: 'feature', text: 'riseawake.com \u2014 launched' },
      {
        type: 'feature',
        text: 'Legal suite \u2014 Terms of Service, Privacy Policy, Push Mode EULA (all 47 sections)',
      },
      {
        type: 'feature',
        text: 'Support \u2014 help@riseawake.com, 2\u20133 business day response time',
      },
    ],
    note: 'The Nudge is discontinued. 74% was not good enough.',
  },
]

const TAG_STYLES: Record<string, { bg: string; text: string; label: string }> =
  {
    major: { bg: 'bg-brand/15', text: 'text-brand', label: 'Major' },
    minor: {
      bg: 'bg-emerald-500/12',
      text: 'text-emerald-500/80',
      label: 'Minor',
    },
    patch: {
      bg: 'bg-foreground/6',
      text: 'text-foreground-muted',
      label: 'Patch',
    },
    security: {
      bg: 'bg-red-500/10',
      text: 'text-red-500/80',
      label: 'Security',
    },
    tombstone: {
      bg: 'bg-yellow-500/8',
      text: 'text-yellow-500/60',
      label: 'History',
    },
  }

const CHANGE_ICONS: Record<string, { icon: string; className: string }> = {
  feature: { icon: '\u2726', className: 'text-brand/80' },
  improvement: { icon: '\u2191', className: 'text-emerald-500/70' },
  fix: { icon: '\u25CB', className: 'text-foreground-muted' },
  change: { icon: '\u2192', className: 'text-yellow-500/70' },
}

export default function ChangelogPage() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    'v4.1.2': true,
  })

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-40 pb-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,var(--color-brand)_0%,transparent_70%)] opacity-[0.05]" />
        <div className="mx-auto max-w-3xl">
          <p className="mb-5 text-eyebrow text-foreground-muted uppercase">
            Platform Updates
          </p>
          <h1 className="mb-6 font-display text-display text-foreground-strong">
            Changelog.
          </h1>
          <p className="mb-4 max-w-xl text-body text-foreground-secondary">
            Every Push Mode firmware update, platform release, and incident
            response. In order. With notes.
          </p>
          <p className="max-w-xl text-body text-foreground-muted/50 italic">
            RISE believes in transparency. This changelog is what that looks
            like in practice.
          </p>

          {/* Legend */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {Object.entries(TAG_STYLES).map(([key, val]) => (
              <span
                key={key}
                className={`rounded-sm px-2.5 py-1 text-[10px] tracking-wider uppercase ${val.bg} ${val.text}`}
              >
                {val.label}
              </span>
            ))}
            <span className="ml-2 text-[10px] text-foreground-muted">
              {ENTRIES.length} releases since launch
            </span>
          </div>
        </div>
      </section>

      {/* Entries */}
      <section className="border-t border-edge-subtle px-6 pb-32">
        <div className="mx-auto max-w-3xl">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-0 bottom-0 left-[11px] w-px bg-edge-subtle" />

            <div className="flex flex-col gap-0 pt-16">
              {ENTRIES.map((entry) => {
                const isOpen = expanded[entry.version]
                const ts = TAG_STYLES[entry.tag] ?? TAG_STYLES['patch']!

                return (
                  <div key={entry.version} className="relative pb-12 pl-10">
                    {/* Timeline dot */}
                    <div
                      className={`absolute top-1 left-0 flex h-6 w-6 items-center justify-center rounded-full border ${
                        entry.tag === 'major'
                          ? 'border-brand/40 bg-brand/20'
                          : 'border-edge bg-surface-alt'
                      }`}
                    >
                      <div
                        className={`h-1.5 w-1.5 rounded-full ${
                          entry.tag === 'major'
                            ? 'bg-brand'
                            : 'bg-foreground-muted'
                        }`}
                      />
                    </div>

                    {/* Entry card */}
                    <div
                      className={`overflow-hidden rounded border ${
                        entry.tag === 'major'
                          ? 'border-brand/12'
                          : 'border-edge-subtle'
                      } bg-surface-alt`}
                    >
                      {/* Header */}
                      <button
                        onClick={() =>
                          setExpanded((e) => ({
                            ...e,
                            [entry.version]: !e[entry.version],
                          }))
                        }
                        className="w-full cursor-pointer border-none bg-transparent p-5 text-left"
                      >
                        <div className="flex flex-wrap items-start gap-3">
                          <span className="font-display text-lg tracking-tight text-foreground">
                            {entry.version}
                          </span>
                          <span
                            className={`mt-0.5 rounded-sm px-2 py-0.5 text-[10px] tracking-wider uppercase ${ts.bg} ${ts.text}`}
                          >
                            {ts.label}
                          </span>
                          <span className="mt-1 ml-auto text-[10px] text-foreground-muted">
                            {entry.date}
                          </span>
                          <span className="mt-1 text-[10px] text-foreground-muted/50">
                            {isOpen ? '\u25B2' : '\u25BC'}
                          </span>
                        </div>
                        <p className="mt-1.5 text-sm text-foreground-secondary">
                          {entry.title}
                        </p>
                      </button>

                      {/* Expanded content */}
                      {isOpen && (
                        <div className="border-t border-edge-subtle px-6 pb-6">
                          <p className="my-4 text-xs leading-relaxed text-foreground-secondary/70 italic">
                            {entry.summary}
                          </p>

                          <div
                            className={`flex flex-col gap-2 ${entry.note ? 'mb-4' : ''}`}
                          >
                            {entry.changes.map((change, j) => {
                              const ci =
                                CHANGE_ICONS[change.type] ??
                                CHANGE_ICONS['fix']!
                              return (
                                <div
                                  key={j}
                                  className="flex items-start gap-2.5"
                                >
                                  <span
                                    className={`mt-px w-3.5 shrink-0 text-xs ${ci.className}`}
                                  >
                                    {ci.icon}
                                  </span>
                                  <p className="text-[11px] leading-relaxed text-foreground-secondary/65">
                                    {change.text}
                                  </p>
                                </div>
                              )
                            })}
                          </div>

                          {entry.note && (
                            <div className="mt-4 rounded border border-yellow-500/12 bg-yellow-500/[0.04] px-3.5 py-3">
                              <p className="text-[10px] leading-relaxed text-yellow-500/65">
                                <span className="mr-1.5 font-semibold">
                                  Note:
                                </span>
                                {entry.note}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Bottom note */}
          <div className="mt-2 pl-10">
            <p className="text-[10px] leading-relaxed text-foreground-muted/40">
              This changelog documents all RISE platform updates since launch.
              Pre-launch development (2009\u20132021) is not documented here.
              Internal incident reports referenced above are available in the
              RISE internal document system. Several of those documents are
              accidentally public.{' '}
              <Link
                href="/internal"
                className="text-foreground-muted/50 underline"
              >
                /internal
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Subscribe */}
      <section className="border-t border-edge-subtle bg-surface px-6 py-12 text-center">
        <div className="mx-auto max-w-md">
          <p className="mb-2 text-[11px] text-foreground-secondary">
            Subscribe to Push Mode release notes
          </p>
          <div className="mb-2 flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 rounded border border-edge bg-surface-alt px-3.5 py-2.5 text-xs text-foreground outline-none"
            />
            <button className="cursor-pointer rounded bg-brand px-5 py-2.5 text-[11px] font-medium tracking-wider whitespace-nowrap text-brand-on uppercase">
              Subscribe
            </button>
          </div>
          <p className="text-[9px] leading-relaxed text-foreground-muted/40">
            By subscribing, you accept the Terms of Service. Subscribing adds
            you to the RISE communication list and the general waitlist. These
            are not the same list. They are stored in the same database.
          </p>
        </div>
      </section>
    </main>
  )
}
