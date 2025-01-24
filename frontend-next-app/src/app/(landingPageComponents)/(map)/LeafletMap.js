'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Districts from './Districts'
const LeafletMap = () => {
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowur1: 'https://unpkg.com/1eaflet@1.9.4/dist/images/marker-shadow.png',
    })
  }, [])

  return (
    <>
      <MapContainer
        center={[52.179, 21.57211]}
        zoom={10}
        style={{ height: '100%', width: '100%' }}
        maxZoom={17}
        minZoom={10}
        maxBounds={[
          [51.8, 20.6],
          [52.5, 22.4113],
        ]}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright*">OpenStreetMap</a> contributors*'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Marker position={[52.179291606625654, 21.57208768433162]} />

        <Districts />
      </MapContainer>
    </>
  )
}

export default dynamic(() => Promise.resolve(LeafletMap), { ssr: false })
