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
 * Each object should have at least: id, name, isActive, coordinates.
 * Optional: color.
 * Example: { id: '1', name: 'Line 101', isActive: true, coordinates: [[52.2, 21.0], [52.21, 21.01]], color: 'blue' }
 */
export function BusLines({ busLines }) {
  // Filter to get only the active bus lines that have coordinate data
  const activeLines = busLines.filter((line) => line.isActive && line.coordinates)

  return (
    <>
      {activeLines.map((line) => (
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
      ))}
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
  // Toggles the isActive status for a specific bus line
  function handleCheckboxChange(checkedState, line) {
    // checkedState is boolean | 'indeterminate'
    // We only care about the boolean state
    const newIsActive = Boolean(checkedState)
    console.log(`Toggling ${line.name} to ${newIsActive}`)

    setBusLines((prevBusLines) =>
      prevBusLines.map((busLine) => (busLine.id === line.id ? { ...busLine, isActive: newIsActive } : busLine))
    )
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
          // Generate a unique ID for the checkbox input if line.id might not be suitable
          const checkboxId = `busline-checkbox-${line.id}`
          return (
            <div key={line.id} className='flex items-center space-x-2'>
              <Checkbox
                id={checkboxId} // Use generated ID for the input
                checked={line.isActive}
                onCheckedChange={(checkedState) => {
                  handleCheckboxChange(checkedState, line)
                }}
              />
              {/* Associate Label with Checkbox using htmlFor */}
              <Label htmlFor={checkboxId} className='cursor-pointer text-sm font-medium leading-none'>
                {line.name}
              </Label>
            </div>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}
