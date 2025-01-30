'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet'
import { MAP_CENTER } from '../(landingPageComponents)/(map)/LeafletMap'
import CustomMarker, { MarkerHtml } from '../(landingPageComponents)/(map)/CustomMarker'
import Districts from '../(landingPageComponents)/(map)/Districts'
import ReactDOMServer from 'react-dom/server'

const LeafletMap = dynamic(() => import('../(landingPageComponents)/(map)/LeafletMap'), { ssr: false })
export default function SingleSchoolMap({ school }) {
  const [map, setMap] = useState(null)
  const mapObj = { map: map, setMap: setMap }
  var myIcon = L.divIcon({
    html: ReactDOMServer.renderToStaticMarkup(<div className='h-[20px] w-[20px] bg-red-400'></div>),
    className: 'custom-marker',
  })
  // console.log(school.data.lokalizacja_szkoly)

  return (
    <div className='h-[95%] w-full p-6 '>
      {/* <Button className='bg-black text-slate-300' onClick={() => mapObj.map.setView(MAP_CENTER, 10)}>
        RESET MAP
      </Button> */}
      <MapContainer
        center={MAP_CENTER}
        zoom={10}
        style={{ height: '100%', width: '100%' }}
        maxZoom={17}
        minZoom={4}
        maxBounds={[
          [51.8, 20.6],
          [52.5, 22.4113],
        ]}
        ref={mapObj.setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright*">OpenStreetMap</a> contributors*'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <Marker
          position={[
            `${school.data.lokalizacja_szkoly.dlugosc_geograficzna_szkoly}`,
            `${school.data.lokalizacja_szkoly.szerokosc_geograficzna_szkoly}`,
          ]}
          icon={myIcon}
        >
          <Tooltip>{school.nazwa}</Tooltip>
        </Marker>

        <Districts />
      </MapContainer>
    </div>
  )
}
