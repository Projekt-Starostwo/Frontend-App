'use client'

import dynamic from 'next/dynamic'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Districts from './Districts'
import CustomMarker from './CustomMarker'
import { Button } from '@/components/ui/button'

import { useTheme } from 'next-themes'

import { useEffect, useState, useRef } from 'react'
import { Input } from '@/components/ui/input'

export const MAP_CENTER = [52.179, 21.57211]

const LeafletMap = ({ map, listOfSchools, search }) => {
  const { theme } = useTheme()

  // console.log(listOfSchools)
  return (
    // <div className='h-full w-2/3 p-20 flex flex-col justify-center items-center gap-10'>
    <>
      <div className='w-full flex flex-row justify-between items-center '>
        <Button className='' onClick={() => map.map.setView(MAP_CENTER, 10)}>
          Zresetuj mapę
        </Button>
        {search && (
          <div className='w-1/3'>
            <Input placeholder='Szukaj szkoły...' />
          </div>
        )}
      </div>

      <MapContainer
        center={MAP_CENTER}
        zoom={10}
        style={{ height: '100%', width: '100%', borderRadius: '10px' }}
        maxZoom={17}
        minZoom={10}
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

        {listOfSchools.data.map((school) => {
          return <CustomMarker key={school.id} school={school} />
        })}
        <Districts />
      </MapContainer>
    </>
    // </div>
  )
}

export default dynamic(() => Promise.resolve(LeafletMap), { ssr: false })
