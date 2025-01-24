"use client";

import { Marker } from "react-leaflet";
import ReactDOMServer from "react-dom/server";

export default function CustomMarker({ school }) {
  // renderToSTaticMarkup zamieni react component na statyczny html ktory poprawnie sie pokaze jako marker
  var myIcon = L.divIcon({
    html: ReactDOMServer.renderToStaticMarkup(<MarkerHtml />),
  });

  // dowolny html wyswietli sie na mapie jako marker, proponuje herb szkoly
  return (
    <Marker position={[school.cords.lat, school.cords.long]} icon={myIcon} />
  );
}
function MarkerHtml() {
  return <div className="bg-red-500 h-2 w-2"></div>;
}
