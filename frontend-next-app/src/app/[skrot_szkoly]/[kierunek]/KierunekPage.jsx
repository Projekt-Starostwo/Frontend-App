import ErrorPage from '@/components/ErrorPage'
import LinkButton from '@/components/LinkButton'
import getKierunekInfo from '@/lib/queries'
import { deslugify, slugify } from '@/lib/utils'
import { Link2 } from 'lucide-react'

export default async function KierunekPage({ params }) {
  const slug = slugify(params.kierunek)

  if (slug !== params.kierunek) {
    return <h1>probnlem</h1>
  }

  let kierunek = null
  let error = null

  try {
    kierunek = await getKierunekInfo(params.skrot_szkoly, deslugify(params.kierunek))
  } catch (e) {
    error = e
  }

  return (
    <div className='h-auto w-full  flex flex-col justify-start items-center p-10'>
      {error && (
        <ErrorPage errorMessage={error.message} statusCode={error.statusCode}>
          <LinkButton buttonStyle={'p-0'} linkHref={`/${params.skrot_szkoly}`} linkIcon={<Link2 />}>
            Wróć do strony szkoły
          </LinkButton>
        </ErrorPage>
      )}

      {!error && kierunek && (
        <div className='h-full w-2/3 flex flex-col justify-start items-center'>
          <h1>{kierunek.nazwa_kierunku}</h1>
        </div>
      )}
    </div>
  )
}
