'use client'

import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import CustomMarker from './CustomMarker'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import L from 'leaflet'
import { BusFront, ExternalLink, LocateFixed } from 'lucide-react'
import ReactDOMServer from 'react-dom/server'
import { PRZYSTANKI_MMZ } from '@/lib/przystankiMmz'
import { GraniceMmz } from '@/lib/granicemmz'
import Link from 'next/link'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import { ZoomIn } from 'lucide-react'

const GraniceMMZ = [
  [52.146706, 21.502658],
  [52.22, 21.61],
]

export const MAP_CENTER = [52.179, 21.57211]
const DEFAULT_ZOOM = 14

export default function LeafletMap({
  map,
  listOfSchools,
  showPopup,
  initialMapCenter,
  showMarkers,
  setShowMarkers,
  newSchoolFocused,
}) {
  const { theme } = useTheme()
  const [pokazPrzystanki, setPokazPrzystanki] = useState(false)

  useEffect(() => {
    if (!setShowMarkers) {
      return
    }

    if (!newSchoolFocused || !map.map) {
      // console.log("probelm");
      // console.log(newSchoolFocused);
      // console.log(map.map);
      setShowMarkers(true)
      return
    }

    map.map.setView([newSchoolFocused[0], newSchoolFocused[1]], 16)
  }, [newSchoolFocused, map.map])

  useEffect(() => {
    if (!map.map) return

    const handleWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault()
        const zoom = map.map.getZoom()
        map.map.setZoom(e.deltaY < 0 ? zoom + 1 : zoom - 1)
      }
    }

    const mapContainer = map.map.getContainer()
    mapContainer.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      mapContainer.removeEventListener('wheel', handleWheel)
    }
  }, [map.map])

  const flyToLocation = (lat, lng, zoom) => {
    map.map.flyTo([lat, lng], zoom, { animate: true, duration: 0.5 })
  }

  return (
    <>
      {/* <div className='flex flex-col justify-end items-center w-full h-full'> */}
      {/* <div className='w-full  flex flex-col justify-end items-center  '> */}
      <div className='w-full z-[9999] flex flex-row justify-center items-center gap-4 flex-wrap absolute bottom-6  '>
        <Button className='cursor-default max-sm:hidden'>
          <ZoomIn />
          <p className='font-bold'>Zoomowanie mapy: Ctrl + Scroll</p>
        </Button>{' '}
        <Button
          className='border-2 border-transparent'
          onClick={() => {
            setShowMarkers(false)
            flyToLocation(MAP_CENTER[0], MAP_CENTER[1], DEFAULT_ZOOM)
            setTimeout(() => {
              setShowMarkers(true)
            }, 500)
          }}
        >
          <LocateFixed />
          <p className='font-bold'>Zresetuj mapę</p>
        </Button>{' '}
        <Button className={``} onClick={() => setPokazPrzystanki((prevState) => !prevState)}>
          <BusFront />
          <p className='font-bold'>{pokazPrzystanki ? 'Ukryj przystanki' : 'Pokaż przystanki'}</p>
        </Button>
      </div>
      <MapContainer
        // div
        center={initialMapCenter ? initialMapCenter : MAP_CENTER}
        zoom={DEFAULT_ZOOM}
        className='w-full h-full z-10 rounded-xl '
        maxZoom={17}
        minZoom={DEFAULT_ZOOM}
        // maxBounds={GraniceMMZ}
        ref={map.setMap}
        scrollWheelZoom={false}
      >
        {/* map bg color */}
        <div className={`w-full h-full ${theme === 'dark' ? 'bg-[#333333]' : 'bg-background'}`}></div>
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
        {showMarkers && (
          <>
            {listOfSchools?.map((school) => (
              <CustomMarker key={school.id} school={school} showPopup={showPopup} />
            ))}
            <MarkerClusterGroup
              key={pokazPrzystanki ? 'bus-cluster-visible' : 'bus-cluster-hidden'}
              chunkedLoading
              animate={true}
              spiderfyOnMaxZoom={true}
              showCoverageOnHover={false}
              iconCreateFunction={(cluster) => {
                const count = cluster.getChildCount()

                return L.divIcon({
                  html: `
        <div class="custom-bus-cluster">
          <div class="bus-icon"></div>
          <span class="bus-count">${count}</span>
        </div>
      `,
                  className: 'custom-bus-cluster-wrapper',
                  iconSize: [45, 45],
                })
              }}
            >
              {pokazPrzystanki &&
                PRZYSTANKI_MMZ?.map((przystanek) => <Przystanek key={crypto.randomUUID()} przystanek={przystanek} />)}
            </MarkerClusterGroup>
          </>
        )}
      </MapContainer>
      {/* </div> */}
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
            <BusFront size={20} color='var(--main-mmz-blue)' />
          </div>
        ),
      })}
    >
      <Popup>
        <h1 className='font-bold text-lg py-1'>{przystanek.name}</h1>
        <div>
          {przystanek.oznaczenia.map((oznaczenie) => (
            <div key={crypto.randomUUID()}>{getCorrectBusTableUrl(oznaczenie)}</div>
          ))}
        </div>
      </Popup>
    </Marker>
  )
}

function getCorrectBusTableUrl(oznaczenie) {
  if (oznaczenie === 'M1') {
    return <OznaczenieLink oznaczenie={oznaczenie} link='https://www.minsk-maz.pl/718,linia-m1' />
  }

  if (oznaczenie === 'M2') {
    return <OznaczenieLink oznaczenie={oznaczenie} link='https://www.minsk-maz.pl/719,linia-m2' />
  }

  if (oznaczenie === 'M3') {
    return <OznaczenieLink oznaczenie={oznaczenie} link='https://www.minsk-maz.pl/720,linia-m3' />
  }

  if (oznaczenie === 'M4') {
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
