'use client'

import LeafletMap from '@/app/(landingPageComponents)/(map)/LeafletMap'
import { useState } from 'react'
export default function SingleSchoolMap({ school }) {
  const [map, setMap] = useState(null)
  const mapObj = { map: map, setMap: setMap }

  return (
    <div className='h-[93%] w-full pt-6 flex flex-col justify-center items-center gap-6'>
      <LeafletMap map={mapObj} listOfSchools={[school]} />
    </div>
  )
}
