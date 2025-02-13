import SingleSchoolMap from './components/SingleSchoolMap'
import { getSchoolDetails } from '@/lib/queries'
import IconInfo from './components/iconInfo'
import SchoolDescription from './components/SchoolDescription'
import OfertaEdukacyjna from './components/OfertaEdukacyjna'
import SchoolGallery from './components/SchoolGallery'
import ErrorPage from '@/components/ErrorPage'
import LinkButton from '@/components/LinkButton'
import { Link2 } from 'lucide-react'

export default async function SchoolPageInfo({ params }) {
  let school = null
  let error = null

  try {
    school = await getSchoolDetails(params.skrot_szkoly)
  } catch (e) {
    console.log(e)
    error = e
  }

  return (
    <div className='h-auto w-full  flex flex-col justify-start items-center p-10'>
      {error && (
        <ErrorPage errorMessage={'Nie znaleziono szkoły'} statusCode={404}>
          <LinkButton buttonStyle={'p-0'} linkHref={'/'} linkIcon={<Link2 />}>
            Przejdź do strony głównej
          </LinkButton>
        </ErrorPage>
      )}

      {!error && school && (
        <div className='h-full w-2/3'>
          <h1 className='text-4xl font-bold p-4'>{school.nazwa_szkoly}</h1>

          <SchoolDescription school={school} />

          <IconInfo school={school} />

          <OfertaEdukacyjna school={school} />

          <SchoolGallery school={school} />

          <div className='h-[50vh] p-4'>
            <h1 className='text-2xl font-bold'>Tu nas znajdziesz</h1>
            <p>{school.adres_szkoly}</p>
            <SingleSchoolMap school={school} />
          </div>
        </div>
      )}
    </div>
  )
}
