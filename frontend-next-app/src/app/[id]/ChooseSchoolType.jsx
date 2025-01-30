import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default async function SchoolType({ school }) {
  const { listaLiceum, listaTechnikum, listaSzkolaZawodowa } =
    extractListForSchoolType(school);

  //   console.log(listaLiceum)
  //   console.log(listaTechnikum)
  //   console.log(listaSzkolaZawodowa)
  return (
    <Accordion type="single" collapsible className="w-full">
      <CustomAccordionItem title="Liceum" list={listaLiceum} school={school} />
      <CustomAccordionItem
        title="Technikum"
        list={listaTechnikum}
        school={school}
      />
      <CustomAccordionItem
        title="Szkoła Zawodowa"
        list={listaSzkolaZawodowa}
        school={school}
      />
    </Accordion>
  );
}

async function CustomAccordionItem({ list, title, school }) {
  return (
    <>
      {list?.length != 0 && (
        <AccordionItem value={title}>
          <AccordionTrigger>{title}</AccordionTrigger>
          <AccordionContent>
            {list?.map((kierunekValue) => {
              const { kierunek } = kierunekValue;
              return (
                <Link
                  href={`/szspld1dk1oqckcwddi25tzp/${kierunek.nazwa_kierunku}`}
                >
                  <h1 className="">{kierunek.nazwa_kierunku}</h1>
                </Link>
              );
            })}
          </AccordionContent>
        </AccordionItem>
      )}
    </>
  );
}
function extractListForSchoolType(school) {
  const listaLiceum = school.data.lista_kierunkow.filter(
    (kierunek) => kierunek.kierunek?.typ_kierunku === "liceum"
  );
  const listaTechnikum = school.data.lista_kierunkow.filter(
    (kierunek) => kierunek.kierunek?.typ_kierunku === "technikum"
  );
  const listaSzkolaZawodowa = school.data.lista_kierunkow.filter(
    (kierunek) => kierunek.kierunek?.typ_kierunku === "szkola_zawodowa"
  );

  return { listaLiceum, listaTechnikum, listaSzkolaZawodowa };
}
