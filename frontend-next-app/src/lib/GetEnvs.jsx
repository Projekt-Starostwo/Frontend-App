'use client'
import { useQuery } from '@tanstack/react-query'

import { useEnv } from './EnvProvider'
import { getCmsUrl } from './queries'
import { useEffect } from 'react'

export default function GetEnvs() {
  const { cmsUrl, updateCmsUrl } = useEnv()

  const { data } = useQuery({
    queryKey: ['cms-url'],
    queryFn: async () => {
      const cms = await getCmsUrl()
      console.log(`${cms}`)
      return cms
    },
  })

  useEffect(() => {
    if (data) {
      updateCmsUrl(data)
    }
  }, [data])
  return <></>
}
