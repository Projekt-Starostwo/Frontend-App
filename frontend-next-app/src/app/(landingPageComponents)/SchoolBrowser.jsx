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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function SchoolBrowser() {
  const queryClient = useQueryClient()
  // objekt mapa, na nim mozna wykonywac rozne operacje
  const [map, setMap] = useState(null)
  const mapObj = { map: map, setMap: setMap }
  const [showMarkers, setShowMarkers] = useState(true)
  const [selectedTab, setSelectedTab] = useState('list')
  const [newSchoolFocused, setNewSchoolFocused] = useState(null)

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
  // console.log(newSchoolFocused);
  return (
    <div className=''>
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
        <>
          {/* Mobile view - Tabs for switching between list and map */}
          <div className='lg:hidden'>
            <Tabs
              defaultValue='list'
              value={selectedTab}
              onValueChange={(e) => {
                setSelectedTab(e)
              }}
            >
              <TabsList className='grid grid-cols-2 mt-4'>
                <TabsTrigger value='list'>Szkoły</TabsTrigger>
                <TabsTrigger value='map'>Mapa</TabsTrigger>
              </TabsList>
              <Filters
                listOfSchools={listOfSchools}
                setListOfSchools={setListOfSchools}
                currentFilters={currentFilters}
                setCurrentFilters={setCurrentFilters}
              />
              <TabsContent value='list' className='h-[70vh]'>
                <ListOfSchools
                  map={mapObj}
                  listOfSchools={listOfSchools}
                  setShowMarkers={setShowMarkers}
                  setSelectedTab={setSelectedTab}
                  setNewSchoolFocused={setNewSchoolFocused}
                />
              </TabsContent>
              <TabsContent value='map' className='h-[80vh]'>
                <div className='md:col-span-2 lg:col-span-3 rounded-lg overflow-hidden relative'>
                  <div className='h-[80vh] w-full p-10 flex flex-col justify-center items-center gap-2 '>
                    <LeafletMap
                      map={mapObj}
                      listOfSchools={listOfSchools}
                      showPopup
                      showMarkers={showMarkers}
                      setShowMarkers={setShowMarkers}
                      newSchoolFocused={newSchoolFocused}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          {/* Desktop view */}
          <div className='hidden lg:grid md:grid-cols-3 lg:grid-cols-5 gap-6 h-[85vh] xl:p-10'>
            <div className='md:col-span-1 lg:col-span-2 rounded-lg overflow-hidden'>
              <Filters
                listOfSchools={listOfSchools}
                setListOfSchools={setListOfSchools}
                currentFilters={currentFilters}
                setCurrentFilters={setCurrentFilters}
              />
              <ListOfSchools map={mapObj} listOfSchools={listOfSchools} setShowMarkers={setShowMarkers} />
            </div>
            <div className='md:col-span-2 lg:col-span-3  rounded-lg overflow-hidden relative'>
              <div className='h-[85vh] w-full  flex flex-col justify-center items-center gap-2 '>
                <LeafletMap
                  map={mapObj}
                  listOfSchools={listOfSchools}
                  showPopup
                  showMarkers={showMarkers}
                  setShowMarkers={setShowMarkers}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function Filters({ listOfSchools, setListOfSchools, currentFilters, setCurrentFilters }) {
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
    <div className='p-4  space-y-4 w-full max-w-lg min-w-lg  mx-auto max-sm:border-b'>
      <div className='relative flex justify-center items-start gap-6 flex-wrap'>
        {currentFilters.map((item, index) => {
          return (
            <div key={item.id} className='flex flex-row justify-center items-center gap-4'>
              <Checkbox
                id={`${item.id}`}
                checked={item.checked}
                onCheckedChange={(newValue) => handleFiltersChange(item.id, item.label, newValue, index)}
                defaultChecked
              />
              <label
                htmlFor={`${item.id}`}
                className='text-lg font-medium  peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer'
              >
                {item.label}
              </label>
            </div>
          )
        })}
      </div>
    </div>
  )
}
