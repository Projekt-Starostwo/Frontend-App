export default async function OfertaEdukacyjna({ school }) {
  return (
    <div className='p-4 flex flex-col justify-center items-center gap-20'>
      {school.rodzaje_szkoly.liceum?.lista_kierunkow.length !== 0 && (
        <SchoolType
          school={school}
          schoolDescription={school.rodzaje_szkoly.liceum?.opis}
          listaKierunkow={school.rodzaje_szkoly.liceum?.lista_kierunkow}
          typ='Liceum'
        />
      )}
      {school.rodzaje_szkoly.technikum?.lista_kierunkow.length !== 0 && (
        <SchoolType
          school={school}
          schoolDescription={school.rodzaje_szkoly.technikum?.opis}
          listaKierunkow={school.rodzaje_szkoly.technikum?.lista_kierunkow}
          typ='Technikum'
        />
      )}
      {school.rodzaje_szkoly.szkola_zawodowa?.lista_kierunkow.length !== 0 && (
        <SchoolType
          school={school}
          schoolDescription={school.rodzaje_szkoly.szkola_zawodowa?.opis}
          listaKierunkow={school.rodzaje_szkoly.szkola_zawodowa?.lista_kierunkow}
          typ='Szkoła Zawodowa'
        />
      )}
    </div>
  )
}
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { slugify } from '@/lib/utils'
import { Link2 } from 'lucide-react'
import Link from 'next/link'
import KierunekCard from './KierunekCard'

function SchoolType({ school, listaKierunkow, typ, schoolDescription }) {
  // console.log(school)
  return (
    <div className='w-full flex flex-col gap-28'>
      <div>
        <h1 className='text-3xl font-bold'>{typ}</h1>
        <p className='py-4'>{schoolDescription}</p>
      </div>

      <div className='h-52 w-full flex flex-col justify-center items-center'>
        <Carousel
          className='w-1/2'
          opts={{
            slidesToShow: 3,
            loop: true,
          }}
        >
          <CarouselContent>
            {listaKierunkow?.map((kierunekValue) => {
              const { kierunek } = kierunekValue
              return (
                <CarouselItem key={kierunek.id}>
                  <KierunekCard school={school} kierunek={kierunek} />
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <Accordion type='single' collapsible className=''>
        <AccordionItem value='item-1'>
          <AccordionTrigger>Lista wszystkich dostepnych kierunków</AccordionTrigger>
          <AccordionContent className='flex flex-col gap-2'>
            {listaKierunkow?.map((kierunekValue, index) => {
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
      </Accordion>
    </div>
  )
}
