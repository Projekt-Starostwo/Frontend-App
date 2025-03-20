import { BookOpen, LocateFixed, MapPinned } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import Link from 'next/link'
import Image from 'next/image'
import { appedDomain, performFlyTo } from '@/lib/utils'
import { animate } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { getCmsUrl } from '@/lib/queries'

export default function ListOfSchools({ map, listOfSchools, setShowMarkers, setSelectedTab, setNewSchoolFocused }) {
  return (
    <div className='h-full flex flex-col'>
      <div className='flex-1 overflow-auto p-4'>
        <div className='grid gap-10 py-8 pb-32'>
          {listOfSchools?.map((school) => {
            return (
              <SchoolListItem
                map={map}
                key={school.id}
                school={school}
                setShowMarkers={setShowMarkers}
                setSelectedTab={setSelectedTab}
                setNewSchoolFocused={setNewSchoolFocused}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function SchoolListItem({ school, map, setShowMarkers, setSelectedTab, setNewSchoolFocused }) {
  const { data } = useQuery({
    queryKey: ['cms-url'],
    queryFn: async () => {
      const cms = await getCmsUrl()
      console.log(`${data}${school.glowne_zdjecie_szkoly.url}`)
      return cms
    },
  })

  return (
    <Card
      className={`schoolItem w-full max-w-lg min-w-lg  mx-auto shadow-lg ${
        school.isActive ? '' : 'opacity-50 pointer-events-none grayscale'
      }`}
    >
      <div className='w-full flex flex-row justify-center items-center pt-6'>
        {data && (
          <div className='h-20 flex justify-center items-center'>
            <Image
              src={`${data}${school.glowne_zdjecie_szkoly.url}`}
              width={100}
              height={100}
              alt='Logo Szkoły'
              className='rounded-sm'
            />
          </div>
        )}
      </div>
      <CardHeader className='pb-2'>
        <CardTitle className='text-lg font-bold text-center leading-tight'>{school.nazwa_szkoly}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex justify-center space-x-2 overflow-x-auto py-1 no-scrollbar'>
          <CheckSchoolSupportedTypes school={school} />
        </div>
      </CardContent>
      <CardFooter className='pt-0'>
        <div className='grid grid-cols-12 gap-2 w-full'>
          {map && (
            <div className='col-span-2'>
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant='outline'
                      className='w-full h-full p-0'
                      onClick={() => {
                        setShowMarkers(false)

                        if (setSelectedTab && setNewSchoolFocused) {
                          console.log('new school')
                          setSelectedTab('map')
                          setNewSchoolFocused([
                            school.lokalizacja_szkoly.dlugosc_geograficzna_szkoly,
                            school.lokalizacja_szkoly.szerokosc_geograficzna_szkoly,
                          ])
                          return
                        }

                        map.map.flyTo(
                          [
                            school.lokalizacja_szkoly.dlugosc_geograficzna_szkoly,
                            school.lokalizacja_szkoly.szerokosc_geograficzna_szkoly,
                          ],
                          16,
                          {
                            duration: 0.5,
                          }
                        )
                        // show markers after animation ends
                        setTimeout(() => {
                          setShowMarkers(true)
                        }, 500)
                      }}
                    >
                      <LocateFixed />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side='bottom'>
                    <p>Znajdź na mapie</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}

          <div className='col-span-2'>
            <TooltipProvider delayDuration={100}>
              <Tooltip>
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
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className='col-span-8'>
            <Link href={`/${school.skrot_szkoly}`}>
              <Button className='w-full h-full' variant='default'>
                <span className='flex items-center'>
                  <BookOpen className='mr-2 h-4 w-4' />
                  Szczegóły
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export function CheckSchoolSupportedTypes({ school }) {
  return (
    <>
      {school.rodzaje_szkoly.liceum?.lista_kierunkow.length > 0 && (
        <div className='flex flex-row gap-2 justify-start items-center py-2'>
          <Badge variant='secondary'>Liceum</Badge>
        </div>
      )}
      {school.rodzaje_szkoly.technikum?.lista_kierunkow.length > 0 && (
        <div className='flex flex-row gap-2 justify-start items-center  py-2'>
          <Badge variant='secondary'>Technikum</Badge>
        </div>
      )}
      {school.rodzaje_szkoly.szkola_zawodowa?.lista_kierunkow.length > 0 && (
        <div className='flex flex-row gap-2 justify-start items-center  py-2'>
          <Badge variant='secondary'>Szkoła Zawodowa</Badge>
        </div>
      )}
    </>
  )
}
