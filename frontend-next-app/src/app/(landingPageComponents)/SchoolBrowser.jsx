"use client";

import dynamic from "next/dynamic";
const LeafletMap = dynamic(() => import("./(map)/LeafletMap"), { ssr: false });
import ListOfSchools from "./(sidebarList)/ListOfSchools";
import { useEffect, useState } from "react";

export default function SchoolBrowser() {
  const [listOfSchools, setListOfSchools] = useState(null);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch(
          "http://localhost:1337/api/lista-szkols?populate[0]=lokalizacja_szkoly&populate[1]=lista_kierunkow&populate[2]=lista_kierunkow.kierunek&populate[3]=lista_kierunkow.kierunek.zdjecie&populate[4]=rodzaje_szkoly&populate[5]=rodzaje_szkoly.liceum&populate[6]=rodzaje_szkoly.liceum.zdjecia_rodzaju&populate[7]=rodzaje_szkoly.technikum&populate[8]=rodzaje_szkoly.technikum.zdjecia_rodzaju&populate[9]=rodzaje_szkoly.szkola_zawodowa&populate[10]=rodzaje_szkoly.szkola_zawodowa.zdjecia_rodzaju&populate[11]=glowne_zdjecie_szkoly&populate[12]=glowna_galeria_zdjec_szkoly",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer 1d54c480d0e5873c7272abb970f3437280338930205778e2a156439d98b85e948c6065a8bd998bc54917400547dbadde38b71815bd2609244abd56bc9cccc454967fd46731082ad7d0eb27440ad3b038e588e336bbed19846e0bb3d662b7056062b32d1464e5d066da377c4a6b7fc33ebb62b4c32b63e8fb80056788b9174d69",
            },
          }
        );

        const data = await res.json();
        console.log("Odpowiedź API:", data); // Logujemy, co zwraca API

        if (res.ok) {
          setListOfSchools(data.data);
        } else {
          console.error("Błąd API:", data.error);
        }
      } catch (error) {
        console.error("Błąd pobierania szkół:", error);
      }
    };

    fetchSchools();
  }, []);
  // objekt mapa, na nim mozna wykonywac rozne operacje
  const [map, setMap] = useState(null);
  const mapObj = { map: map, setMap: setMap };
  // tutaj pobrac liste szkol, podac komponentom nizej do wyswietlenia
  // sztuczne dane dla testowania, schmemat objektu tez sztuczny, mozna zmienic kiedy kolwiek
  const mockData = [
    {
      id: "94u24032",
      nazwa: "budowlanka",
      cords: { lat: "52.185734", long: "21.571111" },
      logo: "https://lh3.googleusercontent.com/proxy/CLcdSGoxZJPWqi4sxovQxxW8IXdNKO4f8aPftCy6hdzR3YA9lzGSNngcV5Mnx1W97pVWwpfumcN9phHG1moHatkieo6JUIoc74GPcH7btWgdHYTi7zjH6DsGp9v67-0F",
    },
    {
      id: "94u2333333334032",
      nazwa: "chemik",
      cords: { lat: "52.175697", long: "21.570852" },
      logo: "https://zsmsc.edu.pl/wp-content/uploads/5-300x169.png",
    },
    {
      id: "94u1234567",
      nazwa: "ekonom",
      cords: { lat: "52.179289", long: "21.560702" },
      logo: "https://zsemm.edu.pl/wp-content/themes/zsemm/assets/images/grosz.png",
    },
    {
      id: "94u9999999",
      nazwa: "mechanik",
      cords: { lat: "52.171397", long: "21.544434" },
      logo: "https://mechanik.home.pl/mechanik-new/wp-content/uploads/2021/03/zsz2_mechanik_logo.png",
    },
  ];
  return (
    <div className="flex flex-row h-[80vh]">
      {listOfSchools != null && (
        <>
          <ListOfSchools map={mapObj} listOfSchools={listOfSchools} />
          <LeafletMap map={mapObj} listOfSchools={listOfSchools} />
        </>
      )}
    </div>
  );
}
