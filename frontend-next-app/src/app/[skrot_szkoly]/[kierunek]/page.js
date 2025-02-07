'use client'

import { deslugify, slugify } from '@/lib/utils'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Page() {
  const router = useRouter()
  const params = useParams()
  const [kierunek, setKierunek] = useState(null)

  useEffect(() => {
    const slug = slugify(params.kierunek)
    if (slug !== params.kierunek) {
      router.push(`/${params.skrot_szkoly}`)
    } else {
      const kierunek = getKierunekInfo(deslugify(params.kierunek))
      setKierunek(kierunek)
    }
  }, [])

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

function getKierunekInfo(nazwa_kierunku) {
  const school = JSON.parse(sessionStorage.getItem('school'))
  console.log(school)
  const kierunek = school.lista_kierunkow.filter((kierunek) => {
    console.log(kierunek.kierunek.nazwa_kierunku)
    console.log(nazwa_kierunku)
    return kierunek.kierunek.nazwa_kierunku.toLowerCase() === nazwa_kierunku.toLowerCase()
  })
  if (kierunek.length === 0) {
    return null
  }
  return kierunek[0].kierunek
}
