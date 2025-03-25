'use client'

import React, { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import CustomMarker from './CustomMarker'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import L from 'leaflet'
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import { BusFront, ExternalLink, LocateFixed, ZoomIn } from 'lucide-react'
import ReactDOMServer from 'react-dom/server'
import Link from 'next/link'
import MarkerClusterGroup from 'react-leaflet-markercluster'
// Assuming MarkerClusterGroup CSS is imported globally or via _app.js/layout.js
// import 'react-leaflet-markercluster/dist/styles.min.css';

import { BusSelection } from './BusLines' // Keep your BusSelection component

// Import the data - acknowledge this loads everything on the client
import {
  przystankiAutobusowe,
  // przystankiPociagowe, // Not used in LeafletMap currently, add if needed
  LiniaBagsB1,
  LiniaBagsB3,
  LiniaBagsB4,
  LiniaMiejskaM1_1,
  LiniaMiejskaM1_2,
  LiniaMiejskaM2_1,
  LiniaMiejskaM2_2,
  LiniaMiejskaM3_1,
  LiniaMiejskaM3_2,
  LiniaMiejskaM4_1,
  LiniaMiejskaM4_2,
  // boundaryCoordinates, // Not used in LeafletMap currently, add if needed
} from './daneDojazdow' // Adjust path if needed

// --- Constants for Map ---
export const MAP_CENTER = [52.179, 21.57211]
const DEFAULT_ZOOM = 14
const MAX_ZOOM = 17
const MIN_ZOOM = 13 // Adjusted from source

// --- Helper Data from Source Component ---
const pdfLinks = {
  M1: 'https://www.minsk-maz.pl/plik,8749,linia-m1.pdf',
  M2: 'https://www.minsk-maz.pl/plik,8753,linia-m2.pdf',
  M3: 'https://www.minsk-maz.pl/plik,8758,linia-m3.pdf',
  M4: 'https://www.minsk-maz.pl/plik,8762,linia-m4.pdf',
  B1: 'https://bags.com.pl/linie-regularne/', // General Bags Link (fallback)
  B3: 'https://bags.com.pl/linie-regularne/', // General Bags Link (fallback)
  B4: 'https://bags.com.pl/linie-regularne/', // General Bags Link (fallback)
}

// TODO: Implement specific BAGS links per stop as per original comment
const specificBagsLinks = {
  'Dębe Wielkie 01': 'https://bags.com.pl/rozklady/debe-wielkie-i/',
  'Dębe Wielkie 02': 'https://bags.com.pl/rozklady/debe-wielkie-ii/',
  'Dębe Wielkie 03': 'https://bags.com.pl/rozklady/debe-wielkie-iii/',
  // Add more specific links if available
}

const pinImg = {
  M1: '/pictures/m1pin.png', // Make sure these paths are correct relative to your public folder
  M2: '/pictures/m2pin.png',
  M3: '/pictures/m3pin.png',
  M4: '/pictures/m4pin.png',
  B1: '/pictures/b1kwpin.png',
  B3: '/pictures/b3pin.png',
  B4: '/pictures/b4pin.png',
}

const colorLine = {
  M1: '#d01526',
  M2: '#97b62c',
  M3: '#50c1e9',
  M4: '#e68042',
  B1: '#009d57',
  B3: '#757575',
  B4: '#db4436',
}

// --- Initial State for Bus Lines ---
const initialBusLinesState = [
  {
    id: 'M1_1',
    name: 'M1 (Kurs 1)',
    internalId: 'M1',
    color: colorLine.M1,
    stops: LiniaMiejskaM1_1,
    pdfUrl: pdfLinks.M1,
    pinUrl: pinImg.M1,
    isActive: false,
  },
  {
    id: 'M1_2',
    name: 'M1 (Kurs 2)',
    internalId: 'M1',
    color: colorLine.M1,
    stops: LiniaMiejskaM1_2,
    pdfUrl: pdfLinks.M1,
    pinUrl: pinImg.M1,
    isActive: false,
  },
  {
    id: 'M2_1',
    name: 'M2 (Kurs 1)',
    internalId: 'M2',
    color: colorLine.M2,
    stops: LiniaMiejskaM2_1,
    pdfUrl: pdfLinks.M2,
    pinUrl: pinImg.M2,
    isActive: false,
  },
  {
    id: 'M2_2',
    name: 'M2 (Kurs 2)',
    internalId: 'M2',
    color: colorLine.M2,
    stops: LiniaMiejskaM2_2,
    pdfUrl: pdfLinks.M2,
    pinUrl: pinImg.M2,
    isActive: false,
  },
  {
    id: 'M3_1',
    name: 'M3 (Kurs 1)',
    internalId: 'M3',
    color: colorLine.M3,
    stops: LiniaMiejskaM3_1,
    pdfUrl: pdfLinks.M3,
    pinUrl: pinImg.M3,
    isActive: false,
  },
  {
    id: 'M3_2',
    name: 'M3 (Kurs 2)',
    internalId: 'M3',
    color: colorLine.M3,
    stops: LiniaMiejskaM3_2,
    pdfUrl: pdfLinks.M3,
    pinUrl: pinImg.M3,
    isActive: false,
  },
  {
    id: 'M4_1',
    name: 'M4 (Kurs 1)',
    internalId: 'M4',
    color: colorLine.M4,
    stops: LiniaMiejskaM4_1,
    pdfUrl: pdfLinks.M4,
    pinUrl: pinImg.M4,
    isActive: false,
  },
  {
    id: 'M4_2',
    name: 'M4 (Kurs 2)',
    internalId: 'M4',
    color: colorLine.M4,
    stops: LiniaMiejskaM4_2,
    pdfUrl: pdfLinks.M4,
    pinUrl: pinImg.M4,
    isActive: false,
  },
  {
    id: 'B1',
    name: 'B1',
    internalId: 'B1',
    color: colorLine.B1,
    stops: LiniaBagsB1,
    pdfUrl: pdfLinks.B1,
    pinUrl: pinImg.B1,
    isActive: false,
  },
  {
    id: 'B3',
    name: 'B3',
    internalId: 'B3',
    color: colorLine.B3,
    stops: LiniaBagsB3,
    pdfUrl: pdfLinks.B3,
    pinUrl: pinImg.B3,
    isActive: false,
  },
  {
    id: 'B4',
    name: 'B4',
    internalId: 'B4',
    color: colorLine.B4,
    stops: LiniaBagsB4,
    pdfUrl: pdfLinks.B4,
    pinUrl: pinImg.B4,
    isActive: false,
  },
]

// --- Helper Function to Open PDF ---
const handleOpenPdf = (url) => {
  if (typeof window !== 'undefined' && url && url !== '#') {
    window.open(url, '_blank')
  } else {
    console.warn('No valid PDF URL provided or window is undefined.')
    // Optionally show a user notification
  }
}

// --- Main Map Component ---
export default function LeafletMap({
  map,
  listOfSchools,
  showPopup,
  initialMapCenter,
  showMarkers, // Keep this prop
  setShowMarkers, // Keep this prop
  newSchoolFocused,
}) {
  const { theme } = useTheme()
  const [pokazPrzystanki, setPokazPrzystanki] = useState(false)
  const [busLines, setBusLines] = useState(initialBusLinesState)
  const routingControlsRef = useRef({}) // Use ref to store controls to avoid state update issues in effect cleanup

  // Effect for Ctrl+Scroll Zoom (Existing)
  useEffect(() => {
    if (!map.map) return

    const handleWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault()
        const zoom = map.map.getZoom()
        map.map.setZoom(e.deltaY < 0 ? zoom + 1 : zoom - 1)
      }
      // else: default scroll behavior (pan map)
    }

    const mapContainer = map.map.getContainer()
    mapContainer.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      mapContainer.removeEventListener('wheel', handleWheel)
    }
  }, [map.map])

  // Effect to fly to new school (Existing)
  useEffect(() => {
    if (!setShowMarkers) {
      return
    }

    if (!newSchoolFocused || !map.map) {
      // Don't automatically set showMarkers to true here if it wasn't passed
      // setShowMarkers(true)
      return
    }

    map.map.setView([newSchoolFocused[0], newSchoolFocused[1]], 16)
    // Optional: setShowMarkers(false) // Temporarily hide during flight?
    // setTimeout(() => setShowMarkers(true), 500); // Show after flight
  }, [newSchoolFocused, map.map, setShowMarkers]) // Added setShowMarkers dependency

  // --- Effect for Drawing/Removing Bus Routes ---
  useEffect(() => {
    if (!map.map) return

    const currentControls = routingControlsRef.current

    // Function to remove default routing UI
    const removeRoutingContainers = () => {
      document.querySelectorAll('.leaflet-routing-container').forEach((el) => el.remove())
    }

    busLines.forEach((line) => {
      const { id, isActive, stops, color, pinUrl, pdfUrl, name: lineDisplayName, internalId } = line
      const controlExists = !!currentControls[id]

      if (isActive && !controlExists) {
        // --- Create and Add New Route ---
        if (!Array.isArray(stops) || stops.length === 0) {
          console.warn(`Brak przystanków lub niepoprawny format dla linii ${id}.`)
          return
        }

        const waypoints = stops
          .map(({ name, coords }) => {
            // Assuming coords are already [lat, lng] array
            if (!Array.isArray(coords) || coords.length !== 2 || isNaN(coords[0]) || isNaN(coords[1])) {
              console.warn(`Invalid coordinates for stop "${name}" in line ${id}:`, coords)
              return null
            }
            return L.latLng(coords[0], coords[1])
          })
          .filter((wp) => wp !== null) // Filter out nulls from invalid coords

        if (waypoints.length < 2) {
          // Need at least 2 waypoints for a route
          console.warn(`Not enough valid waypoints (${waypoints.length}) for line ${id}. Cannot draw route.`)
          return
        }

        console.log(`Drawing route for ${id} with waypoints:`, waypoints)

        const routingControl = L.Routing.control({
          waypoints,
          lineOptions: {
            styles: [{ color: color || '#3388ff', weight: 5, opacity: 1 }],
            addWaypoints: false, // Don't allow adding waypoints via map click
            // extendToWaypoints: true, // Causes issues with OSRM if start/end aren't routable
          },
          routeWhileDragging: false,
          draggableWaypoints: false,
          show: false, // Hide default itinerary panel
          // serviceUrl: 'http://router.project-osrm.org/route/v1', // Public OSRM Demo Server (Rate Limited!)
          serviceUrl: 'http://51.38.130.72:5000/route/v1', // Your OSRM server
          createMarker: function (i, waypoint, n) {
            // Find the corresponding stop object to get the name
            // Note: 'i' is the index in the waypoints array, n is total waypoints
            // The 'stops' array might have had invalid entries filtered out,
            // so matching index 'i' directly to 'stops[i]' can be wrong.
            // We need a more robust way if stops had invalid entries.
            // Assuming 'waypoints' directly corresponds to valid entries in 'stops' for now.
            let originalStopIndex = -1
            let count = 0
            for (let j = 0; j < stops.length; j++) {
              const stop = stops[j]
              if (stop.coords && !isNaN(stop.coords[0]) && !isNaN(stop.coords[1])) {
                if (count === i) {
                  originalStopIndex = j
                  break
                }
                count++
              }
            }

            const stopData = originalStopIndex !== -1 ? stops[originalStopIndex] : null
            const name = stopData?.name || `Przystanek ${i + 1}` // Fallback name
            let urlToOpen = pdfUrl // Default to the general line PDF

            // --- TODO: Specific BAGS Link Logic ---
            if (internalId.startsWith('B') && stopData?.name && specificBagsLinks[stopData.name]) {
              urlToOpen = specificBagsLinks[stopData.name]
              console.log(`Using specific BAGS link for ${stopData.name}: ${urlToOpen}`)
            }
            // --- End Specific BAGS Link ---

            return L.marker(waypoint.latLng, {
              icon: L.icon({
                iconUrl: pinUrl || '/pictures/default-pin.png', // Provide a fallback pin
                iconSize: [40, 40], // Adjusted size
                iconAnchor: [20, 40], // Adjust anchor point to bottom center
                popupAnchor: [0, -35], // Adjust popup position
              }),
            })
              .bindPopup(
                `
              <div>
                <b>${lineDisplayName}</b><br/>
                ${name}<br/>
                <button id="openPdfButton_${id}_${i}"
                  style="margin-top:5px; padding:5px 10px; border:none; background:#007bff; color:white; border-radius:5px; cursor:pointer; font-size: 14px;" >
                  Otwórz rozkład
                </button>
              </div>
            `
              )
              .on('popupopen', (e) => {
                // Add listener inside popupopen to ensure the button exists in the DOM
                const button = e.popup._contentNode.querySelector(`#openPdfButton_${id}_${i}`)
                if (button) {
                  // Remove potential old listeners before adding new one
                  button.onclick = null
                  button.onclick = () => handleOpenPdf(urlToOpen)
                } else {
                  console.error(`Button not found for popup: #openPdfButton_${id}_${i}`)
                }
              })
          },
        }).addTo(map.map)

        currentControls[id] = routingControl // Store reference

        // Immediately try removing the container (might reappear, hence the observer)
        removeRoutingContainers()
      } else if (!isActive && controlExists) {
        // --- Remove Existing Route ---
        console.log(`Removing route for ${id}`)
        map.map.removeControl(currentControls[id])
        delete currentControls[id] // Remove reference
      }
    })

    // Observer to keep removing the routing UI container if it reappears
    const observer = new MutationObserver(removeRoutingContainers)
    observer.observe(document.body, { childList: true, subtree: true })

    // --- Cleanup Effect ---
    return () => {
      observer.disconnect() // Stop observing
      console.log('Cleaning up routing controls...')
      Object.keys(currentControls).forEach((key) => {
        if (map.map && currentControls[key]) {
          try {
            map.map.removeControl(currentControls[key])
            console.log(`Cleaned up control ${key}`)
          } catch (error) {
            console.warn(`Error removing control ${key} during cleanup:`, error)
          }
        }
      })
      routingControlsRef.current = {} // Clear the ref
    }
  }, [busLines, map.map]) // Re-run when busLines selection or map instance changes

  // Function to parse coordinate string "lat, lng"
  const parseCoords = (coordString, stopName = 'Unknown') => {
    if (!coordString || typeof coordString !== 'string') {
      console.error(`Invalid coordinate string type for ${stopName}:`, coordString)
      return null
    }
    const coords = coordString.split(',').map((coord) => parseFloat(coord.trim()))
    if (coords.length !== 2 || isNaN(coords[0]) || isNaN(coords[1])) {
      console.error(`Błędne współrzędne dla przystanku ${stopName}:`, coordString)
      return null
    }
    return [coords[0], coords[1]]
  }

  return (
    <>
      {/* --- Buttons --- */}
      <div className='w-full z-[9999] flex flex-row justify-center items-center gap-2 sm:gap-4 flex-wrap absolute bottom-4 px-2 '>
        {/* Zoom Info (Hidden on small screens) */}
        <Button className='cursor-default max-sm:hidden border-2 border-transparent' aria-label='Zoom with Ctrl+Scroll'>
          <ZoomIn size={18} />
          <p className='font-bold ml-1 text-xs sm:text-sm'>Zoom: Ctrl + Scroll</p>
        </Button>

        {/* Reset Map Button */}
        <Button
          className='border-2 border-transparent px-2 sm:px-4'
          onClick={() => {
            // Use setShowMarkers if available
            if (setShowMarkers) setShowMarkers(false)
            flyToLocation(MAP_CENTER[0], MAP_CENTER[1], DEFAULT_ZOOM)
            if (setShowMarkers) {
              setTimeout(() => {
                setShowMarkers(true)
              }, 500) // Delay showing markers slightly after flight
            }
          }}
          aria-label='Zresetuj widok mapy'
        >
          <LocateFixed size={18} />
          <p className='font-bold ml-1 text-xs sm:text-sm'>Resetuj</p>
        </Button>

        {/* Toggle Bus Stops Button */}
        {/* <Button
          onClick={() => setPokazPrzystanki((prevState) => !prevState)}
          className='border-2 border-transparent px-2 sm:px-4'
          aria-label={pokazPrzystanki ? 'Ukryj przystanki autobusowe' : 'Pokaż przystanki autobusowe'}
        >
          <BusFront size={18} />
          <p className='font-bold ml-1 text-xs sm:text-sm'>{pokazPrzystanki ? 'Ukryj przystanki' : 'Pokaż przystanki'}</p>
        </Button> */}

        {/* Bus Line Selection */}
        <BusSelection busLines={busLines} setBusLines={setBusLines} />
      </div>

      {/* --- Map Container --- */}
      <MapContainer
        center={initialMapCenter ? initialMapCenter : MAP_CENTER}
        zoom={DEFAULT_ZOOM}
        className='w-full h-full z-10 rounded-xl '
        maxZoom={MAX_ZOOM}
        minZoom={MIN_ZOOM}
        ref={map.setMap} // Use the passed ref setter
        scrollWheelZoom={false} // Controlled by effect with Ctrl key
      >
        {/* map bg color */}
        <div
          className={`w-full h-full absolute top-0 left-0 ${theme === 'dark' ? 'bg-[#333333]' : 'bg-background'} -z-10`}
        ></div>

        {/* Tile Layer (Theme Aware) */}
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
          // noWrap={true} // Added from source, prevents map repeating horizontally
        />

        {/* School Markers (Conditional) */}
        {showMarkers &&
          listOfSchools?.map((school) => <CustomMarker key={school.id} school={school} showPopup={showPopup} />)}

        {/* Bus Stop Markers (Clustered & Conditional) */}
        {pokazPrzystanki && (
          <MarkerClusterGroup
            key={'bus-cluster-visible'} // Key changes when toggled
            chunkedLoading
            animate={true}
            spiderfyOnMaxZoom={true}
            showCoverageOnHover={false}
            // Custom Cluster Icon (Existing)
            iconCreateFunction={(cluster) => {
              const count = cluster.getChildCount()
              return L.divIcon({
                html: `
                        <div class="custom-bus-cluster">
                          <div class="bus-icon"></div> {/* Ensure CSS for this exists */}
                          <span class="bus-count">${count}</span>
                        </div>
                    `,
                className: 'custom-bus-cluster-wrapper', // Ensure CSS for this exists
                iconSize: [45, 45], // Or your desired size
                iconAnchor: [22.5, 22.5], // Centered anchor
              })
            }}
          >
            {/* Iterate over przystankiAutobusowe from imported data */}
            {przystankiAutobusowe?.map((przystanek, index) => {
              const coords = parseCoords(przystanek.koordynaty, przystanek.nazwa)
              if (!coords) return null // Skip if coords are invalid
              // Ensure unique key using index or a better ID if available
              return <Przystanek key={`stop-${przystanek.nazwa}-${index}`} przystanek={przystanek} coords={coords} />
            })}
          </MarkerClusterGroup>
        )}

        {/* Note: Route lines and their specific markers are now added dynamically via the useEffect hook */}
        {/* Remove: <BusLines busLines={busLines} /> */}
      </MapContainer>
    </>
  )
}

// --- Przystanek Component (for general bus stops) ---
// Modified to use data from przystankiAutobusowe and parsed coords
function Przystanek({ przystanek, coords }) {
  // Basic icon using Lucide, customize as needed
  const iconHtml = ReactDOMServer.renderToString(
    <div className='bg-transparent flex justify-center items-center'>
      {/* Use a simple blue icon, different from route pins */}
      <BusFront size={20} color='var(--main-mmz-blue)' />
    </div>
  )

  return (
    <Marker
      position={coords}
      icon={L.divIcon({
        html: iconHtml,
        className: 'leaflet-div-icon-bus', // Add a class for potential styling
        iconSize: [24, 24], // Adjust size
        iconAnchor: [12, 12], // Center anchor
      })}
    >
      <Popup>
        <h1 className='font-bold text-lg py-1'>{przystanek.nazwa || 'Przystanek'}</h1>
        {/* TODO: Add relevant info here? Maybe list lines that *might* stop here? */}
        {/* The getCorrectBusTableUrl logic was specific to M lines and might need rethinking */}
        {/* For now, just display the name */}
        <div>
          {/* Example: <p>Współrzędne: {coords[0].toFixed(5)}, {coords[1].toFixed(5)}</p> */}
          {/* Add links or other info if applicable for general stops */}
        </div>
      </Popup>
    </Marker>
  )
}
