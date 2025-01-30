import { fetchSchoolInfo } from "@/lib/queries";

export default async function page({ params }) {
  const par = await params;
  console.log(par);
  console.log(par.kierunek);
  const kierunekNazwa = decodeURIComponent(par.kierunek);
  const kierunek = await getKierunekInfo(par.id, kierunekNazwa);

  return (
    <div className="w-full flex justify-center items-center flex-col p-10">
      <div className="w-2/3 p-4">
        <h1 className="text-4xl font-bold">{kierunek.nazwa_kierunku}</h1>
      </div>
      <div className="w-2/3 p-4">
        <p>{kierunek.opis_kierunku}</p>
      </div>
    </div>
  );
}

async function getKierunekInfo(schoolId, nazwa_kierunku) {
  const schoolInfo = await fetchSchoolInfo(schoolId);

  const listaKierunkow = schoolInfo.data.lista_kierunkow;

  const kierunek = listaKierunkow.filter((kierunek) => {
    return kierunek.kierunek.nazwa_kierunku === nazwa_kierunku;
  });
  //   console.log(kierunek[0].kierunek);
  return kierunek[0].kierunek;
  //   console.log(result);
}
