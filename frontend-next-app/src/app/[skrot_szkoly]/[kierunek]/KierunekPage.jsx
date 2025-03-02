import ErrorPage from '@/components/ErrorPage'
import LinkButton from '@/components/LinkButton'
import getKierunekInfo from '@/lib/queries'
import { deslugify, tryCatch } from '@/lib/utils'
import { Link2, User, Users } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default async function KierunekPage({ params }) {
  const { data, error } = await tryCatch(getKierunekInfo(params.skrot_szkoly, deslugify(params.kierunek)))
  const kierunek = data

  return (
    <div className='h-auto w-full flex flex-col justify-start items-center p-10'>
      {error && (
        <ErrorPage errorMessage={error.message} statusCode={error.statusCode}>
          <LinkButton buttonStyle={'p-0'} linkHref={`/${params.skrot_szkoly}`} linkIcon={<Link2 />}>
            Wróć do strony szkoły
          </LinkButton>
        </ErrorPage>
      )}

      {!error && kierunek && (
        <div className='h-full w-2/3 flex flex-col justify-start items-start p-4 gap-10'>
          <HeadingAndDescription kierunek={kierunek} />

          <Slogan slogan={kierunek.slogan_start} />

          <Przedmioty title={'Przedmioty rozszerzone'} przedmioty={kierunek.rozszerzone_przedmioty} />

          <Przedmioty title={'Przedmioty punktowane'} przedmioty={kierunek.punktowane_przedmioty} />

          <Stats kierunek={kierunek} />

          <RenderAccordionOfListedInfo kierunek={kierunek} />

          {kierunek.galeria && (
            <PhotoGallery
              photos={kierunek.galeria}
              containerDivStyles={'h-[30vh] w-full flex flex-col justify-center items-center'}
            />
          )}

          <Slogan slogan={kierunek.slogan_koniec} />
        </div>
      )}
    </div>
  )
}
function HeadingAndDescription({ kierunek }) {
  return (
    <div className='flex gap-6 flex-col'>
      <h1 className='text-4xl font-bold'>{kierunek.nazwa_kierunku}</h1>
      <div className='h-1/2'>
        <p className=''>{kierunek.opis_kierunku}</p>
      </div>
    </div>
  )
}
function Slogan({ slogan }) {
  return (
    <>
      {slogan && (
        <div className='w-full flex flex-row justify-center items-center py-6'>
          <div className='w-2/3 text-center'>
            <h1 className='text-xl'>{slogan}</h1>
          </div>
        </div>
      )}
    </>
  )
}
function Przedmioty({ title, przedmioty }) {
  return (
    <>
      {przedmioty.length > 0 && (
        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl font-bold '>{title}</h1>
          <div>
            <p>{przedmioty}</p>
          </div>
        </div>
      )}
    </>
  )
}
function Stats({ kierunek }) {
  return (
    <div className='flex flex-row justify-center items-center gap-48 text-3xl w-full py-8 flex-wrap'>
      {kierunek.liczba_oddzialow > 0 && (
        <div className='flex flex-row gap-4 items-center'>
          <div>
            <Users size={35} />
          </div>
          <p>Oddziały - {kierunek.liczba_oddzialow}</p>
        </div>
      )}

      {kierunek.liczba_oddzialow > 0 && (
        <div className='flex flex-row gap-4 items-center'>
          <div>
            <User size={35} />
          </div>
          <p>Uczniowie - {kierunek.liczba_uczniow}</p>
        </div>
      )}
    </div>
  )
}

function RenderAccordionOfListedInfo({ kierunek }) {
  function RenderListedInfo({ list, itemLabel }) {
    if (!list) return
    return (
      <ul className='list-disc pl-4'>
        {list.map((item) => {
          return (
            <li key={item.id}>
              <p className='text-lg'>{item[itemLabel]}</p>
            </li>
          )
        })}
      </ul>
    )
  }
  return (
    <Accordion type='single' collapsible className='w-full'>
      {kierunek.umiejetnosci.length > 0 && (
        <AccordionItem value='item-1'>
          <AccordionTrigger className='text-lg'>Jakie umiejętnosci zdobęde?</AccordionTrigger>
          <AccordionContent>
            <RenderListedInfo list={kierunek.umiejetnosci} itemLabel={'umiejetnosc'} />
          </AccordionContent>
        </AccordionItem>
      )}
      {kierunek.praca.length > 0 && (
        <AccordionItem value='item-2'>
          <AccordionTrigger className='text-lg'>Jaką prace mogę zdobyć?</AccordionTrigger>
          <AccordionContent>
            <RenderListedInfo list={kierunek.praca} itemLabel={'praca'} />
          </AccordionContent>
        </AccordionItem>
      )}
      {kierunek.warunki_pracy.length > 0 && (
        <AccordionItem value='item-3'>
          <AccordionTrigger className='text-lg'>Jak wygląda praca w tym zawodzie?</AccordionTrigger>
          <AccordionContent>
            <RenderListedInfo list={kierunek.warunki_pracy} itemLabel={'cechy_pracy'} />
          </AccordionContent>
        </AccordionItem>
      )}
      {kierunek.cechy_ludzkie_dla_kierunku.length > 0 && (
        <AccordionItem value='item-4'>
          <AccordionTrigger className='text-lg'>Dla kogo jest ten kierunek?</AccordionTrigger>
          <AccordionContent>
            <RenderListedInfo list={kierunek.cechy_ludzkie_dla_kierunku} itemLabel={'cechy_ludzkie_dla_kierunku'} />
          </AccordionContent>
        </AccordionItem>
      )}
      {kierunek.mozliwosci_rozwoju.length > 0 && (
        <AccordionItem value='item-5'>
          <AccordionTrigger className='text-lg'>Dodatkowe mozliwosci rozwoju</AccordionTrigger>
          <AccordionContent>
            <RenderListedInfo list={kierunek.mozliwosci_rozwoju} itemLabel={'mozliwosci_rozwoju'} />
          </AccordionContent>
        </AccordionItem>
      )}
    </Accordion>
  )
}
