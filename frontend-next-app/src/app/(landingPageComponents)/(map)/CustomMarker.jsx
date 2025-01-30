"use client";

import { Marker, Tooltip } from "react-leaflet";
import ReactDOMServer from "react-dom/server";
import { useRouter } from "next/navigation";

export default function CustomMarker({ school }) {
  console.log(school);
  const router = useRouter();
  // renderToSTaticMarkup zamieni react component na statyczny html ktory poprawnie sie pokaze jako marker
  var myIcon = L.divIcon({
    html: ReactDOMServer.renderToStaticMarkup(<MarkerHtml school={school} />),
    className: "custom-marker",
    iconSize: [50, 50],
  });
  const handleClick = () => {
    router.push(`/${school.id}`);
  };

  // dowolny html wyswietli sie na mapie jako marker, proponuje herb szkoly
  {
    <Marker
      position={[
        school.lokalizacja_szkoly.dlugosc_geograficzna_szkoly,
        school.lokalizacja_szkoly.szerokosc_geograficzna_szkoly,
      ]}
      icon={myIcon}
      eventHandlers={{ click: handleClick }}
    >
      <Tooltip>{school.nazwa_szkoly}</Tooltip>
    </Marker>;
  }
}
export function MarkerHtml({ school }) {
  return (
    <div className="h-10 w-10 bg-red-500 flex items-center justify-center">
      <h1>{school.nazwa_szkoly}</h1>
      <img
        src={school.glowne_zdjecie_szkoly}
        alt="School logo"
        className="h-10 w-10 object-contain rounded-full"
      />
    </div>
  );
}
