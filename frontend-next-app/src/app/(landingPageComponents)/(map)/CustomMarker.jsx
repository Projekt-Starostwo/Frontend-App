'use client'

import { Marker, Popup, Tooltip } from 'react-leaflet'
import ReactDOMServer from 'react-dom/server'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { appedDomain } from '@/lib/utils'
import DowiedzSieWiecej from '@/components/LinkButton'
import { CheckSchoolSupportedTypes, RodzajSzkolyStatus } from '../(sidebarList)/SchoolListItem'

export default function CustomMarker({ school }) {
  // renderToSTaticMarkup zamieni react component na statyczny html ktory poprawnie sie pokaze jako marker
  var myIcon = L.divIcon({
    html: ReactDOMServer.renderToStaticMarkup(<MarkerHtml school={school} />),
    className: 'custom-marker',
    iconSize: [50, 50],
  })

  // dowolny html wyswietli sie na mapie jako marker, proponuje herb szkoly
  return (
    <Marker
      position={[
        school.lokalizacja_szkoly.dlugosc_geograficzna_szkoly,
        school.lokalizacja_szkoly.szerokosc_geograficzna_szkoly,
      ]}
      icon={myIcon}
    >
      <Popup offset={[0, -20]} className='p-0'>
        <div className='flex flex-col justify-center items-center gap-4'>
          <h1 className='text-lg font-bold'>{school.nazwa_szkoly}</h1>
          <div className='w-full flex flex-row gap-2 justify-start items-start'>
            <div>
              <CheckSchoolSupportedTypes school={school} />
            </div>
          </div>

          <div className='w-full flex flex-row justify-end items-center'>
            <DowiedzSieWiecej school={school} />
          </div>
        </div>
      </Popup>
    </Marker>
  )
}
export function MarkerHtml({ school }) {
  return (
    <div className='flex items-center justify-center'>
      <Image
        src={appedDomain(school.glowne_zdjecie_szkoly.url)}
        width={50}
        height={50}
        alt='logo szkoly'
        className='w-8 h-8'
      />
    </div>
  )
}
