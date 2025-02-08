import SingleSchoolMap from './SingleSchoolMap'
import SchoolType from './SchoolType'
import Link from 'next/link'
import { Link2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getSchoolDetails } from '@/lib/queries'

export default async function Page({ params }) {
  const param = await params
  const school = await getSchoolDetails(param.skrot_szkoly)

  return (
    <div className='h-auto w-full  flex flex-col justify-start items-center p-10'>
      <div className='h-full w-2/3'>
        <div className='p-4'>
          <h1 className='text-4xl font-bold'>{school.nazwa_szkoly}</h1>
        </div>
        <div className='pb-4'>
          <Link prefetch={true} target='blank' href={`${school.adres_strony_szkoly}`}>
            <Button variant='link'>
              <Link2 />
              Odwieź stronę szkoły
            </Button>
          </Link>
        </div>
        <div className='h-1/2 p-4'>
          <h1 className='text-2xl font-bold'>O nas</h1>
          <p className='py-4'>{school.opis_szkoly}</p>
        </div>
        <div className='h-1/2 p-4'>
          <h1 className='text-2xl font-bold'>Oferta edukacyjna</h1>
          <SchoolType school={school} />
        </div>

        <div className='h-[50vh] p-4'>
          <h1 className='text-2xl font-bold'>Tu nas znajdziesz</h1>
          <SingleSchoolMap school={school} />
        </div>
      </div>
    </div>
  )
}
