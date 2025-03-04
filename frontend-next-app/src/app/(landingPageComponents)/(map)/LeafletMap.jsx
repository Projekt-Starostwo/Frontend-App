'use client'

import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import CustomMarker from './CustomMarker'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import L from 'leaflet'
import { Bus, ExternalLink, LocateFixed, MapPinned } from 'lucide-react'
import ReactDOMServer from 'react-dom/server'
import { PRZYSTANKI_MMZ } from '@/lib/przystankiMmz'
import { GraniceMmz } from '@/lib/granicemmz'
import Link from 'next/link'

export const MAP_CENTER = [52.179, 21.57211]
const DEFAULT_ZOOM = 14

export default function LeafletMap({ map, listOfSchools, showPopup, initialMapCenter }) {
  const { theme } = useTheme()
  const [pokazPrzystanki, setPokazPrzystanki] = useState(false)

  return (
    <>
      <div className='w-full flex flex-row justify-between items-center relative bg-black'>
        {/* buttons is shown on the map via custom css class (globals.css) */}
        <Button
          className='border-2 border-transparent reset-map'
          onClick={() => {
            map.map.setView(initialMapCenter ? initialMapCenter : MAP_CENTER, DEFAULT_ZOOM)
          }}
        >
          <LocateFixed />
          <p>Zresetuj mapę</p>
        </Button>
        <Button
          className={`${pokazPrzystanki ? 'przystanki-btn btn-active' : 'przystanki-btn'}`}
          onClick={() => setPokazPrzystanki((prevState) => !prevState)}
        >
          <Bus />
          <p>Pokaz przystanki</p>
        </Button>
      </div>

      <MapContainer
        div
        center={initialMapCenter ? initialMapCenter : MAP_CENTER}
        zoom={DEFAULT_ZOOM}
        className='w-full h-full z-10 rounded-xl'
        maxZoom={17}
        minZoom={13}
        maxBounds={[
          [51.8, 20.6],
          [52.5, 22.4113],
        ]}
        ref={map.setMap}
      >
        <TileLayer
          attribution={
            theme === 'dark'
              ? '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }
          url={
            theme === 'dark'
              ? 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
              : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          }
        />
        {GraniceMmz.map((polygon, index) => (
          <Polygon
            key={index}
            positions={polygon.coordinates[0].map((coord) => [coord[1], coord[0]])}
            weight={4}
            color={'#1E90FF'}
            fill={false}
          />
        ))}
        {listOfSchools?.map((school) => (
          <CustomMarker key={school.id} school={school} showPopup={showPopup} />
        ))}
        {pokazPrzystanki &&
          PRZYSTANKI_MMZ?.map((przystanek) => {
            return <Przystanek key={crypto.randomUUID()} przystanek={przystanek} />
          })}
      </MapContainer>
    </>
  )
}
function Przystanek({ przystanek }) {
  return (
    <Marker
      position={[przystanek.lat, przystanek.lon]}
      icon={L.divIcon({
        iconSize: [0, 0],
        html: ReactDOMServer.renderToString(
          <div className='bg-transparent'>
            <Bus size={20} color='var(--main-mmz-blue)' />
          </div>
        ),
      })}
    >
      <Popup>
        <h1 className='font-bold text-lg py-1'>{przystanek.name}</h1>
        <div>
          {przystanek.oznaczenia.map((oznaczenie) => (
            <div key={przystanek.id}>{getCorrectBusTableUrl(oznaczenie)}</div>
          ))}
        </div>
      </Popup>
    </Marker>
  )
}
function getCorrectBusTableUrl(oznaczenie) {
  // console.log(oznaczenie)
  if (oznaczenie === 'M1') {
    // console.log('jest m1')
    return <OznaczenieLink oznaczenie={oznaczenie} link='https://www.minsk-maz.pl/718,linia-m1' />
  }

  if (oznaczenie === 'M2') {
    // console.log('jest m2')
    return <OznaczenieLink oznaczenie={oznaczenie} link='https://www.minsk-maz.pl/719,linia-m2' />
  }

  if (oznaczenie === 'M3') {
    // console.log('jest m3')
    return <OznaczenieLink oznaczenie={oznaczenie} link='https://www.minsk-maz.pl/720,linia-m3`' />
  }

  if (oznaczenie === 'M4') {
    // console.log('jest m4')
    return <OznaczenieLink oznaczenie={oznaczenie} link='https://www.minsk-maz.pl/1154,linia-m4' />
  }
}
function OznaczenieLink({ oznaczenie, link }) {
  return (
    <div className='flex flex-row justify-between gap-5'>
      <h1 className='font-bold'>{oznaczenie}</h1>
      <Link target='_blank' href={link}>
        <div className='flex flex-row gap-1'>
          <ExternalLink size={15} />
          <h1> Rozkład</h1>
        </div>
      </Link>
    </div>
  )
}
