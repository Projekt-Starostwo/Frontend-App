'use client'

import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import CustomMarker from './CustomMarker'
import RequestLocation from '@/app/lokalizacja-usera/page'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import L from 'leaflet'
import { Bus, ExternalLink, User } from 'lucide-react'
import ReactDOMServer from 'react-dom/server'
import { PRZYSTANKI_MMZ } from '@/lib/przystankiMmz'
import Link from 'next/link'

export const MAP_CENTER = [52.179, 21.57211]

export default function LeafletMap({ map, listOfSchools, showSearch, showPopup }) {
  const { theme } = useTheme()
  const [userPosition, setUserPosition] = useState(null)
  const [selectedSchool, setSelectedSchool] = useState(null)

  const [pokazPrzystanki, setPokazPrzystanki] = useState(false)

  return (
    <>
      <div className='w-full flex flex-row justify-between items-center relative'>
        {/* buttons is shown on the map via custom css class (globals.css) */}
        <Button className='border-2 border-transparent reset-map' onClick={() => map.map.setView(MAP_CENTER, 10)}>
          Zresetuj mapę
        </Button>
        <Button
          className={`${pokazPrzystanki ? 'przystanki-btn btn-active' : 'przystanki-btn'}`}
          onClick={() => setPokazPrzystanki((prevState) => !prevState)}
        >
          Pokaz przystanki
        </Button>
        {showSearch && (
          <div className='w-1/3'>
            <Input placeholder='Szukaj szkoły...' />
          </div>
        )}
      </div>

      <RequestLocation onLocationGranted={setUserPosition} />

      <MapContainer
        div
        center={MAP_CENTER}
        zoom={10}
        style={{
          height: '100%',
          width: '100%',
          borderRadius: '10px',
          zIndex: 10,
        }} // Add zIndex here
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

        {listOfSchools?.data?.map((school) => (
          <CustomMarker
            key={school.id}
            school={school}
            onClick={() =>
              setSelectedSchool([
                school.lokalizacja_szkoly.dlugosc_geograficzna_szkoly,
                school.lokalizacja_szkoly.szerokosc_geograficzna_szkoly,
              ])
            }
            userPosition={userPosition}
            showPopup={showPopup}
          />
        ))}
        {pokazPrzystanki &&
          PRZYSTANKI_MMZ?.map((przystanek) => {
            return <Przystanek key={crypto.randomUUID()} przystanek={przystanek} />
          })}
        {userPosition && (
          <Marker
            position={userPosition}
            icon={L.divIcon({
              className: 'user-marker',
              html: ReactDOMServer.renderToString(<User size={24} color='cyan' />),
              iconSize: [24, 24],
              iconAnchor: [12, 12],
            })}
          >
            <Popup>Twoja lokalizacja</Popup>
          </Marker>
        )}
        {selectedSchool && userPosition && <Polyline positions={[userPosition, selectedSchool]} color='blue' />}
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
    console.log('jest m1')
    return <OznaczenieLink oznaczenie={oznaczenie} link='https://www.minsk-maz.pl/718,linia-m1' />
  }

  if (oznaczenie === 'M2') {
    console.log('jest m2')
    return <OznaczenieLink oznaczenie={oznaczenie} link='https://www.minsk-maz.pl/719,linia-m2' />
  }

  if (oznaczenie === 'M3') {
    console.log('jest m3')
    return <OznaczenieLink oznaczenie={oznaczenie} link='https://www.minsk-maz.pl/720,linia-m3`' />
  }

  if (oznaczenie === 'M4') {
    console.log('jest m4')
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
