'use client'

import { Marker, Popup } from 'react-leaflet'
import ReactDOMServer from 'react-dom/server'
import Image from 'next/image'
import { appedDomain } from '@/lib/utils'

import { CheckSchoolSupportedTypes } from '../(sidebarList)/ListOfSchools'
import Link from 'next/link'
import { Link2, MapPin } from 'lucide-react'
import LinkButton from '@/components/LinkButton'
import { Button } from '@/components/ui/button'

export default function CustomMarker({ school, showPopup }) {
  var myIcon = L.divIcon({
    html: ReactDOMServer.renderToStaticMarkup(<MarkerHtml school={school} />),
    className: 'custom-marker',
    iconSize: [50, 50],
  })

  return (
    <Marker
      position={[
        school.lokalizacja_szkoly.dlugosc_geograficzna_szkoly,
        school.lokalizacja_szkoly.szerokosc_geograficzna_szkoly,
      ]}
      icon={myIcon}
    >
      {showPopup && school.isActive && (
        <Popup offset={[0, -20]} className='p-0' maxWidth={700}>
          <div className='flex flex-col justify-start items-start gap-2'>
            <h1 className='text-lg font-bold'>{school.nazwa_szkoly}</h1>
            <div className='w-full flex flex-row justify-start items-start gap-2'>
              <CheckSchoolSupportedTypes school={school} />
            </div>
            <div className='flex flex-row h-fit w-full justify-evenly items-center gap-4'>
              <LinkButton
                linkHref={`https://www.google.com/maps/dir/?api=1&destination=${school.lokalizacja_szkoly.dlugosc_geograficzna_szkoly},${school.lokalizacja_szkoly.szerokosc_geograficzna_szkoly}&travelmode=riding`}
                linkTarget='_blank'
                linkIcon={<MapPin />}
                buttonStyle={'text-black'}
              >
                <h1 className=''>Przejdź do Google Maps</h1>
              </LinkButton>

              <LinkButton linkHref={`/${school.skrot_szkoly}`} buttonStyle=' bg-black text-white' linkIcon={<Link2 />}>
                Dowiedz się więcej
              </LinkButton>
            </div>
          </div>
        </Popup>
      )}
    </Marker>
  )
}

export function MarkerHtml({ school }) {
  return (
    <div className={`flex items-center justify-center ${school.isActive ? 'opcatity-100' : 'opacity-50'}`}>
      <Image
        src={appedDomain(school.glowne_zdjecie_szkoly.url)}
        width={50}
        height={50}
        alt='logo szkoly'
        className='w-10 h-10 rounded-lg'
      />
    </div>
  )
}
