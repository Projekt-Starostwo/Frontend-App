'use client'

import { Marker, Popup } from 'react-leaflet'
import ReactDOMServer from 'react-dom/server'
import Image from 'next/image'
import { appedDomain } from '@/lib/utils'

import { CheckSchoolSupportedTypes } from '../(sidebarList)/ListOfSchools'
import Link from 'next/link'
import { Link2, MapPin } from 'lucide-react'
import LinkButton from '@/components/LinkButton'

export default function CustomMarker({ school, userPosition, showPopup }) {
  var myIcon = L.divIcon({
    html: ReactDOMServer.renderToStaticMarkup(<MarkerHtml school={school} />),
    className: 'custom-marker',
    iconSize: [50, 50],
  })

  return (
    <Marker position={[school.lokalizacja_szkoly.dlugosc_geograficzna_szkoly, school.lokalizacja_szkoly.szerokosc_geograficzna_szkoly]} icon={myIcon}>
      {showPopup && (
        <Popup offset={[0, -20]} className='p-0' maxWidth={700}>
          <div className='flex flex-col justify-center items-center gap-4'>
            <h1 className='text-lg font-bold'>{school.nazwa_szkoly}</h1>
            <div className='w-full flex flex-row gap-2 justify-start items-start'>
              <CheckSchoolSupportedTypes school={school} />
            </div>
            <div className='flex flex-row h-fit w-full'>
              <div className='w-[50%] flex flex-row justify-end items-center'>
                <LinkButton
                  linkHref={`https://www.google.com/maps/dir/?api=1&destination=${school.lokalizacja_szkoly.dlugosc_geograficzna_szkoly},${school.lokalizacja_szkoly.szerokosc_geograficzna_szkoly}&travelmode=riding`}
                  linkIcon={<MapPin color='black' />}
                  linkTarget='_blank'
                  rel='noopener noreferrer'
                >
                  <h1 className='text-black'>Przejdź do Google Maps</h1>
                </LinkButton>
              </div>
              <div className='w-[50%] flex flex-row justify-end items-center'>
                <LinkButton linkHref={`/${school.skrot_szkoly}`} linkIcon={<Link2 color='black' />}>
                  <h1 className='text-black'>Dowiedz się więcej</h1>
                </LinkButton>
              </div>
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
      <Image src={appedDomain(school.glowne_zdjecie_szkoly.url)} width={50} height={50} alt='logo szkoly' className='w-8 h-8' />
    </div>
  )
}
