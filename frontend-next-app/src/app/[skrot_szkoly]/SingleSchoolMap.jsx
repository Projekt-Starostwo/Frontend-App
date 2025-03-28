'use client'

import dynamic from 'next/dynamic'
const LeafletMap = dynamic(() => import('../(landingPageComponents)/(map)/LeafletMap'), {
  ssr: false,
})
import { useState } from 'react'
export default function SingleSchoolMap({ school }) {
  const [map, setMap] = useState(null)
  const mapObj = { map: map, setMap: setMap }

  const convertedSchool = {
    ...school,
    isActive: true,
  }
  const [showMarkers, setShowMarkers] = useState(true)

  return (
    <div className='h-[93%] w-full pt-6 flex flex-col justify-center items-center gap-6 relative'>
      <LeafletMap
        map={mapObj}
        listOfSchools={[convertedSchool]}
        initialMapCenter={[
          convertedSchool.lokalizacja_szkoly.dlugosc_geograficzna_szkoly,
          convertedSchool.lokalizacja_szkoly.szerokosc_geograficzna_szkoly,
        ]}
        showMarkers={showMarkers}
        setShowMarkers={setShowMarkers}
        mapButtonsClassname={'w-2/3 z-[9999] flex flex-row justify-center items-center gap-4 flex-wrap absolute bottom-6  '}
      />
    </div>
  )
}
