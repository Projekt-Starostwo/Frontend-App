'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

import { usePostHog } from 'posthog-js/react'

import { useQuery } from '@tanstack/react-query'
import { getPosthogEnv } from './queries'

export default function PostHogProvider({ children }) {
  const { data } = useQuery({
    queryKey: ['posthog-env'],
    queryFn: async () => {
      const { posthogKey, posthogHost } = await getPosthogEnv()
      // console.log('posthogKey', posthogKey)
      // console.log('posthogHost', posthogHost)
      return { posthogKey, posthogHost }
    },
  })

  useEffect(() => {
    // console.log(process.env.NEXT_PUBLIC_POSTHOG_HOST)
    // console.log(process.env.NEXT_PUBLIC_POSTHOG_KEY)

    // console.log(data?.posthogHost)
    // console.log(data?.posthogKey)
    if (data) {
      posthog.init(data?.posthogKey, {
        api_host: data?.posthogHost,
        capture_pageview: false,
      })
    }
  }, [data])

  return (
    <>
      {data && (
        <PHProvider client={posthog}>
          <SuspendedPostHogPageView />
          {children}
        </PHProvider>
      )}
    </>
  )
}

function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthog = usePostHog()

  // Track pageviews
  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`
      }

      posthog.capture('$pageview', { $current_url: url })
    }
  }, [pathname, searchParams, posthog])

  return null
}

function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  )
}
