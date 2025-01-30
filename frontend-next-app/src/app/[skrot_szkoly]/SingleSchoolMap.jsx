'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'

const LeafletMap = dynamic(() => import('../(landingPageComponents)/(map)/LeafletMap'), { ssr: false })
export default function SingleSchoolMap({ school }) {
  const [map, setMap] = useState(null)
  const mapObj = { map: map, setMap: setMap }

  // console.log(school.data.lokalizacja_szkoly)
  const convertedSchool = {
    data: [school],
  }
  return (
    <div className='h-[93%] w-full pt-6 flex flex-col justify-center items-center gap-10'>
      <LeafletMap map={mapObj} listOfSchools={convertedSchool} />
    </div>
  )
}
