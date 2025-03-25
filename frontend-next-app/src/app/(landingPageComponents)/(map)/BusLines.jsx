import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Bus } from 'lucide-react'

// w tym wyswietlic faktyczne linie na mapie, jesli sa aktywne

export function BusLines(busLines) {
  return (
    <div>
      bus lines
      {/* busLines.map(line => {
       Line z leaflet 
        return <Line /> 
        }) */}
    </div>
  )
}

// tu zmieniam tylko ta tablice w state w parent component
export function BusSelection({ busLines, setBusLines }) {
  function handleCheckboxChange(e, line) {
    console.log(e, line.name)
    setBusLines((prevBusLines) => {
      const newBusLines = prevBusLines.map((busLine) => {
        if (busLine.id === line.id) {
          return {
            ...busLine,
            isActive: e,
          }
        }
        return busLine
      })
      return newBusLines
    })
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='font-bold'>
          <Bus /> Linie autobusowe
        </Button>
      </PopoverTrigger>
      <PopoverContent className='flex flex-col gap-2 w-fit'>
        {busLines.map((line) => {
          return (
            <div key={line.id} className='flex items-center space-x-2'>
              <Checkbox
                checked={line.isActive}
                id={line.id}
                onCheckedChange={(e) => {
                  handleCheckboxChange(e, line)
                }}
              >
                {line.name}
              </Checkbox>
              <Label htmlFor={line.id} className='cursor-pointer'>
                {line.name}
              </Label>
            </div>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}
