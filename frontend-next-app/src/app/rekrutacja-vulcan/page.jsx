import LinkButton from '@/components/LinkButton'
import { ExternalLink } from 'lucide-react'

export default async function Page() {
  return (
    <div className='h-auto w-full flex justify-center items-center flex-col'>
      <div className='w-2/3  p-4'>
        <div className='pt-10 pb-10'>
          <h1 className='text-3xl font-bold'>Rekrutacja Vulcan</h1>
        </div>

        <p>Poniższy link przekieruje cię na stronę vulcan, ktora służy do wypełnienia wniosku o przyjęcie do szkół.</p>
        <LinkButton
          linkHref={'https://www.vulcan.edu.pl/samorzady/oprogramowanie/systemy-naborowe'}
          linkTarget={'_blank'}
          buttonStyle={'p-0'}
          linkIcon={<ExternalLink />}
        >
          Strona Vulcan
        </LinkButton>
      </div>
    </div>
  )
}
