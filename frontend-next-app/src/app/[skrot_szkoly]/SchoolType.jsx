import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { slugify } from '@/lib/utils'
import { Link2 } from 'lucide-react'
import Link from 'next/link'
import KierunekCard from './KierunekCard'

export default function SchoolType({ school, listaKierunkow, typ, schoolDescription }) {
  // console.log(school)
  return (
    <div className='w-full flex flex-col gap-10'>
      <div>
        <h1 className='text-3xl font-bold'>{typ}</h1>
        <p className='py-4'>{schoolDescription}</p>
      </div>

      <div className='h-52 w-full flex flex-col justify-center items-center'>
        <Carousel className='w-1/2'>
          <CarouselContent>
            {listaKierunkow?.map((kierunekValue) => {
              const { kierunek } = kierunekValue
              return (
                <CarouselItem key={kierunek.nazwa_kierunku}>
                  <KierunekCard kierunek={kierunek} />
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
