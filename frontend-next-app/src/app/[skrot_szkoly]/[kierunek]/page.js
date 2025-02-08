import getKierunekInfo from '@/lib/queries'
import { deslugify, slugify } from '@/lib/utils'
import KierunekNieIstnieje from './KierunekNieIstnieje'

export default async function Page({ params }) {
  const param = await params

  const slug = slugify(param.kierunek)

  if (slug !== param.kierunek) {
    return <KierunekNieIstnieje skrot_szkoly={param.skrot_szkoly} />
  }

  const kierunek = await getKierunekInfo(param.skrot_szkoly, deslugify(param.kierunek))

  if (kierunek === null) {
    return <KierunekNieIstnieje skrot_szkoly={param.skrot_szkoly} />
  }

  return (
    <div className='w-full flex justify-center items-center flex-col p-10'>
      <div className='w-2/3 p-4'>
        <h1 className='text-4xl font-bold'>{kierunek?.nazwa_kierunku}</h1>
      </div>
      <div className='w-2/3 p-4'>
        <p>{kierunek?.opis_kierunku}</p>
      </div>
      <div className='w-2/3 p-4'>
        <p>[wiecej informacji, zdjęć o kierunku]</p>
      </div>
    </div>
  )
}
