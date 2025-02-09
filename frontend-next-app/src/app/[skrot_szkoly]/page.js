import SingleSchoolMap from './SingleSchoolMap'
import { getSchoolDetails } from '@/lib/queries'
import IconInfo from './iconInfo'
import SchoolDescription from './SchoolDescription'
import OfertaEdukacyjna from './OfertaEdukacyjna'

export default async function Page({ params }) {
  const param = await params
  const school = await getSchoolDetails(param.skrot_szkoly)

  return (
    <div className='h-auto w-full  flex flex-col justify-start items-center p-10'>
      {school !== null ? (
        <div className='h-full w-2/3'>
          <h1 className='text-4xl font-bold p-4'>{school.nazwa_szkoly}</h1>

          <SchoolDescription school={school} />

          <IconInfo school={school} />

          <OfertaEdukacyjna school={school} />

          <div className='h-[50vh] p-4'>
            <h1 className='text-2xl font-bold'>Tu nas znajdziesz</h1>
            <p>{school.adres_szkoly}</p>
            <SingleSchoolMap school={school} />
          </div>
        </div>
      ) : (
        <div className='h-full w-2/3 flex flex-row justify-center text-destructive'>
          Wystąpił problem z połączeniem z serwerem
        </div>
      )}
    </div>
  )
}
