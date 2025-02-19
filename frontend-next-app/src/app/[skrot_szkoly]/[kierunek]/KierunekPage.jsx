import ErrorPage from "@/components/ErrorPage";
import LinkButton from "@/components/LinkButton";
import getKierunekInfo from "@/lib/queries";
import { appedDomain, deslugify } from "@/lib/utils";
import { Link2 } from "lucide-react";
import PhotoGallery from "@/components/PhotoGallery";
import Image from "next/image";

export default async function KierunekPage({ params }) {
  let kierunek = null;
  let error = null;

  try {
    kierunek = await getKierunekInfo(
      params.skrot_szkoly,
      deslugify(params.kierunek)
    );
  } catch (e) {
    error = e;
  }
  console.log(kierunek);

  return (
    <div className="h-auto w-full flex flex-col justify-start items-center p-10">
      {error && (
        <ErrorPage errorMessage={error.message} statusCode={error.statusCode}>
          <LinkButton
            buttonStyle={"p-0"}
            linkHref={`/${params.skrot_szkoly}`}
            linkIcon={<Link2 />}
          >
            Wróć do strony szkoły
          </LinkButton>
        </ErrorPage>
      )}

      {!error && kierunek && (
        <div className="h-full w-2/3 flex flex-col justify-start items-start gap-10 p-4">
          <div>
            <h1 className="text-4xl font-bold mb-8">
              {kierunek.nazwa_kierunku}
            </h1>
            <div className="h-1/2">
              <p className="">{kierunek.opis_kierunku}</p>
            </div>
          </div>
          {kierunek.galeria && (
            <PhotoGallery
              photos={kierunek.galeria}
              containerDivStyles={
                "h-[30vh] w-full flex flex-col justify-center items-center"
              }
            />
          )}

          {kierunek.lista_kwalifikacji.length > 0 && (
            <Kwalifikacje lista_kwalifikacji={kierunek.lista_kwalifikacji} />
          )}

          {kierunek.lista_kwalifikacji.length > 0 && (
            <Zawody lista_zawodow={kierunek.lista_zawodow} />
          )}
        </div>
      )}
    </div>
  );
}
function Kwalifikacje({ lista_kwalifikacji }) {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Kwalifikacje</h1>
      <div className="flex flex-col gap-4">
        {lista_kwalifikacji.map((kwalifikacjaValue) => {
          const { kwalifikacja } = kwalifikacjaValue;
          return (
            <div className="h-1/2 " key={kwalifikacja.id}>
              <h1 className="text-xl font-bold">
                {kwalifikacja.kod_kwalifikacji} -{" "}
                {kwalifikacja.nazwa_kwalifikacji}
              </h1>
              <p>{kwalifikacja.opis_kwalifikacji}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
function Zawody({ lista_zawodow }) {
  return (
    <div className="pt-10">
      <h1 className="text-4xl font-bold mb-8">Zawody</h1>
      <div className="flex flex-col gap-4">
        {lista_zawodow.map((zawodValue) => {
          const { zawod } = zawodValue;
          return (
            <div className="h-1/2 " key={zawod.id}>
              <h1 className="text-xl font-bold">{zawod.nazwa_zawodu}</h1>
              <p>{zawod.opis_zawodu}</p>
              <div className="flex flex-col justify-center items-center m-16 h-[20vh]">
                <Image
                  src={appedDomain(zawod.zdjecie_zawodu.url)}
                  alt={"Fdjks"}
                  width={100}
                  height={100}
                  className="w-72 rounded-lg"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
