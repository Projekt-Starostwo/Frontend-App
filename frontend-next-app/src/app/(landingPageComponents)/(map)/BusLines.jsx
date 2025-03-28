import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { getBusStopLine } from '@/lib/queries'
import { useQuery } from '@tanstack/react-query'
import { Bus, ExternalLink, Spline } from 'lucide-react'
import { Marker, Polyline, Popup } from 'react-leaflet'
import L from 'leaflet'
import Image from 'next/image'
import ReactDOMServer from 'react-dom/server'
import 'leaflet-arrowheads'
import LinkButton from '@/components/LinkButton'

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

    return (
      <>
        <Polyline positions={data.polyline} color={data.color} />
        {data.stops.map((stop) => {
          return (
            <Marker key={stop.name} position={[stop.lat, stop.lon]} icon={myIcon}>
              <Popup className='font-bold '>
                <div className='flex flex-col justify-center items-center'>
                  <h2>{stop.name}</h2>
                  <LinkButton
                    linkHref={data.rozkladLink}
                    linkTarget={'_blank'}
                    linkIcon={<ExternalLink />}
                    buttonStyle={'p-2 text-black '}
                  >
                    Otwórz Rozkład
                  </LinkButton>
                </div>
              </Popup>
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
          <Bus className='mr-2 h-4 w-4' />
          <p>Linie autobusowe</p>
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
