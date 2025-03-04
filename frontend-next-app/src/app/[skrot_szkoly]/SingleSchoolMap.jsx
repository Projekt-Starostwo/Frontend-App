'use client'

import dynamic from 'next/dynamic'
const LeafletMap = dynamic(() => import('../(landingPageComponents)/(map)/LeafletMap'), {
  ssr: false,
})
// import LeafletMap from '@/app/(landingPageComponents)/(map)/LeafletMap'
import { useState } from 'react'
export default function SingleSchoolMap({ school }) {
  const [map, setMap] = useState(null)
  const mapObj = { map: map, setMap: setMap }

  const convertedSchool = {
    ...school,
    isActive: true,
  }

  return (
    <div className='h-[93%] w-full pt-6 flex flex-col justify-center items-center gap-6'>
      <LeafletMap
        map={mapObj}
        listOfSchools={[convertedSchool]}
        initialMapCenter={[
          convertedSchool.lokalizacja_szkoly.dlugosc_geograficzna_szkoly,
          convertedSchool.lokalizacja_szkoly.szerokosc_geograficzna_szkoly,
        ]}
      />
    </div>
  )
}
