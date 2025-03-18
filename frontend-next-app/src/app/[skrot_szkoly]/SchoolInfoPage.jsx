import SingleSchoolMap from './SingleSchoolMap'
import { getSchoolDetails } from '@/lib/queries'
import OfertaEdukacyjna from './OfertaEdukacyjna'
import ErrorPage from '@/components/ErrorPage'
import LinkButton from '@/components/LinkButton'
import PhotoGallery from '@/components/PhotoGallery'
import Link from 'next/link'
import { Link2, ExternalLink, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { appedDomain, Facebook, tryCatch } from '@/lib/utils'
import Image from 'next/image'

export default async function SchoolPageInfo({ params }) {
  const { data, error } = await tryCatch(getSchoolDetails(params.skrot_szkoly))
  const school = data

  console.log(error)
  return (
    <div className='h-auto w-full  flex flex-col justify-start items-center p-5'>
      {error && (
        <ErrorPage errorMessage={'Nie znaleziono szkoły'} statusCode={404}>
          <LinkButton buttonStyle={'p-0'} linkHref={'/'} linkIcon={<Link2 />}>
            Przejdź do strony głównej
          </LinkButton>
        </ErrorPage>
      )}

      {!error && school && (
        <div className='h-full sm:w-2/3'>
          <BigSchoolCard school={school} />

          <IconInfo school={school} />

          <OfertaEdukacyjna school={school} />

          {/* <PhotoGallery
            photos={school.glowna_galeria_zdjec_szkoly}
            containerDivStyles={'h-[50vh] w-full flex flex-col justify-center items-center'}
          /> */}

          <div className='h-[50vh] p-4 pb-10'>
            <h1 className='text-2xl font-bold'>Tu nas znajdziesz</h1>
            <p>{school.adres_szkoly}</p>
            <SingleSchoolMap school={school} />
          </div>
        </div>
      )}
    </div>
  )
}

function IconInfo({ school }) {
  return (
    <>
      {/* // row */}
      <div className='max-lg:hidden w-full flex flex-row justify-between items-center p-8 '>
        <Link href={`${school.adres_strony_szkoly}`} target='_blank'>
          <div className='flex flex-row justify-center items-center gap-4'>
            <Button variant='link'>
              <ExternalLink /> <p className='text-md'>Strona Szkoły</p>
            </Button>
          </div>
        </Link>
        <Link href={`${school.adres_facebooka_szkoly}`} target='_blank'>
          <div className='flex flex-row justify-center items-center gap-4'>
            <Button variant='link'>
              <ExternalLink /> <p className='text-md'>Facebook</p>
            </Button>
          </div>
        </Link>
        <div className='flex flex-row justify-start items-center gap-4'>
          <Phone />
          <p className='text-md'>{school.numer_telefonu}</p>
        </div>
        <div className='flex flex-row justify-center items-center gap-4'>
          <Mail />
          <p className='text-md'>{school.email_szkoly}</p>
        </div>
      </div>
      {/* // column */}
      <div className='lg:hidden w-full flex flex-col justify-center items-center p-5 '>
        <Link href={`${school.adres_strony_szkoly}`} target='_blank'>
          <div className='flex flex-row justify-center items-center gap-4 h-10'>
            <Button variant='link'>
              <ExternalLink /> <p className='text-md'>Strona Szkoły</p>
            </Button>
          </div>
        </Link>
        <Link href={`${school.adres_facebooka_szkoly}`} target='_blank'>
          <div className='flex flex-row justify-center items-center gap-4 h-10'>
            <Button variant='link'>
              <ExternalLink /> <p className='text-md'>Facebook</p>
            </Button>
          </div>
        </Link>
        <div className='flex flex-row justify-start items-center gap-4 h-10'>
          <Phone />
          <p className='text-md'>{school.numer_telefonu}</p>
        </div>
        <div className='flex flex-row justify-center items-center gap-4 h-10'>
          <Mail />
          <p className='text-md'>{school.email_szkoly}</p>
        </div>
      </div>
    </>
  )
}
export function BigSchoolCard({ school }) {
  return (
    <div className='w-full'>
      <div className='flex justify-center items-cente pb-4'>
        <Image
          src={appedDomain(school.glowne_zdjecie_szkoly.url)}
          width={100}
          height={100}
          alt='Logo Szkoły'
          className='w-52'
        />
      </div>
      <div>
        <h1 className='text-4xl font-bold pt-4 text-center'>{school.nazwa_szkoly}</h1>
      </div>
    </div>
  )
}
