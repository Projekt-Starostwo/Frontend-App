'use client'
import dynamic from 'next/dynamic'
const LeafletMap = dynamic(() => import('../(landingPageComponents)/(map)/LeafletMap'), {
  ssr: false,
})
import { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getListOfSchool } from '@/lib/queries'
import ListOfSchools from './(sidebarList)/ListOfSchools'
import SpinnerLoading from '@/components/SpinnerLoading'
import ErrorPage from '@/components/ErrorPage'
import { Checkbox } from '@/components/ui/checkbox'
import { tryCatch } from '@/lib/utils'

export default function SchoolBrowser() {
  const queryClient = useQueryClient()
  // objekt mapa, na nim mozna wykonywac rozne operacje
  const [map, setMap] = useState(null)
  const mapObj = { map: map, setMap: setMap }
  const [showMarkers, setShowMarkers] = useState(true)
  const [listOfSchools, setListOfSchools] = useState(null)
  const { data, isLoading, isError } = useQuery({
    queryKey: ['listOfSchools'],
    queryFn: async () => {
      const { data, error } = await tryCatch(getListOfSchool())

      if (error) throw new Error()

      const schoolsWithIsActiveProp = data.data?.map((school) => {
        return {
          ...school,
          isActive: true,
        }
      })

      setListOfSchools(schoolsWithIsActiveProp)
      return { ok: true }
    },
  })
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['listOfSchools'] })
  }, [])
  // console.log(listOfSchools)

  return (
    <div className='flex flex-row h-[80vh]'>
      {isLoading && (
        <div className='flex justify-center items-center h-[80vh] w-full'>
          <SpinnerLoading />
        </div>
      )}
      {isError && (
        <ErrorPage
          errorMessage={'Błąd połączenia z serwerem, spróbuj ponownie'}
          statusCode={404}
          children={<p>Przepraszamy za niedogodności</p>}
        />
      )}
      {!isLoading && !isError && (
        <div className='w-full flex flex-row flex-wrap'>
          <ListOfSchools map={mapObj} listOfSchools={listOfSchools} setShowMarkers={setShowMarkers} />
          <div className='h-full w-2/3 p-10 flex flex-col justify-center items-center gap-2'>
            <Filters listOfSchools={listOfSchools} setListOfSchools={setListOfSchools} />
            <LeafletMap
              map={mapObj}
              listOfSchools={listOfSchools}
              showPopup
              showMarkers={showMarkers}
              setShowMarkers={setShowMarkers}
            />
          </div>
        </div>
      )}
    </div>
  )
}
function Filters({ listOfSchools, setListOfSchools }) {
  const [currentFilters, setCurrentFilters] = useState([
    {
      id: 'liceum',
      label: 'Liceum',
      checked: true,
    },
    {
      id: 'technikum',
      label: 'Technikum',
      checked: true,
    },
    {
      id: 'szkola_zawodowa',
      label: 'Szkoła zawodowa',
      checked: true,
    },
  ])
  // update the school list, to match actual filters
  useEffect(() => {
    if (!listOfSchools) return
    setListOfSchools((prevListOfSchools) => {
      const res = prevListOfSchools.map((school) => {
        return {
          ...school,
          isActive: CalcSchoolActivity(school, currentFilters),
        }
      })
      // console.log(res)
      return res
    })
  }, [currentFilters])

  function handleFiltersChange(itemId, itemLabel, newValue, itemIndex) {
    // console.log('changed: ', itemId, 'for', newValue)

    setCurrentFilters((prevFilters) => {
      const newObject = {
        id: itemId,
        label: itemLabel,
        checked: newValue,
      }

      // keep the order of filters
      if (itemIndex == 0) {
        return [newObject, prevFilters[1], prevFilters[2]]
      }
      if (itemIndex == 1) {
        return [prevFilters[0], newObject, prevFilters[2]]
      }
      if (itemIndex == 2) {
        return [prevFilters[0], prevFilters[1], newObject]
      }
    })
  }
  function CalcSchoolActivity(school, filters) {
    // check if option is checked and if a school contains this option
    const result = filters.map((filter) => {
      if (filter.checked && school.rodzaje_szkoly[filter.id] !== null) {
        // console.log('NALEZY POKAZAC', filter.label)
        //  show school
        return true
      }
      // school doesnt match filters
      return false
    })

    // returns true if any element in arr matched condition
    return result.some((element) => element === true)
  }
  return (
    <div className='w-full flex flex-row justify-start items-start gap-6'>
      {currentFilters.map((item, index) => {
        return (
          <div key={item.id} className='flex flex-row justify-center items-center gap-4'>
            <Checkbox
              id={`${item.id}`}
              onCheckedChange={(newValue) => handleFiltersChange(item.id, item.label, newValue, index)}
              defaultChecked
            />
            <label
              htmlFor={`${item.id}`}
              className='text-xl font-medium  peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer'
            >
              {item.label}
            </label>
          </div>
        )
      })}
    </div>
  )
}
