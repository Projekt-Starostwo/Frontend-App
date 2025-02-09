import { appedDomain } from '@/lib/utils'
import Image from 'next/image'

export default function KierunekCard({ kierunek }) {
  console.log(kierunek)
  return (
    <div className='w-full flex flex-col gap-2'>
      <h1>{kierunek.nazwa_kierunku}</h1>
      {kierunek.glowne_zdjecie !== null && (
        <Image src={appedDomain(kierunek.glowne_zdjecie.url)} alt={kierunek.nazwa_kierunku} width={100} height={100} />
      )}
    </div>
  )
}
