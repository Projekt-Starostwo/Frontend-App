'use client'

import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import CustomMarker from './CustomMarker'
import RequestLocation from '@/app/lokalizacja-usera/page'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import L from 'leaflet'
import { User } from 'lucide-react'
import ReactDOMServer from 'react-dom/server'

export const MAP_CENTER = [52.179, 21.57211]

export default function LeafletMap({ map, listOfSchools, showSearch, showPopup }) {
  const { theme } = useTheme()
  const [userPosition, setUserPosition] = useState(null)
  const [selectedSchool, setSelectedSchool] = useState(null)

  const userIcon = L.divIcon({
    className: 'user-marker',
    html: ReactDOMServer.renderToString(<User size={24} color='blue' />),
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  })

  return (
    <>
      <div className='w-full flex flex-row justify-between items-center'>
        <Button onClick={() => map.map.setView(MAP_CENTER, 10)}>Zresetuj mapę</Button>
        {showSearch && (
          <div className='w-1/3'>
            <Input placeholder='Szukaj szkoły...' />
          </div>
        )}
      </div>

      <RequestLocation onLocationGranted={setUserPosition} />

      <MapContainer
        center={MAP_CENTER}
        zoom={10}
        style={{ height: '100%', width: '100%', borderRadius: '10px', zIndex: 10 }} // Add zIndex here
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

        {userPosition && (
          <Marker position={userPosition} icon={userIcon}>
            <Popup>Twoja lokalizacja</Popup>
          </Marker>
        )}

        {selectedSchool && userPosition && <Polyline positions={[userPosition, selectedSchool]} color='blue' />}
      </MapContainer>
    </>
  )
}
