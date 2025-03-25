// app/posthog.js
import { PostHog } from 'posthog-node'
import { getPosthogEnv } from './queries'

export default async function PostHogClient() {
  const { posthogKey, posthogHost } = await getPosthogEnv()
  const posthogClient = new PostHog(posthogKey, {
    host: posthogHost,
    flushAt: 1,
    flushInterval: 0,
  })
  return posthogClient
}
