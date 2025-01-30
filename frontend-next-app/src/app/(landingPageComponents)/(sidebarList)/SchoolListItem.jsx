'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Link2, X } from 'lucide-react'
import DowiedzSieWiecej from '@/components/DowiedzSieWiecej'

export default function SchoolListItem({ map, school }) {
  console.log(school.rodzaje_szkoly)

  return (
    <div className='flex flex-col '>
      <Card className=''>
        <CardHeader>
          <CardTitle>{school.nazwa_szkoly}</CardTitle>
          <CardDescription>
            <CheckSchoolSupportedTypes school={school} />
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className='flex flex-row justify-end items-center gap-4'>
          <Button
            variant='secondary'
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
            pokaz na mapie
          </Button>
          <DowiedzSieWiecej school={school} />
        </CardFooter>
      </Card>
    </div>
  )
}
export function CheckSchoolSupportedTypes({ school }) {
  return (
    <>
      {school.rodzaje_szkoly.liceum !== null ? (
        <div className='flex flex-row gap-2 justify-start items-center'>
          <Check size={16} className='text-green-500' />
          <h1 className='text-green-500'>Liceum</h1>
        </div>
      ) : (
        <div className='flex flex-row gap-2 justify-start items-center'>
          <X size={16} className='text-red-500' />
          <h1 className='text-red-500'>Liceum</h1>
        </div>
      )}
      {school.rodzaje_szkoly.technikum !== null ? (
        <div className='flex flex-row gap-2 justify-start items-center'>
          <Check size={16} className='text-green-500' />
          <h1 className='text-green-500'>Technikum</h1>
        </div>
      ) : (
        <div className='flex flex-row gap-2 justify-start items-center'>
          <X size={16} className='text-red-500' />
          <h1 className='text-red-500'>Technikum</h1>
        </div>
      )}
      {school.rodzaje_szkoly.szkola_zawodowa !== null ? (
        <div className='flex flex-row gap-2 justify-start items-center'>
          <Check size={16} className='text-green-500' />
          <h1 className='text-green-500'>Szkoła Zawodowa</h1>
        </div>
      ) : (
        <div className='flex flex-row gap-2 justify-start items-center'>
          <X size={16} className='text-red-500' />
          <h1 className='text-red-500'>Szkoła Zawodowa</h1>
        </div>
      )}
    </>
  )
}
