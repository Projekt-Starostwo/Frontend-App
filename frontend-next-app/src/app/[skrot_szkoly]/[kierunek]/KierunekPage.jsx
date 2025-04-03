import ErrorPage from '@/components/ErrorPage'
import LinkButton from '@/components/LinkButton'
import getKierunekInfo, { getCmsUrl, getSchoolDetails } from '@/lib/queries'
import { deslugify, tryCatch } from '@/lib/utils'
import { Link2, User, Users } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { BigSchoolCard } from '../SchoolInfoPage'

export default async function KierunekPage({ params }) {
  const param = await params
  const kierunekData = await tryCatch(getKierunekInfo(param.skrot_szkoly, deslugify(param.kierunek)))
  const kierunek = kierunekData.data
  console.log('KIERUNEK', kierunekData)
  const schoolData = await tryCatch(getSchoolDetails(param.skrot_szkoly))
  const school = schoolData.data
  console.log(schoolData.error)
  console.log(schoolData.data)

  const cmsUrl = await getCmsUrl()

  return (
    <div className='h-auto w-full flex flex-col justify-start items-center p-5'>
      {(kierunekData.error || schoolData.error) && (
        <ErrorPage errorMessage={kierunekData.error.message} statusCode={kierunekData.error.statusCode}>
          <LinkButton buttonStyle={'p-0'} linkHref={`/${param.skrot_szkoly}`} linkIcon={<Link2 />}>
            Wróć do strony szkoły
          </LinkButton>
        </ErrorPage>
      )}

      {!kierunekData.error && kierunek && (
        <div className='h-full sm:w-2/3 flex flex-col justify-start items-start  gap-10'>
          {cmsUrl && <BigSchoolCard school={school} cmsUrl={cmsUrl} />}

          <Slogan slogan={kierunek.slogan_start} />

          <HeadingAndDescription kierunek={kierunek} school={school} />

          <RenderAccordionOfListedInfo kierunek={kierunek} />

          <Przedmioty kierunek={kierunek} />

          <Stats kierunek={kierunek} />

          <Slogan slogan={kierunek.slogan_koniec} />
        </div>
      )}
    </div>
  )
}
function HeadingAndDescription({ kierunek }) {
  return (
    <div className='flex flex-col w-full justify-center items-center'>
      <h1 className='text-4xl font-bold text-center'>{kierunek.nazwa_kierunku}</h1>
      {kierunek.opis_kierunku && (
        <div className='h-1/2 pt-10'>
          <p className='' dangerouslySetInnerHTML={{ __html: kierunek.opis_kierunku }}></p>
        </div>
      )}
    </div>
  )
}
function Slogan({ slogan }) {
  return (
    <>
      {slogan && (
        <div className='w-full flex flex-row justify-center items-center'>
          <div className='w-2/3 text-center'>
            <h1 className='text-xl'>{slogan}</h1>
          </div>
        </div>
      )}
    </>
  )
}
function Przedmioty({ kierunek }) {
  if (!kierunek) return null
  return (
    <div className='flex flex-col gap-2'>
      {kierunek.rozszerzone_przedmioty && kierunek.rozszerzone_przedmioty.length > 0 && (
        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl font-bold '>Przedmioty rozszerzone</h1>
          <div>
            <p>{kierunek.rozszerzone_przedmioty}</p>
          </div>
        </div>
      )}
      {kierunek.punktowane_przedmioty && kierunek.punktowane_przedmioty.length > 0 && (
        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl font-bold '>Przedmioty punktowane</h1>
          <div>
            <p>{kierunek.punktowane_przedmioty}</p>
          </div>
        </div>
      )}
    </div>
  )
}
function Stats({ kierunek }) {
  return (
    <div className='text-md flex flex-col justify-start items-start w-full gap-2 flex-wrap'>
      {kierunek.liczba_oddzialow > 0 && (
        <>
          <h1 className='font-bold text-2xl'>Szczegóły</h1>
          <div className='flex flex-row gap-4 items-center'>
            <div>
              <Users size={20} />
            </div>
            <p>Oddziały - {kierunek.liczba_oddzialow}</p>
          </div>
        </>
      )}

      {kierunek.liczba_oddzialow > 0 && (
        <div className='flex flex-row gap-4 items-center'>
          <div>
            <User size={20} />
          </div>
          <p>Uczniowie - {kierunek.liczba_uczniow}</p>
        </div>
      )}
    </div>
  )
}

function RenderAccordionOfListedInfo({ kierunek }) {
  if (
    !kierunek.umiejetnosci.length &&
    !kierunek.praca.length &&
    !kierunek.warunki_pracy.length &&
    !kierunek.cechy_ludzkie_dla_kierunku.length &&
    !kierunek.mozliwosci_rozwoju.length
  )
    return null

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
          <AccordionTrigger className='text-lg'>Jakie umiejętności zdobędę?</AccordionTrigger>
          <AccordionContent>
            <RenderListedInfo list={kierunek.umiejetnosci} itemLabel={'umiejetnosc'} />
          </AccordionContent>
        </AccordionItem>
      )}
      {kierunek.praca.length > 0 && (
        <AccordionItem value='item-2'>
          <AccordionTrigger className='text-lg'>Jaką pracę mogę zdobyć?</AccordionTrigger>
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
