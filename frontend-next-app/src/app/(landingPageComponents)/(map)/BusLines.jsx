import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { getBusStopLine } from '@/lib/queries'
import { useQuery } from '@tanstack/react-query'
import { Bus } from 'lucide-react'
import { Marker, Polyline, Popup } from 'react-leaflet'
import L from 'leaflet'
import Image from 'next/image'
import ReactDOMServer from 'react-dom/server'

// Mapowanie kolorów dla linii
const lineColors = {
  'Linia M1: Plac Dworcowy -> Serbinów': '#fe0200',
  'Linia M1: Serbinów -> Plac Dworcowy': '#fe0200',
  'Linia M2: Plac Dworcowy -> Serbinów': '#79e000',
  'Linia M2: Serbinów -> Plac Dworcowy': '#79e000',
  'Linia M3: Osiedlowa -> Rondo Żołnierzy Wyklętych': '#00d9ff',
  'Linia M3: Rondo Żołnierzy Wyklętych -> Osiedlowa': '#00d9ff',
  'Linia M4: Plac Dworcowy -> Spacerowa': '#ff6601',
  'Linia M4: Spacerowa -> Plac Dworcowy': '#ff6601',
}

export function BusLines({ busLines }) {
  return (
    <div>
      {busLines?.map((line) => {
        if (line.isActive) {
          return <BusLine key={crypto.randomUUID()} busLine={line} />
        }
        return null
      })}
    </div>
  )
}

function BusLine({ busLine }) {
  const { data } = useQuery({
    queryKey: [busLine],
    queryFn: async () => {
      const line = await getBusStopLine(busLine.name)
      return line
    },
  })

  if (data) {
    console.log(data)

    var myIcon = L.divIcon({
      html: ReactDOMServer.renderToStaticMarkup(
        <div className='absolute ml-2 mt-2'>
          <div className='-translate-x-1/2 -translate-y-full'>
            <Image src={data.markerImageName} width={40} height={40} alt='marker' />
          </div>
        </div>
      ),
      className: 'custom-marker',
      iconSize: [10, 10],
    })

    // Pobieramy odpowiedni kolor z mapowania
    const lineColor = lineColors[busLine.label] || '#000000'; // Domyślny kolor: czarny

    return (
      <>
        <Polyline positions={data.polyline} color={lineColor} />
        {data.stops.map((stop) => {
          return (
            <Marker key={stop.name} position={[stop.lat, stop.lon]} icon={myIcon}>
              <Popup>{stop.name}</Popup>
            </Marker>
          )
        })}
      </>
    )
  }
}

export function BusSelection({ busLines, setBusLines }) {
  function handleCheckboxChange(e, line) {
    setBusLines((prevBusLines) => {
      const updatedBusLines = prevBusLines.map((busLine) => {
        if (busLine.label === line.label) {
          return { ...busLine, isActive: e }
        }
        return busLine
      })

      const otherLine = updatedBusLines.find(
        (otherLine) => otherLine.label.startsWith(line.label.split(':')[0].trim()) && otherLine.label !== line.label
      )

      if (otherLine) {
        return updatedBusLines.map((busLine) => {
          if (busLine.label === otherLine.label) {
            return { ...busLine, disabled: e }
          }
          return busLine
        })
      }

      return updatedBusLines
    })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='font-bold bg-primary'>
          <Bus className='mr-2 h-4 w-4' /> Linie autobusowe
        </Button>
      </PopoverTrigger>
      <PopoverContent className='flex flex-col gap-3 w-fit p-4'>
        {busLines.map((line) => {
          return (
            <div key={line.label} className='flex items-center space-x-2'>
              <Checkbox
                checked={line.isActive}
                id={line.label}
                onCheckedChange={(e) => handleCheckboxChange(e, line)}
                disabled={line.disabled}
              >
                {line.label}
              </Checkbox>
              <Label htmlFor={line.label} className='cursor-pointer'>
                {line.label}
              </Label>
            </div>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}
