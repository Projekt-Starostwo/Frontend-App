import LinkButton from '@/components/LinkButton'
import { Link2 } from 'lucide-react'

export default async function KierunekNieIstnieje({ skrot_szkoly }) {
  return (
    <div className='w-full  p-10 flex justify-start items-center flex-col'>
      <div className='w-2/3 p-4'>
        <h1 className='text-4xl font-bold'>Kierunek nie istnieje</h1>
        <LinkButton linkIcon={<Link2 />} linkHref={`/${skrot_szkoly}`} buttonStyle={'p-0'}>
          Zapoznaj się z dostępną ofertą edykacyjną dla tej szkoły
        </LinkButton>
      </div>
    </div>
  )
}
