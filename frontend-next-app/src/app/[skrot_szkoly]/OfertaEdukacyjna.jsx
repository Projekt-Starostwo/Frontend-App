"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { slugify, getPolishPlural } from "@/lib/utils";
import { useState } from "react";
import { GraduationCap, Wrench, Building2, ChevronRight } from "lucide-react";

export default function OfertaEdukacyjna({ school }) {
  return (
    <section className="mb-12">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
        Oferta edukacyjna
      </h2>
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {school.rodzaje_szkoly.liceum && (
          <SchoolTypeCard3
            school={school}
            schoolDescription={school.rodzaje_szkoly.liceum?.opis_typu_szkoly}
            listaKierunkow={school.rodzaje_szkoly.liceum?.lista_kierunkow}
            typ="Liceum Ogólnokształcące"
            icon={<GraduationCap className="w-6 h-6" />}
            bgColor="bg-blue-500"
          />
        )}
        {school.rodzaje_szkoly.technikum && (
          <SchoolTypeCard3
            school={school}
            schoolDescription={school.rodzaje_szkoly.technikum?.opis}
            listaKierunkow={school.rodzaje_szkoly.technikum?.lista_kierunkow}
            typ="Technikum"
            icon={<Wrench className="w-6 h-6" />}
            bgColor="bg-emerald-500"
          />
        )}
        {school.rodzaje_szkoly.szkola_zawodowa ? (
          school.nazwa_szkoly !== "Zespół Szkół Ekonomicznych" ? (
            <SchoolTypeCard3
              school={school}
              schoolDescription={school.rodzaje_szkoly.szkola_zawodowa?.opis}
              listaKierunkow={
                school.rodzaje_szkoly.szkola_zawodowa?.lista_kierunkow
              }
              typ="Branżowa Szkoła I Stopnia"
              icon={<Building2 className="w-6 h-6" />}
              bgColor="bg-amber-500"
            />
          ) : (
            <SchoolTypeCard3
              school={school}
              schoolDescription={school.rodzaje_szkoly.szkola_zawodowa?.opis}
              listaKierunkow={
                school.rodzaje_szkoly.szkola_zawodowa?.lista_kierunkow
              }
              typ="Szkoła Artystyczna"
              icon={<Building2 className="w-6 h-6" />}
              bgColor="bg-amber-500"
            />
          )
        ) : null}
      </div>
    </section>
  );
}

function SchoolTypeCard3({
  school,
  listaKierunkow,
  typ,
  schoolDescription,
  icon,
  bgColor,
}) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <div className="rounded-2xl flex-1 border overflow-hidden bg-background">
      <div className={`${bgColor} p-5 text-white`}>
        <div className="flex items-center gap-3 mb-1">
          {icon}
          <h3 className="text-lg font-bold">{typ}</h3>
        </div>
        <p className="text-sm text-white/70">
          {listaKierunkow?.length || 0} {getPolishPlural(listaKierunkow?.length || 0, 'kierunek', 'kierunki', 'kierunków')}
        </p>
      </div>

      <div className="p-5">
        {schoolDescription && (
          <div className="mb-4">
            <p
              className={`text-sm text-muted-foreground ${showFullDescription ? "" : "line-clamp-2"}`}
              dangerouslySetInnerHTML={{
                __html: showFullDescription
                  ? schoolDescription
                  : `${schoolDescription.slice(0, 100)}...`,
              }}
            ></p>
            <p
              onClick={() => setShowFullDescription((prev) => !prev)}
              className="underline cursor-pointer pt-2 text-sm text-muted-foreground"
            >
              {showFullDescription ? "Schowaj opis" : "Rozwiń opis"}
            </p>
          </div>
        )}
        <Accordion type="single" collapsible>
          <AccordionItem value="programs" className="border-none">
            <AccordionTrigger className="text-sm font-medium py-0 hover:no-underline">
              Zobacz kierunki
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <div className="space-y-2">
                {listaKierunkow?.map((kierunekValue, index) => {
                  const { kierunek } = kierunekValue;
                  return (
                    <Link
                      key={index}
                      href={`/${school.skrot_szkoly}/${slugify(kierunek.nazwa_kierunku)}`}
                    >
                      <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground p-2 -mx-2 rounded-lg hover:bg-muted">
                        <ChevronRight className="w-4 h-4" />
                        <div>
                          <p className="text-left text-wrap">
                            {kierunek.nazwa_kierunku}
                          </p>
                          {typ === "Branżowa Szkoła I Stopnia" &&
                            school.skrot_szkoly === "chemik" && (
                              <p className="text-left text-wrap text-xs">
                                (kierunek należy do oddziału wielozawodowego)
                              </p>
                            )}
                          {typ === "Branżowa Szkoła I Stopnia" &&
                            school.skrot_szkoly === "mechanik" &&
                            kierunek.nazwa_kierunku !==
                              "Mechanik pojazdów samochodowych z zajęciami praktycznymi w CKZIU" && (
                              <p className="text-left text-wrap text-xs">
                                (kierunek należy do oddziału wielozawodowego z
                                zajęciami praktycznymi u pracodawcy)
                              </p>
                            )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
