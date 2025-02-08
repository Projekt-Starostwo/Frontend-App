'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Link2, X } from 'lucide-react'
import LinkButton from '@/components/LinkButton'
import { Badge } from '@/components/ui/badge'
import { ShineBorder } from '@/components/magicui/shine-border'

export default function SchoolListItem({ map, school }) {
  console.log(school.rodzaje_szkoly)

  return (
    <div className='flex flex-col w-full '>
      <ShineBorder className='md:shadow-xl w-full' color={['#009AEE', '#FFFF00']} borderWidth={2.5}>
        <CardHeader>
          <CardTitle>
            <LinkButton linkHref={`/${school.skrot_szkoly}`} buttonStyle={'p-0'}>
              <h1 className='text-xl font-bold'>{school.nazwa_szkoly}</h1>
            </LinkButton>
          </CardTitle>
          <CardDescription className='flex flex-row gap-2 py-4'>
            <CheckSchoolSupportedTypes school={school} />
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className='flex flex-row justify-end items-center gap-4'>
          <Button
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

          <LinkButton linkHref={`/${school.skrot_szkoly}`} buttonStyle={'p-0'} linkIcon={<Link2 />}>
            Dowiedz się więcej
          </LinkButton>
        </CardFooter>
      </ShineBorder>
    </div>
  )
}
export function CheckSchoolSupportedTypes({ school }) {
  return (
    <>
      {school.rodzaje_szkoly.liceum !== null && (
        <div className='flex flex-row gap-2 justify-start items-center'>
          <Badge variant='secondary'>Liceum</Badge>
        </div>
      )}
      {school.rodzaje_szkoly.technikum !== null && (
        <div className='flex flex-row gap-2 justify-start items-center'>
          <Badge variant='secondary'>Technikum</Badge>
        </div>
      )}
      {school.rodzaje_szkoly.szkola_zawodowa !== null && (
        <div className='flex flex-row gap-2 justify-start items-center'>
          <Badge variant='secondary'>Szkoła Zawodowa</Badge>
        </div>
      )}
    </>
  )
}
