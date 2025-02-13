import { appedDomain, slugify } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export default function KierunekCard({ school, kierunek }) {
  // console.log(kierunek)
  return (
    <Link href={`/${school.skrot_szkoly}/${slugify(kierunek.nazwa_kierunku)}`}>
      <div className='w-full flex flex-col justify-center items-center gap-2'>
        {kierunek.glowne_zdjecie !== null && (
          <Image
            src={appedDomain(kierunek.glowne_zdjecie.url)}
            alt={kierunek.nazwa_kierunku}
            width={100}
            height={100}
            className='rounded-lg w-[400px]'
          />
        )}
        <h1 className='text-3xl'>{kierunek.nazwa_kierunku}</h1>
      </div>
    </Link>
  )
}
