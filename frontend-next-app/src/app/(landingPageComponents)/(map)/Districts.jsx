'use client'
import { getDistrcts } from '@/lib/queries'
import { useQuery } from '@tanstack/react-query'
import { useTheme } from 'next-themes'
import { GeoJSON } from 'react-leaflet'

export default function Districts() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['districts'],
    queryFn: async () => getDistrcts(),
  })
  // jako markeru mozna uzyc logo szkoly, po najechaniu jakas nazwa czy cos, po kliknieciu przenosi na [id] z wszystkimi informacjami, tak samo przenosza elementy w navbarze
  return (
    <div>
      <>
        {data?.features?.map((district) => {
          return (
            <GeoJSON
              key={district.properties.id}
              data={district}
              style={{
                fillColor: district.properties.nazwa !== 'powiat miński' ? null : '#FFFFFF',
              }}
            />
          )
        })}
      </>
    </div>
  )
}
