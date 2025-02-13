import Link from 'next/link'
import { ExternalLink, Facebook, Mail, PanelsTopLeft, Phone, School } from 'lucide-react'
import { Button } from '@/components/ui/button'
export default function IconInfo({ school }) {
  return (
    <div className='flex flex-row justify-between items-center gap-8 p-8'>
      <Link href={`${school.adres_strony_szkoly}`} target='_blank'>
        <div className='flex flex-row justify-center items-center gap-4'>
          <School size={40} />
          <Button variant='link'>
            <ExternalLink /> Strona Szkoły
          </Button>
        </div>
      </Link>
      <div className='flex flex-row justify-start items-center gap-4'>
        <Phone size={40} />
        <p>{school.numer_telefonu}</p>
      </div>
      <div className='flex flex-row justify-center items-center gap-4'>
        <Mail size={40} />
        <p>{school.email_szkoly}</p>
      </div>
      <Link href={`${school.adres_facebooka_szkoly}`} target='_blank'>
        <div className='flex flex-row justify-center items-center gap-4'>
          <Facebook size={40} />
          <Button variant='link'>
            <ExternalLink /> Facebook
          </Button>
        </div>
      </Link>
    </div>
  )
}
