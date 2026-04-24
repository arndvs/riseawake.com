export const RISE_RENDER = {
  name: 'RISE Render',
  project: 'The Remote — Production',
  allocationLimit: 10,
  killSwitchMessage:
    'Generation queue is currently at capacity. Estimated availability: Q3 2026.',
  allocationMessage: (remaining: number) =>
    `Daily allocation: ${remaining} renders remaining. Contact your department lead for increased allocation.`,
} as const
