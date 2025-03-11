import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link2 } from "lucide-react";
import Link from "next/link";
import { appedDomain, slugify } from "@/lib/utils";
export default async function OfertaEdukacyjna({ school }) {
  // console.log(school)
  return (
    <div className="p-4 flex flex-col justify-center items-center gap-8">
      {school.rodzaje_szkoly.liceum && (
        <SchoolType
          school={school}
          schoolDescription={school.rodzaje_szkoly.liceum?.opis_typu_szkoly}
          listaKierunkow={school.rodzaje_szkoly.liceum?.lista_kierunkow}
          typ="Liceum"
        />
      )}
      {school.rodzaje_szkoly.technikum && (
        <SchoolType
          school={school}
          schoolDescription={school.rodzaje_szkoly.technikum?.opis}
          listaKierunkow={school.rodzaje_szkoly.technikum?.lista_kierunkow}
          typ="Technikum"
        />
      )}
      {school.rodzaje_szkoly.szkola_zawodowa && (
        <SchoolType
          school={school}
          schoolDescription={school.rodzaje_szkoly.szkola_zawodowa?.opis}
          listaKierunkow={
            school.rodzaje_szkoly.szkola_zawodowa?.lista_kierunkow
          }
          typ="Szkoła Zawodowa"
        />
      )}
    </div>
  );
}

function SchoolType({ school, listaKierunkow, typ, schoolDescription }) {
  // console.log(school)
  return (
    <div className="w-full flex flex-col">
      <h1 className="text-3xl font-bold">{typ}</h1>
      {schoolDescription && (
        <div>
          <p
            className="pt-4"
            dangerouslySetInnerHTML={{ __html: schoolDescription }}
          ></p>
        </div>
      )}

      <Accordion type="single" collapsible className="">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <h2 className="text-lg">Lista wszystkich kierunków</h2>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            {listaKierunkow?.map((kierunekValue, index) => {
              const { kierunek } = kierunekValue;
              return (
                <Link
                  key={index}
                  href={`/${school.skrot_szkoly}/${slugify(
                    kierunek.nazwa_kierunku
                  )}`}
                >
                  <Button variant="link">
                    <Link2 />{" "}
                    <p className="text-lg">{kierunek.nazwa_kierunku}</p>
                  </Button>
                </Link>
              );
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
