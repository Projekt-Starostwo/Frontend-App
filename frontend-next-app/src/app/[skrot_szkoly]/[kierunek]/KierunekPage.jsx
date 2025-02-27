import ErrorPage from '@/components/ErrorPage'
import LinkButton from '@/components/LinkButton'
import getKierunekInfo from '@/lib/queries'
import { appedDomain, deslugify, tryCatch } from '@/lib/utils'
import { Link2 } from 'lucide-react'
import PhotoGallery from '@/components/PhotoGallery'
import Image from 'next/image'

export default async function KierunekPage({ params }) {
  const { data, error } = await tryCatch(getKierunekInfo(params.skrot_szkoly, deslugify(params.kierunek)))
  const kierunek = data

  return (
    <div className='h-auto w-full flex flex-col justify-start items-center p-10'>
      {error && (
        <ErrorPage errorMessage={error.message} statusCode={error.statusCode}>
          <LinkButton buttonStyle={'p-0'} linkHref={`/${params.skrot_szkoly}`} linkIcon={<Link2 />}>
            Wróć do strony szkoły
          </LinkButton>
        </ErrorPage>
      )}

      {!error && kierunek && (
        <div className='h-full w-2/3 flex flex-col justify-start items-start gap-10 p-4'>
          <div>
            <h1 className='text-4xl font-bold mb-8'>{kierunek.nazwa_kierunku}</h1>
            <div className='h-1/2'>
              <p className=''>{kierunek.opis_kierunku}</p>
            </div>
          </div>
          {kierunek.galeria && (
            <PhotoGallery
              photos={kierunek.galeria}
              containerDivStyles={'h-[30vh] w-full flex flex-col justify-center items-center'}
            />
          )}
        </div>
      )}
    </div>
  )
}
