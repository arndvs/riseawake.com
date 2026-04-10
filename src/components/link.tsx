'use client'

import * as Headless from '@headlessui/react'
import NextLink, { type LinkProps } from 'next/link'

export function Link({
  ref,
  ...props
}: LinkProps & React.ComponentPropsWithoutRef<'a'> & { ref?: React.Ref<HTMLAnchorElement> }) {
  return (
    <Headless.DataInteractive>
      <NextLink ref={ref} {...props} />
    </Headless.DataInteractive>
  )
}
