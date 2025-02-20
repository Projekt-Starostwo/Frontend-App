import LinkButton from "@/components/LinkButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link2, MapPin } from "lucide-react";

export default function ListOfSchools({ map, listOfSchools, userPosition }) {
  return (
    <div className="h-full w-1/3 overflow-y-auto p-5 flex flex-col gap-10">
      {listOfSchools?.data?.map((school) => {
        return <SchoolListItem map={map} key={school.id} school={school} />;
      })}
    </div>
  );
}

function SchoolListItem({ map, school, userPosition }) {
  console.log(school.rodzaje_szkoly);

  return (
    <div className="flex flex-col w-full ">
      <Card>
        <CardHeader>
          <CardTitle>
            <LinkButton
              linkHref={`/${school.skrot_szkoly}`}
              buttonStyle={"p-0"}
            >
              <h1 className="text-xl font-bold">{school.nazwa_szkoly}</h1>
            </LinkButton>
          </CardTitle>
          <CardDescription className="flex flex-row gap-2 py-4">
            <CheckSchoolSupportedTypes school={school} />
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className="flex flex-row justify-end items-center gap-4">
          <Button
            onClick={() => {
              map.map.setView(
                [
                  school.lokalizacja_szkoly.dlugosc_geograficzna_szkoly,
                  school.lokalizacja_szkoly.szerokosc_geograficzna_szkoly,
                ],
                16
              );
            }}
          >
            Pokaż na mapie
          </Button>
          <LinkButton
            linkHref={`https://www.google.com/maps/dir/?api=1&destination=${school.lokalizacja_szkoly.dlugosc_geograficzna_szkoly},${school.lokalizacja_szkoly.szerokosc_geograficzna_szkoly}&travelmode=riding`}
            linkIcon={<MapPin color="white" />}
            linkTarget="_blank"
            rel="noopener noreferrer"
          >
            <h1 className="text-white">Przejdź do Google Maps</h1>
          </LinkButton>
          <LinkButton
            linkHref={`/${school.skrot_szkoly}`}
            buttonStyle={"p-0"}
            linkIcon={<Link2 />}
          >
            Dowiedz się więcej
          </LinkButton>
        </CardFooter>
      </Card>
    </div>
  );
}
export function CheckSchoolSupportedTypes({ school }) {
  return (
    <>
      {school.rodzaje_szkoly.liceum?.lista_kierunkow.length > 0 && (
        <div className="flex flex-row gap-2 justify-start items-center">
          <Badge variant="secondary">Liceum</Badge>
        </div>
      )}
      {school.rodzaje_szkoly.technikum?.lista_kierunkow.length > 0 && (
        <div className="flex flex-row gap-2 justify-start items-center">
          <Badge variant="secondary">Technikum</Badge>
        </div>
      )}
      {school.rodzaje_szkoly.szkola_zawodowa?.lista_kierunkow.length > 0 && (
        <div className="flex flex-row gap-2 justify-start items-center">
          <Badge variant="secondary">Szkoła Zawodowa</Badge>
        </div>
      )}
    </>
  );
}
