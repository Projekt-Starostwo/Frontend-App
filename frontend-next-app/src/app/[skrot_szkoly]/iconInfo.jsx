import Link from 'next/link'
import { Facebook, Mail, PanelsTopLeft, Phone, School } from 'lucide-react'
import { Button } from '@/components/ui/button'
export default function IconInfo({ school }) {
  return (
    <div className='flex flex-row justify-between items-center gap-8 p-8'>
      <Link href={`${school.adres_strony_szkoly}`} target='_blank'>
        <div className='flex flex-row justify-center items-center gap-4'>
          <School size={60} />
          <Button variant='link'>Strona Szkoły</Button>
        </div>
      </Link>
      <div className='flex flex-row justify-start items-center gap-4'>
        <Phone size={60} />
        <p>{school.numer_telefonu}</p>
      </div>
      <div className='flex flex-row justify-center items-center gap-4'>
        <Mail size={60} />
        <p>{school.email_szkoly}</p>
      </div>
      <Link href={`${school.adres_facebooka_szkoly}`} target='_blank'>
        <div className='flex flex-row justify-center items-center gap-4'>
          <Facebook size={60} />

          <Button variant='link'>Facebook</Button>
        </div>
      </Link>
    </div>
  )
}
