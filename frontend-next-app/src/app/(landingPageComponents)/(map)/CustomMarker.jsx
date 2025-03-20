'use client'

import { Marker, Popup, Tooltip } from 'react-leaflet'
import ReactDOMServer from 'react-dom/server'
import Image from 'next/image'
import { appedDomain } from '@/lib/utils'
import { CheckSchoolSupportedTypes } from '../(sidebarList)/ListOfSchools'
import Link from 'next/link'
import { BookOpen, MapPinned } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip as ShadcnTooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useTheme } from 'next-themes'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { getCmsUrl } from '@/lib/queries'

export default function CustomMarker({ school, showPopup }) {
  const { theme } = useTheme()
  // console.log(school)
  const [link, setLink] = useState(null)
  useEffect(() => {
    // console.log(school)
    async function getData() {
      const res = await getCmsUrl()

      // console.log(res)
      setLink(res)
    }
    getData()
  }, [school])
  // console.log(theme)
  var myIcon = L.divIcon({
    html: ReactDOMServer.renderToStaticMarkup(<MarkerHtml school={school} cmsUrl={link} theme={theme} />),
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
        <Popup offset={[0, -20]} className='p-0'>
          <div className='pb-2'>
            <div className='text-lg font-bold text-center leading-tight'>{school.nazwa_szkoly}</div>
          </div>
          <div>
            <div className='flex justify-center space-x-2 overflow-x-auto py-1 no-scrollbar'>
              <CheckSchoolSupportedTypes school={school} />
            </div>
          </div>
          <div className='pt-0'>
            <div className='grid grid-cols-10 gap-2 w-full'>
              <div className='col-span-2'>
                <TooltipProvider delayDuration={100}>
                  <ShadcnTooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={`https://www.google.com/maps/dir/?api=1&destination=${school.lokalizacja_szkoly.dlugosc_geograficzna_szkoly},${school.lokalizacja_szkoly.szerokosc_geograficzna_szkoly}&travelmode=riding`}
                        target='_blank'
                      >
                        <Button variant='outline' className='w-full h-full p-0'>
                          <MapPinned color='#4f9bd9' />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side='bottom'>
                      <p>Otwórz w Google Maps</p>
                    </TooltipContent>
                  </ShadcnTooltip>
                </TooltipProvider>
              </div>
              <div className='col-span-8'>
                <Link href={`/${school.skrot_szkoly}`}>
                  <Button className='w-full h-full text-foreground' variant='outline'>
                    <span className='flex items-center'>
                      <BookOpen className='mr-2 h-4 w-4' />
                      Szczegóły
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Popup>
      )}
    </Marker>
  )
}

export function MarkerHtml({ school, cmsUrl, theme }) {
  return (
    <div className={` flex items-center justify-center ${school.isActive ? 'opcatity-100' : 'opacity-50'}`}>
      {cmsUrl && (
        <div className='relative flex flex-col justify-start items-center'>
          <Image
            src={`${cmsUrl}${school.glowne_zdjecie_szkoly.url}`}
            width={50}
            height={50}
            alt='logo szkoly'
            className='top-[10px] w-7 h-7  absolute rounded-full z-[30]'
          />
          <Image
            src={theme === 'dark' ? '/test-white.png' : '/test.png'}
            width={50}
            height={50}
            alt='logo szkoly'
            className='w-15 h-15 rounded-sm z-[10]'
          />
        </div>
      )}
    </div>
  )
}
