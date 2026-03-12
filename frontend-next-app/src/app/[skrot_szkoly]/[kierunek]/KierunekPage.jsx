import ErrorPage from "@/components/ErrorPage";
import LinkButton from "@/components/LinkButton";
import getKierunekInfo, { getCmsUrl, getSchoolDetails } from "@/lib/queries";
import {
  deslugify,
  extractAndRemoveSchoolLinks,
  findKierunekByName,
  tryCatch,
} from "@/lib/utils";
import {
  ArrowLeft,
  GraduationCap,
  Code,
  Users,
  Layers,
  Award,
  Briefcase,
  ExternalLink,
  Sparkles,
  Link2,
  Glasses,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { FAQSection } from "./FAQSection";

export default async function KierunekPage({ params }) {
  const param = await params;
  const kierunekData = await tryCatch(
    getKierunekInfo(param.skrot_szkoly, deslugify(param.kierunek)),
  );
  const kierunek = kierunekData.data;
  const schoolData = await tryCatch(getSchoolDetails(param.skrot_szkoly));
  const school = schoolData.data;
  const cmsUrl = await getCmsUrl();

  const { justTheUrl, modifiedText } = extractAndRemoveSchoolLinks(
    kierunek?.slogan_start || "",
  );

  const result =
    kierunek && school
      ? findKierunekByName(school.rodzaje_szkoly, kierunek.nazwa_kierunku)
      : null;

  const faqs = [];
  if (kierunek?.umiejetnosci?.length > 0) {
    faqs.push({
      question: "Jakie umiejętności zdobędę?",
      answer: kierunek.umiejetnosci.map((item) => item.umiejetnosc).join(", "),
    });
  }
  if (kierunek?.praca?.length > 0) {
    faqs.push({
      question: "Jaką pracę mogę zdobyć?",
      answer: kierunek.praca.map((item) => item.praca).join(", "),
    });
  }
  if (kierunek?.warunki_pracy?.length > 0) {
    faqs.push({
      question: "Jak wygląda praca w tym zawodzie?",
      answer: kierunek.warunki_pracy.map((item) => item.cechy_pracy).join(", "),
    });
  }
  if (kierunek?.cechy_ludzkie_dla_kierunku?.length > 0) {
    faqs.push({
      question: "Dla kogo jest ten kierunek?",
      answer: kierunek.cechy_ludzkie_dla_kierunku
        .map((item) => item.cechy_ludzkie_dla_kierunku)
        .join(", "),
    });
  }
  if (kierunek?.mozliwosci_rozwoju?.length > 0) {
    faqs.push({
      question: "Dodatkowe możliwości rozwoju",
      answer: kierunek.mozliwosci_rozwoju
        .map((item) => item.mozliwosci_rozwoju)
        .join(", "),
    });
  }

  const hasSidebarContent =
    (kierunek?.rozszerzone_przedmioty &&
      kierunek.rozszerzone_przedmioty.length > 0) ||
    (kierunek?.punktowane_przedmioty &&
      kierunek.punktowane_przedmioty.length > 0) ||
    justTheUrl;

  return (
    <div className="min-h-screen ">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href={`/${param.skrot_szkoly}`}
          className="flex items-center gap-2 text-sm   transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Powrót do listy
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {(kierunekData.error || schoolData.error) && (
          <ErrorPage
            errorMessage={
              kierunekData.error?.message || schoolData.error?.message
            }
            statusCode={
              kierunekData.error?.statusCode || schoolData.error?.statusCode
            }
          >
            <LinkButton
              buttonStyle={"p-0"}
              linkHref={`/${param.skrot_szkoly}`}
              linkIcon={<Link2 />}
            >
              Wróć do strony szkoły
            </LinkButton>
          </ErrorPage>
        )}

        {!kierunekData.error && kierunek && (
          <>
            <div className="border rounded-2xl p-8  mb-6">
              <div className="flex flex-col  sm:flex-row items-start gap-6 ">
                <div className="w-24 h-24 rounded-2xl    flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {cmsUrl && school?.glowne_zdjecie_szkoly?.url ? (
                    <Image
                      src={`${cmsUrl}${school.glowne_zdjecie_szkoly.url}`}
                      width={80}
                      height={80}
                      alt="Logo szkoły"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <GraduationCap className="w-10 h-10 " />
                  )}
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold mb-3 leading-tight">
                    {school?.nazwa_szkoly}
                  </h1>
                  <p className=" leading-relaxed max-w-2xl">
                    {modifiedText || school?.opis_szkoly}
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`grid grid-cols-1 gap-6 ${hasSidebarContent ? "lg:grid-cols-3" : ""}`}
            >
              <div
                className={
                  hasSidebarContent ? "lg:col-span-2 space-y-6" : "space-y-6"
                }
              >
                <div
                  className={`grid grid-cols-1 gap-4 ${hasSidebarContent ? "sm:grid-cols-3" : "sm:grid-cols-1 md:grid-cols-3"}`}
                >
                  <div
                    className={`${hasSidebarContent ? "sm:col-span-1" : "sm:col-span-1 md:col-span-1"} border rounded-2xl p-6 `}
                  >
                    <Code className="w-8 h-8 mb-4 opacity-80" />
                    <p className="text-xs opacity-70 uppercase tracking-wider mb-1">
                      Kierunek
                    </p>
                    <h2 className="text-lg font-bold leading-tight">
                      {kierunek?.nazwa_kierunku}
                    </h2>
                  </div>

                  <>
                    <div className=" rounded-2xl p-6 border  flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[color-mix(in_srgb,var(--main-mmz-blue)_15%,white)] flex items-center justify-center">
                        <Users className="w-6 h-6 text-black" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold ">
                          {kierunek?.liczba_uczniow !== 0 &&
                            kierunek?.liczba_uczniow}
                        </p>
                        <p className="text-sm ">
                          {kierunek?.liczba_uczniow === 0
                            ? "Brak danych"
                            : "Uczniowie"}
                        </p>
                      </div>
                    </div>

                    <div className=" rounded-2xl p-6 border  flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[color-mix(in_srgb,var(--main-mmz-blue)_15%,white)] flex items-center justify-center">
                        <Layers className="w-6 h-6 text-black " />
                      </div>
                      <div>
                        <p className="text-3xl font-bold ">
                          {kierunek?.liczba_oddzialow != 0 &&
                            kierunek?.liczba_oddzialow}
                        </p>
                        <p className="text-sm ">
                          {kierunek?.liczba_oddzialow === 0
                            ? "Brak danych"
                            : "Oddziały"}
                        </p>
                      </div>
                    </div>
                  </>
                </div>

                {result?.type === "szkola_zawodowa" &&
                  school?.skrot_szkoly === "chemik" && (
                    <div className="bg-[color-mix(in_srgb,var(--main-mmz-secondary)_10%,white)] border  rounded-xl p-4 text-sm ">
                      Kierunek należy do oddziału wielozawodowego
                    </div>
                  )}

                {result?.type === "szkola_zawodowa" &&
                  school?.skrot_szkoly === "mechanik" &&
                  kierunek?.nazwa_kierunku !==
                    "Mechanik pojazdów samochodowych z zajęciami praktycznymi w CKZIU" && (
                    <div className="bg-[color-mix(in_srgb,var(--main-mmz-secondary)_10%,white)] border  rounded-xl p-4 text-sm ">
                      Kierunek należy do oddziału wielozawodowego z zajęciami
                      praktycznymi u pracodawcy
                    </div>
                  )}

                {kierunek?.opis_kierunku && (
                  <div className="white rounded-2xl p-6 border ">
                    <div
                      className="text-sm  leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: kierunek.opis_kierunku,
                      }}
                    />
                  </div>
                )}

                <FAQSection faqs={faqs} />
              </div>

              {hasSidebarContent && (
                <div className="space-y-6">
                  {kierunek?.rozszerzone_przedmioty &&
                    kierunek.rozszerzone_przedmioty.length > 0 && (
                      <div className=" rounded-2xl p-6 border ">
                        <h3 className="text-sm font-semibold  mb-4 flex items-center gap-2">
                          <Award className="w-4 h-4 " />
                          Przedmioty rozszerzone
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {kierunek.rozszerzone_przedmioty
                            .split(",")
                            .map((subject, idx) => (
                              <Badge key={idx} className=" px-3 py-1.5">
                                {subject.trim()}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    )}

                  {kierunek?.punktowane_przedmioty &&
                    kierunek.punktowane_przedmioty.length > 0 && (
                      <div className=" rounded-2xl p-6 border ">
                        <h3 className="text-sm font-semibold  mb-4 flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-slate-500" />
                          Przedmioty punktowane
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {kierunek.punktowane_przedmioty
                            .split(",")
                            .map((subject, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="border  px-3 py-1.5"
                              >
                                {subject.trim()}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    )}

                  {justTheUrl && (
                    <div className=" rounded-2xl p-6 border ">
                      <h3 className="text-sm font-semibold  mb-4 flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-slate-500" />
                        Przydatne linki
                      </h3>
                      <div className="space-y-3">
                        <a
                          href={justTheUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-xl   transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg  border  flex items-center justify-center group-hover:border-[color-mix(in_srgb,var(--main-mmz-blue)_30%,white)] transition-colors">
                            <ExternalLink className="w-4 h-4  group-hover:text-[var(--main-mmz-blue)]" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium ">
                              Dowiedź się więcej
                            </p>
                            <p className="text-xs text-slate-500 truncate">
                              {justTheUrl}
                            </p>
                          </div>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {kierunek?.slogan_koniec && (
              <div className="mt-8 border rounded-2xl p-6  text-center">
                <span className="text-sm font-medium">
                  {kierunek.slogan_koniec}
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
