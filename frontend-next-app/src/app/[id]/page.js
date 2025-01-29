// strona poswicona szkole, najlepiej server component, chyba ze jakies guziki to wtedy mniejsze client componenty
// po id szkoly pobrac o niej dane

import { getSchoolInfo } from '@/lib/queries'
import SingleSchoolMap from './SingleSchoolMap'
import Image from 'next/image'
import SchoolType from './ChooseSchoolType'
import Link from 'next/link'

export default async function Page({ params }) {
  const { id } = await params
  const mockId = 'wukt2v52l3j8ymosfevd2iah'
  // const schoolInfo = await getSchoolInfo(id);
  const school = await getSchoolInfo(mockId)
  // console.log(school)

  return (
    <div className='h-auto w-full border border-red-500 flex flex-col justify-start items-center p-10'>
      <div className='border border-blue-500 h-full w-2/3'>
        <div className='p-4'>
          <h1 className='text-4xl font-bold'>{school.data.nazwa_szkoly}</h1>
        </div>
        <div className='p-4'>
          <Link prefetch={true} target='blank' href={`${school.data.adres_strony_szkoly}`}>
            <h1 className='text-2xl font-bold'>Odwieź strone szkoły </h1>
          </Link>
        </div>
        <div className='border border-yellow-500 h-1/2 p-4'>
          <h1 className='text-2xl font-bold'>O nas</h1>
          <p>{school.data.opis_szkoly}</p>
        </div>
        <div className='border border-yellow-500 h-1/2 p-4'>
          <h1 className='text-2xl font-bold'>Oferta edukacyjna</h1>
          <SchoolType school={school} />
        </div>

        <div className='border border-green-500 h-[45vh] p-32'>
          <Image
            src={`http://localhost:1337${school.data.lista_kierunkow[0].kierunek.zdjecie[0].url}`}
            width={150}
            height={150}
            alt={'głowne zdjęcie szkoły'}
            className='object-contain rounded-md'
          />
        </div>

        <div className='border border-yellow-500 h-[45vh] p-4'>
          <h1 className='text-2xl font-bold'>Tu nas zajdziesz</h1>
          <SingleSchoolMap school={school} />
        </div>
      </div>
    </div>
  )
}
