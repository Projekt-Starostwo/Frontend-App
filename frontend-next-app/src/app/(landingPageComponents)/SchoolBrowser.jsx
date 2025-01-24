"use client";

import dynamic from "next/dynamic";
const LeafletMap = dynamic(() => import("./(map)/LeafletMap"), { ssr: false });
import ListOfSchools from "./(sidebarList)/ListOfSchools";
import { useState } from "react";

export default function SchoolBrowser() {
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
    },
    {
      id: "94u2333333334032",
      nazwa: "chemik",
      cords: { lat: "52.175697", long: "21.570852" },
    },
  ];
  return (
    <div className="flex flex-row h-[80vh]">
      <ListOfSchools map={mapObj} listOfSchools={mockData} />
      <LeafletMap map={mapObj} listOfSchools={mockData} />
    </div>
  );
}
