'use client'

import { useEffect, useState } from 'react'

export function useVisitorIp(): string | null {
  const [ip, setIp] = useState<string | null>(null)
  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then((r) => r.json())
      .then((d) => setIp(d.ip))
      .catch(() => {})
  }, [])
  return ip
}
