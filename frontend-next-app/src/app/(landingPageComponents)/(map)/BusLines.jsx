import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Bus } from 'lucide-react'

// w tym wyswietlic faktyczne linie na mapie, jesli sa aktywne

import { Polyline } from 'react-leaflet'

/**
 * Renders active bus lines on a react-leaflet map.
 * Assumes it is rendered within a <MapContainer>.
 *
 * @param {object} props
 * @param {Array<object>} props.busLines - Array of bus line objects.
 * @param {Function} props.setBusLines - State setter function from the parent component.
 */
export function BusLines({ busLines }) {
  // Filter to get only the active bus lines that have coordinate data
  const activeLines = busLines.filter((line) => line.isActive && line.coordinates)

  return (
    <>
      {/* {activeLines.map((line) => ( */}
      <Polyline
        key={line.id}
        positions={line.coordinates}
        // Use the line's color if provided, otherwise default to blue
        pathOptions={{ color: line.color || 'blue' }}
      >
        {/* Optional: Add a Tooltip or Popup */}
        {/*
          <Tooltip>{line.name}</Tooltip>
          <Popup>
            <b>{line.name}</b><br />
            Details about the line...
          </Popup>
          */}
      </Polyline>
      {/* ))} */}
    </>
  )
}
// tu zmieniam tylko ta tablice w state w parent component

/**
 * Renders a button triggering a popover to select/deselect bus lines.
 * Updates the parent state via setBusLines.
 *
 * @param {object} props
 * @param {Array<object>} props.busLines - Array of bus line objects.
 * @param {Function} props.setBusLines - State setter function from the parent component.
 */
export function BusSelection({ busLines, setBusLines }) {
  // Sprawdza, czy linia jest typu Kurs 1
  const isKurs1 = (lineName) => lineName.includes('(Kurs 1)')

  // Sprawdza, czy linia jest typu Kurs 2
  const isKurs2 = (lineName) => lineName.includes('(Kurs 2)')

  // Określa bazową nazwę linii (np. "M1")
  const getBaseLineName = (lineName) => lineName.split(' (')[0]

  // Obsługa zmiany stanu checkboxa
  function handleCheckboxChange(checkedState, line) {
    const newIsActive = Boolean(checkedState)
    console.log(`Toggling ${line.name} to ${newIsActive}`)

    setBusLines((prevBusLines) => {
      return prevBusLines.map((busLine) => {
        if (busLine.id === line.id) {
          return { ...busLine, isActive: newIsActive } // Zaktualizuj stan aktualnej linii
        }

        const baseLineName = getBaseLineName(line.name)
        const isSameBaseLine = getBaseLineName(busLine.name) === baseLineName

        // Jeśli zaznaczono Kurs 1, wyłącz Kurs 2 dla tej samej linii
        if (isKurs1(line.name) && isKurs2(busLine.name) && isSameBaseLine && newIsActive) {
          return { ...busLine, isActive: false }
        }

        // Jeśli zaznaczono Kurs 2, wyłącz Kurs 1 dla tej samej linii
        if (isKurs2(line.name) && isKurs1(busLine.name) && isSameBaseLine && newIsActive) {
          return { ...busLine, isActive: false }
        }

        return busLine
      })
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
          const checkboxId = `busline-checkbox-${line.id}`
          const isKurs1Line = isKurs1(line.name)
          const isKurs2Line = isKurs2(line.name)
          const baseLineName = getBaseLineName(line.name)

          let checkboxDisabled = false

          if (isKurs1Line) {
            // Jeśli to linia Kurs 1, sprawdź, czy odpowiadający Kurs 2 jest zaznaczony
            const correspondingKurs2Line = busLines.find(
              (otherLine) => isKurs2(otherLine.name) && getBaseLineName(otherLine.name) === baseLineName
            )
            checkboxDisabled = correspondingKurs2Line ? correspondingKurs2Line.isActive : false
          } else if (isKurs2Line) {
            // Jeśli to linia Kurs 2, sprawdź, czy odpowiadający Kurs 1 jest zaznaczony
            const correspondingKurs1Line = busLines.find(
              (otherLine) => isKurs1(otherLine.name) && getBaseLineName(otherLine.name) === baseLineName
            )
            checkboxDisabled = correspondingKurs1Line ? correspondingKurs1Line.isActive : false
          }

          return (
            <div key={line.id} className='flex items-center space-x-2'>
              <Checkbox
                id={checkboxId}
                checked={line.isActive}
                onCheckedChange={(checkedState) => {
                  handleCheckboxChange(checkedState, line)
                }}
                disabled={checkboxDisabled}
              />
              <Label
                htmlFor={checkboxId}
                className='cursor-pointer text-sm font-medium leading-none'
                style={checkboxDisabled ? { color: 'gray' } : {}}
              >
                {line.name}
              </Label>
            </div>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}
