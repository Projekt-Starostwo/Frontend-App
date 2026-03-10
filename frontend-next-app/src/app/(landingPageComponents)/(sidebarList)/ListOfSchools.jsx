import { BookOpen, MapPin, GraduationCap, MapPinned } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { useEnv } from "@/lib/EnvProvider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

export default function ListOfSchools({
  map,
  listOfSchools,
  setShowMarkers,
  setSelectedTab,
  setNewSchoolFocused,
}) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-auto p-3">
        <div className="space-y-2">
          {listOfSchools?.map((school) => {
            return (
              <SchoolListItem
                map={map}
                key={school.id}
                school={school}
                setShowMarkers={setShowMarkers}
                setSelectedTab={setSelectedTab}
                setNewSchoolFocused={setNewSchoolFocused}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function SchoolListItem({
  school,
  map,
  setShowMarkers,
  setSelectedTab,
  setNewSchoolFocused,
}) {
  const { cmsUrl } = useEnv();
  return (
    <div
      className={`group flex gap-3 p-2.5 rounded-xl border bg-card hover:shadow-md hover:border-foreground/10 transition-all  ${
        school.isActive ? "" : "opacity-50 pointer-events-none grayscale"
      }`}
    >
      <div className="w-16 h-16 rounded-lg  flex-shrink-0 overflow-hidden flex items-center justify-center ">
        {cmsUrl && school.glowne_zdjecie_szkoly?.url ? (
          <Image
            src={`${cmsUrl}${school.glowne_zdjecie_szkoly.url}`}
            width={56}
            height={56}
            alt="Logo Szkoły"
            className="w-full h-full object-contain"
          />
        ) : (
          <GraduationCap className="w-6 h-6 text-muted-foreground" />
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-start gap-2 py-0.5">
        <Link
          href={`${school.skrot_szkoly}`}
          className="hover:underline underline-offset-2 hover:cursor-pointer"
        >
          <h3 className="text-sm font-medium text-foreground line-clamp-2 leading-tight">
            {school.nazwa_szkoly}
          </h3>
        </Link>
        <div className="flex items-center gap-1.5 flex-wrap">
          <CheckSchoolSupportedTypes school={school} />
        </div>
      </div>

      <div className="flex flex-col justify-start items-start gap-1">
        {map && (
          <button
            className="p-1.5 rounded-md bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => {
              setShowMarkers(false);

              if (setSelectedTab && setNewSchoolFocused) {
                console.log("new school");
                setSelectedTab("map");
                setNewSchoolFocused([
                  school.lokalizacja_szkoly.dlugosc_geograficzna_szkoly,
                  school.lokalizacja_szkoly.szerokosc_geograficzna_szkoly,
                ]);
                return;
              }

              map.map.flyTo(
                [
                  school.lokalizacja_szkoly.dlugosc_geograficzna_szkoly,
                  school.lokalizacja_szkoly.szerokosc_geograficzna_szkoly,
                ],
                16,
                {
                  duration: 0.5,
                },
              );
              setTimeout(() => {
                setShowMarkers(true);
              }, 500);
            }}
          >
            <MapPin className="w-3.5 h-3.5" />
          </button>
        )}
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`https://www.google.com/maps/dir/?api=1&destination=${school.lokalizacja_szkoly.dlugosc_geograficzna_szkoly},${school.lokalizacja_szkoly.szerokosc_geograficzna_szkoly}&travelmode=riding`}
                target="_blank"
              >
                <button
                  variant="outline"
                  className="p-1.5 rounded-md bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  <MapPinned color="#4f9bd9" className="w-3.5 h-3.5" />
                </button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Otwórz w Google Maps</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export function CheckSchoolSupportedTypes({ school }) {
  return (
    <>
      {school.rodzaje_szkoly.liceum?.lista_kierunkow.length > 0 && (
        <Badge variant="secondary" className="text-[9px] px-1.5 py-0 h-4">
          Liceum
        </Badge>
      )}
      {school.rodzaje_szkoly.technikum?.lista_kierunkow.length > 0 && (
        <Badge variant="secondary" className="text-[9px] px-1.5 py-0 h-4">
          Technikum
        </Badge>
      )}
      {school.rodzaje_szkoly.szkola_zawodowa?.lista_kierunkow.length > 0 ? (
        school.nazwa_szkoly !== "Zespół Szkół Ekonomicznych" ? (
          <Badge variant="secondary" className="text-[9px] px-1.5 py-0 h-4">
            Branżowa
          </Badge>
        ) : (
          <Badge variant="secondary" className="text-[9px] px-1.5 py-0 h-4">
            Szkoła Artystyczna
          </Badge>
        )
      ) : null}
    </>
  );
}
