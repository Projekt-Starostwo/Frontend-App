import dynamic from 'next/dynamic'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Districts from './Districts'
import CustomMarker from './CustomMarker'
import { Button } from '@/components/ui/button'
export const MAP_CENTER = [52.179, 21.57211]

const LeafletMap = ({ map, listOfSchools }) => {
  return (
    <div className='bg-gray-700 h-full w-2/3 p-10'>
      <Button className='bg-black text-slate-300' onClick={() => map.map.setView(MAP_CENTER, 10)}>
        RESET MAP
      </Button>
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
        ref={map.setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright*">OpenStreetMap</a> contributors*'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {listOfSchools.map((school) => {
          return <CustomMarker key={school.id + 'marker'} school={school} />
        })}

        <Districts />
      </MapContainer>
    </div>
  )
}

export default dynamic(() => Promise.resolve(LeafletMap), { ssr: false })
