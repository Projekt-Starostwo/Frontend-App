import LinkButton from '@/components/LinkButton'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Link2, MapPin } from 'lucide-react'

export default function ListOfSchools({ map, listOfSchools }) {
  return (
    <div className='h-full w-1/3 overflow-y-auto p-10 flex flex-col gap-10'>
      {listOfSchools?.map((school) => {
        return <SchoolListItem map={map} key={school.id} school={school} />
      })}
    </div>
  )
}

function SchoolListItem({ school, map }) {
  const disabledStyle = school.isActive ? '' : 'opacity-50 pointer-events-none grayscale' // Added grayscale
  const disabledTextStyle = school.isActive ? '' : 'text-gray-400' // Added text color

  return (
    <div className='flex flex-col w-full'>
      <Card className={`${disabledStyle}`}>
        <CardHeader>
          <CardTitle>
            <LinkButton linkHref={`/${school.skrot_szkoly}`} buttonStyle='p-0'>
              <h1 className={`text-xl font-bold ${disabledTextStyle}`}>{school.nazwa_szkoly}</h1>
            </LinkButton>
          </CardTitle>
          <CardDescription className='flex flex-row gap-2'>
            <CheckSchoolSupportedTypes school={school} />
          </CardDescription>
        </CardHeader>
        <CardFooter className='flex flex-row justify-between items-center '>
          <Button
            variant='secondary'
            disabled={!school.isActive} // Disable the button
            onClick={() => {
              map.map.setView(
                [
                  school.lokalizacja_szkoly.dlugosc_geograficzna_szkoly,
                  school.lokalizacja_szkoly.szerokosc_geograficzna_szkoly,
                ],
                16
              )
            }}
          >
            Pokaż na mapie
          </Button>
          <LinkButton
            linkHref={`https://www.google.com/maps/dir/?api=1&destination=${school.lokalizacja_szkoly.dlugosc_geograficzna_szkoly},${school.lokalizacja_szkoly.szerokosc_geograficzna_szkoly}&travelmode=riding`}
            linkTarget='_blank'
            className={disabledStyle}
          >
            <Button variant='outline'>
              <MapPin />
              <h1>Google Maps</h1>
            </Button>
          </LinkButton>
          <LinkButton
            linkHref={`/${school.skrot_szkoly}`}
            buttonStyle='dark:bg-white dark:text-black bg-black text-white'
            linkIcon={<Link2 />}
            className={disabledStyle}
          >
            Dowiedz się więcej
          </LinkButton>
        </CardFooter>
      </Card>
    </div>
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
