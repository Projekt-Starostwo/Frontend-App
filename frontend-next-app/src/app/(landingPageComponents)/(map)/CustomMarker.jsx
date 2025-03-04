"use client";

import { Marker, Popup, Tooltip } from "react-leaflet";
import ReactDOMServer from "react-dom/server";
import Image from "next/image";
import { appedDomain } from "@/lib/utils";

import { CheckSchoolSupportedTypes } from "../(sidebarList)/ListOfSchools";
import Link from "next/link";
import { BookOpen, Link2, LocateFixed, MapPin, MapPinned } from "lucide-react";
import LinkButton from "@/components/LinkButton";
import { Button } from "@/components/ui/button";
import {
  Tooltip as ShadcnTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function CustomMarker({ school, showPopup }) {
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
      {showPopup && school.isActive && (
        <Popup offset={[0, -20]} className="p-0" maxWidth={400}>
          {/* <div className="flex flex-col justify-start items-start gap-2">
            <h1 className="text-lg font-bold text-center">
              {school.nazwa_szkoly}
            </h1>
            <div className="w-full flex flex-row justify-center items-center space-x-2 overflow-x-auto py-1 no-scrollbar">
              <CheckSchoolSupportedTypes school={school} />
            </div>

            <div className=" grid grid-cols-10 gap-2 w-full">
              <div className="col-span-2 text-foreground">
                <TooltipProvider delayDuration={100}>
                  <ShadcnTooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={`https://www.google.com/maps/dir/?api=1&destination=${school.lokalizacja_szkoly.dlugosc_geograficzna_szkoly},${school.lokalizacja_szkoly.szerokosc_geograficzna_szkoly}&travelmode=riding`}
                        target="_blank"
                      >
                        <Button variant="outline" className="w-full h-full p-0">
                          <MapPinned color="#4f9bd9 " />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>Otwórz w Google Maps</p>
                    </TooltipContent>
                  </ShadcnTooltip>
                </TooltipProvider>
              </div>
              <div className="col-span-8">
                <Link href={`/${school.skrot_szkoly}`}>
                  <Button
                    className="w-full h-full text-foreground"
                    variant="outline"
                  >
                    <span className="flex items-center">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Szczegóły
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </div> */}
          {/* <div className="w-full flex flex-row justify-center items-center py-6">
            <div className="h-20 flex justify-center items-center">
              <Image
                src={appedDomain(school.glowne_zdjecie_szkoly.url)}
                width={100}
                height={100}
                alt="Logo Szkoły"
                className="rounded-sm"
              />
            </div>
          </div> */}
          <div className="pb-2">
            <div className="text-lg font-bold text-center leading-tight">
              {school.nazwa_szkoly}
            </div>
          </div>
          <div>
            <div className="flex justify-center space-x-2 overflow-x-auto py-1 no-scrollbar">
              <CheckSchoolSupportedTypes school={school} />
            </div>
          </div>
          <div className="pt-0">
            <div className="grid grid-cols-10 gap-2 w-full">
              <div className="col-span-2">
                <TooltipProvider delayDuration={100}>
                  <ShadcnTooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={`https://www.google.com/maps/dir/?api=1&destination=${school.lokalizacja_szkoly.dlugosc_geograficzna_szkoly},${school.lokalizacja_szkoly.szerokosc_geograficzna_szkoly}&travelmode=riding`}
                        target="_blank"
                      >
                        <Button variant="outline" className="w-full h-full p-0">
                          <MapPinned color="#4f9bd9" />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>Otwórz w Google Maps</p>
                    </TooltipContent>
                  </ShadcnTooltip>
                </TooltipProvider>
              </div>
              <div className="col-span-8">
                <Link href={`/${school.skrot_szkoly}`}>
                  <Button
                    className="w-full h-full text-foreground"
                    variant="outline"
                  >
                    <span className="flex items-center">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Szczegóły
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Popup>
      )}
    </Marker>
  );
}

export function MarkerHtml({ school }) {
  return (
    <div
      className={`flex items-center justify-center ${
        school.isActive ? "opcatity-100" : "opacity-50"
      }`}
    >
      <Image
        src={appedDomain(school.glowne_zdjecie_szkoly.url)}
        width={50}
        height={50}
        alt="logo szkoly"
        className="w-10 h-10 rounded-sm"
      />
    </div>
  );
}
