'use client'

import { Marker, Popup } from 'react-leaflet'
import ReactDOMServer from 'react-dom/server'
import Image from 'next/image'
import { appedDomain } from '@/lib/utils'
import DowiedzSieWiecej from '@/components/LinkButton'
import { CheckSchoolSupportedTypes } from '../(sidebarList)/SchoolListItem'

export default function CustomMarker({ school, onClick, userPosition, showPopup }) {
  var myIcon = L.divIcon({
    html: ReactDOMServer.renderToStaticMarkup(<MarkerHtml school={school} />),
    className: 'custom-marker',
    iconSize: [50, 50],
  })

  // Obliczamy odległość od użytkownika, jeśli podana jest jego lokalizacja
  const distance = userPosition
    ? (
        L.latLng(userPosition).distanceTo([
          school.lokalizacja_szkoly.dlugosc_geograficzna_szkoly,
          school.lokalizacja_szkoly.szerokosc_geograficzna_szkoly,
        ]) / 1000
      ).toFixed(2) + ' km'
    : null

  return (
    <Marker
      position={[
        school.lokalizacja_szkoly.dlugosc_geograficzna_szkoly,
        school.lokalizacja_szkoly.szerokosc_geograficzna_szkoly,
      ]}
      icon={myIcon}
      eventHandlers={{ click: onClick }}
    >
      {showPopup && (
        <Popup offset={[0, -20]} className='p-0' maxWidth={700}>
          <div className='flex flex-col justify-center items-center gap-4'>
            <h1 className='text-lg font-bold'>{school.nazwa_szkoly}</h1>
            <div className='w-full flex flex-row gap-2 justify-start items-start'>
              <CheckSchoolSupportedTypes school={school} />
            </div>

            {distance && <p className='text-sm'>Odległość od Ciebie: {distance}</p>}

            <div className='w-full flex flex-row justify-end items-center'>
              <DowiedzSieWiecej school={school} />
            </div>
          </div>
        </Popup>
      )}
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
