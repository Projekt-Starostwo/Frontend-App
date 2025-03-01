import SingleSchoolMap from './SingleSchoolMap'
import { getSchoolDetails } from '@/lib/queries'
import OfertaEdukacyjna from './OfertaEdukacyjna'
import ErrorPage from '@/components/ErrorPage'
import LinkButton from '@/components/LinkButton'
import PhotoGallery from '@/components/PhotoGallery'
import Link from 'next/link'
import { Link2, ExternalLink, Facebook, Mail, Phone, School } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { tryCatch } from '@/lib/utils'

export default async function SchoolPageInfo({ params }) {
  const { data, error } = await tryCatch(getSchoolDetails(params.skrot_szkoly))
  const school = data

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

          {/* <PhotoGallery
            photos={school.glowna_galeria_zdjec_szkoly}
            containerDivStyles={'h-[50vh] w-full flex flex-col justify-center items-center'}
          /> */}

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
function SchoolDescription({ school }) {
  return (
    <div className='h-1/2 p-4'>
      <h1 className='text-2xl font-bold'>O nas</h1>
      <p className='py-4'>{school.opis_szkoly}</p>
    </div>
  )
}

function IconInfo({ school }) {
  return (
    <div className='flex flex-row justify-between items-center gap-8 p-8'>
      <Link href={`${school.adres_strony_szkoly}`} target='_blank'>
        <div className='flex flex-row justify-center items-center gap-4'>
          <School size={30} />
          <Button variant='link'>
            <ExternalLink /> Strona Szkoły
          </Button>
        </div>
      </Link>
      <div className='flex flex-row justify-start items-center gap-4'>
        <Phone size={30} />
        <p>{school.numer_telefonu}</p>
      </div>
      <div className='flex flex-row justify-center items-center gap-4'>
        <Mail size={30} />
        <p>{school.email_szkoly}</p>
      </div>
      <Link href={`${school.adres_facebooka_szkoly}`} target='_blank'>
        <div className='flex flex-row justify-center items-center gap-4'>
          <Facebook size={30} />
          <Button variant='link'>
            <ExternalLink /> Facebook
          </Button>
        </div>
      </Link>
    </div>
  )
}
