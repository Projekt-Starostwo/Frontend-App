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
// w tym wyswietlic faktyczne linie na mapie, jesli sa aktywne

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
            {/* Shift left by 50%, Shift up by 100% */}
            <Image src={data.markerImageName} width={40} height={40} alt='marker' />
          </div>
        </div>
      ),
      className: 'custom-marker',
      iconSize: [10, 10],
    })
    return (
      <>
        <Polyline positions={data.polyline} color='red' />
        {data.stops.map((stop) => {
          return (
            // <div>jfskdl</div>
            // data.rozkladLink
            // stop.name
            <Marker key={stop.name} position={[stop.lat, stop.lon]} icon={myIcon} />
          )
        })}
      </>
    )
  }
}
// tu zmieniam tylko ta tablice w state w parent component
export function BusSelection({ busLines, setBusLines }) {
  function handleCheckboxChange(e, line) {
    setBusLines((prevBusLines) => {
      const updatedBusLines = prevBusLines.map((busLine) => {
        if (busLine.label === line.label) {
          // Zaktualizuj stan aktualnej linii
          return { ...busLine, isActive: e }
        }
        return busLine
      })

      // Po aktualizacji stanu, znajdź inną linię o tej samej nazwie (np. M1)
      const otherLine = updatedBusLines.find(
        (otherLine) => otherLine.label.startsWith(line.label.split(':')[0].trim()) && otherLine.label !== line.label
      )

      // Jeśli istnieje inna linia, ustaw jej atrybut disabled
      if (otherLine) {
        return updatedBusLines.map((busLine) => {
          if (busLine.label === otherLine.label) {
            return { ...busLine, disabled: e } // Ustaw disabled na wartość przeciwną do zaznaczenia
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
                onCheckedChange={(e) => {
                  handleCheckboxChange(e, line)
                }}
                disabled={line.disabled} // Użyj atrybutu disabled z obiektu linii
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
