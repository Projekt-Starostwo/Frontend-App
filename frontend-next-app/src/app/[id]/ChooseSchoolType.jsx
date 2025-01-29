import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default async function SchoolType({ school }) {
  const { listaLiceum, listaTechnikum, listaSzkolaZawodowa } = extractListForSchoolType(school)

  //   console.log(listaLiceum)
  //   console.log(listaTechnikum)
  //   console.log(listaSzkolaZawodowa)
  return (
    <Accordion type='single' collapsible className='w-full'>
      <CustomAccordionItem title='Liceum' list={listaLiceum} />
      <CustomAccordionItem title='Technikum' list={listaTechnikum} />
      <CustomAccordionItem title='Szkoła Zawodowa' list={listaSzkolaZawodowa} />
    </Accordion>
  )
}
function extractListForSchoolType(school) {
  const listaLiceum = school.data.lista_kierunkow.filter((kierunek) => kierunek.kierunek.typ_kierunku === 'liceum')
  const listaTechnikum = school.data.lista_kierunkow.filter(
    (kierunek) => kierunek.kierunek.typ_kierunku === 'technikum'
  )
  const listaSzkolaZawodowa = school.data.lista_kierunkow.filter(
    (kierunek) => kierunek.kierunek.typ_kierunku === 'szkola_zawodowa'
  )

  return { listaLiceum, listaTechnikum, listaSzkolaZawodowa }
}

async function CustomAccordionItem({ list, title }) {
  return (
    <>
      {list?.length != 0 && (
        <AccordionItem value={title}>
          <AccordionTrigger>{title}</AccordionTrigger>
          <AccordionContent>
            {list?.map((kierunek) => {
              //   console.log(kierunek.kierunek)
              return <p key={kierunek.id}>{kierunek.kierunek.nazwa_kierunku}</p>
            })}
          </AccordionContent>
        </AccordionItem>
      )}
    </>
  )
}
