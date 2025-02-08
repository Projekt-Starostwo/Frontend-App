'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { slugify } from '@/lib/utils'
import { Link2 } from 'lucide-react'
import Link from 'next/link'

export default function SchoolType({ school }) {
  const { listaLiceum, listaTechnikum, listaSzkolaZawodowa } = extractListForSchoolType(school)
  // console.log(school)
  return (
    <Accordion type='single' collapsible className='w-full '>
      {school.rodzaje_szkoly?.liceum !== null && (
        <CustomAccordionItem title='Liceum' type='liceum' list={listaLiceum} school={school} />
      )}
      {school.rodzaje_szkoly?.technikum !== null && (
        <CustomAccordionItem title='Technikum' type='technikum' list={listaTechnikum} school={school} />
      )}
      {school.rodzaje_szkoly?.szkola_zawodowa !== null && (
        <CustomAccordionItem
          title='Szkoła Zawodowa'
          type='szkola_zawodowa'
          list={listaSzkolaZawodowa}
          school={school}
        />
      )}
    </Accordion>
  )
}
function CustomAccordionItem({ list, title, type, school }) {
  return (
    <>
      {list?.length != 0 && (
        <AccordionItem value={title}>
          <AccordionTrigger>{title}</AccordionTrigger>
          <AccordionContent className='flex flex-col gap-2'>
            <div>
              <p>{school.rodzaje_szkoly[type].opis}</p>
            </div>

            {list?.map((kierunekValue, index) => {
              const { kierunek } = kierunekValue
              return (
                <Link key={index} href={`/${school.skrot_szkoly}/${slugify(kierunek.nazwa_kierunku)}`}>
                  <Button variant='link'>
                    <Link2 /> <p>{kierunek.nazwa_kierunku}</p>
                  </Button>
                </Link>
              )
            })}
          </AccordionContent>
        </AccordionItem>
      )}
    </>
  )
}
function extractListForSchoolType(school) {
  const listaLiceum = school.lista_kierunkow.filter((kierunek) => kierunek.kierunek?.typ_kierunku === 'liceum')
  const listaTechnikum = school.lista_kierunkow.filter((kierunek) => kierunek.kierunek?.typ_kierunku === 'technikum')
  const listaSzkolaZawodowa = school.lista_kierunkow.filter(
    (kierunek) => kierunek.kierunek?.typ_kierunku === 'szkola_zawodowa'
  )

  return { listaLiceum, listaTechnikum, listaSzkolaZawodowa }
}
