"use client";
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
import { useState } from "react";

export default function OfertaEdukacyjna({ school }) {
  // console.log(school)
  return (
    <div className="w-full p-4 flex flex-col justify-center items-center gap-8">
      {school.rodzaje_szkoly.liceum && (
        <SchoolType
          school={school}
          schoolDescription={school.rodzaje_szkoly.liceum?.opis_typu_szkoly}
          listaKierunkow={school.rodzaje_szkoly.liceum?.lista_kierunkow}
          typ="Liceum Ogólnokształcące"
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
      {school.rodzaje_szkoly.szkola_zawodowa ? (
        school.nazwa_szkoly !== "Zespół Szkół Ekonomicznych" ? (
          <SchoolType
            school={school}
            schoolDescription={school.rodzaje_szkoly.szkola_zawodowa?.opis}
            listaKierunkow={
              school.rodzaje_szkoly.szkola_zawodowa?.lista_kierunkow
            }
            typ="Branżowa Szkoła I Stopnia"
          />
        ) : (
          <SchoolType
            school={school}
            schoolDescription={school.rodzaje_szkoly.szkola_zawodowa?.opis}
            listaKierunkow={
              school.rodzaje_szkoly.szkola_zawodowa?.lista_kierunkow
            }
            typ="Szkoła Artystyczna"
          />
        )
      ) : null}
    </div>
  );
}

function SchoolType({ school, listaKierunkow, typ, schoolDescription }) {
  // console.log(school)
  const [showFullDescription, setShowFullDescription] = useState(false);
  return (
    <div className="w-full flex flex-col">
      <h1 className="text-3xl font-bold">{typ}</h1>

      {schoolDescription && (
        <div>
          {showFullDescription ? (
            <p
              className="pt-4"
              dangerouslySetInnerHTML={{ __html: schoolDescription }}
            ></p>
          ) : (
            <p
              className="pt-4"
              dangerouslySetInnerHTML={{
                __html: `${schoolDescription.slice(0, 100)}...`,
              }}
            ></p>
          )}{" "}
          <p
            onClick={() => setShowFullDescription((prev) => !prev)}
            className="underline cursor-pointer pt-4"
          >
            {showFullDescription ? "Schowaj opis" : "Rozwiń opis"}
          </p>
        </div>
      )}

      <Accordion type="single" collapsible className="">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <h2 className="text-lg">Lista wszystkich kierunków</h2>
          </AccordionTrigger>
          <AccordionContent className="">
            {listaKierunkow?.map((kierunekValue, index) => {
              const { kierunek } = kierunekValue;
              return (
                <Link
                  key={index}
                  href={`/${school.skrot_szkoly}/${slugify(
                    kierunek.nazwa_kierunku
                  )}`}
                >
                  <Button variant="link" className="flex items-start h-fit ">
                    <p className="text-lg text-left  text-wrap ">
                      {kierunek.nazwa_kierunku}
                    </p>
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
