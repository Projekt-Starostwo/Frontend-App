'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getListOfSchool } from '@/lib/queries'
import ListOfSchools from './(sidebarList)/ListOfSchools'
import SpinnerLoading from '@/components/SpinnerLoading'
import LeafletMap from './(map)/LeafletMap'
import ErrorPage from '@/components/ErrorPage'

export default function SchoolBrowser() {
  // objekt mapa, na nim mozna wykonywac rozne operacje
  const [map, setMap] = useState(null)
  const mapObj = { map: map, setMap: setMap }

  const {
    data: listOfSchools,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['listOfschools'],
    queryFn: async () => getListOfSchool(),
  })

  return (
    <div className='flex flex-row h-[80vh]'>
      {isLoading && (
        <div className='flex justify-center items-center h-[80vh] w-full'>
          <SpinnerLoading />
        </div>
      )}
      {isError && (
        <ErrorPage
          errorMessage={'Błąd połączenia z serwerem'}
          statusCode={404}
          children={<p>Przepraszamy za niedogodności</p>}
        />
      )}
      {!isLoading && !isError && (
        <>
          <ListOfSchools map={mapObj} listOfSchools={listOfSchools} />
          <div className='h-full w-2/3 p-5 flex flex-col justify-center items-center gap-5'>
            <LeafletMap map={mapObj} listOfSchools={listOfSchools} showSearch showPopup />
          </div>
        </>
      )}
    </div>
  )
}
