"use client";

import { Marker, Popup } from "react-leaflet";
import ReactDOMServer from "react-dom/server";
import Image from "next/image";
import { appedDomain } from "@/lib/utils";
import DowiedzSieWiecej from "@/components/LinkButton";
import { CheckSchoolSupportedTypes } from "../(sidebarList)/SchoolListItem";
import Link from "next/link";
import { MapPin } from "lucide-react";

export default function CustomMarker({ school, userPosition }) {
  var myIcon = L.divIcon({
    html: ReactDOMServer.renderToStaticMarkup(<MarkerHtml school={school} />),
    className: "custom-marker",
    iconSize: [50, 50],
  });

  return (
    <Marker
      position={[
        school.lokalizacja_szkoly.dlugosc_geograficzna_szkoly,
        school.lokalizacja_szkoly.szerokosc_geograficzna_szkoly,
      ]}
      icon={myIcon}
    >
      <Popup offset={[0, -20]} className="p-0">
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="text-lg font-bold">{school.nazwa_szkoly}</h1>
          <div className="w-full flex flex-row gap-2 justify-start items-start">
            <div>
              <CheckSchoolSupportedTypes school={school} />
            </div>
          </div>

          <div className="w-full flex flex-row justify-end items-center">
            <DowiedzSieWiecej school={school} />
          </div>
          <div className="w-[full] flex flex-row justify-end items-center">
            <MapPin />
            <Link
              href={`https://www.google.com/maps/dir/${userPosition?.[0]},${userPosition?.[1]}/${school.lokalizacja_szkoly.dlugosc_geograficzna_szkoly},${school.lokalizacja_szkoly.szerokosc_geograficzna_szkoly}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Zobacz trasę w Google Maps
            </Link>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export function MarkerHtml({ school }) {
  return (
    <div className="flex items-center justify-center">
      <Image
        src={appedDomain(school.glowne_zdjecie_szkoly.url)}
        width={50}
        height={50}
        alt="logo szkoly"
        className="w-8 h-8"
      />
    </div>
  );
}
