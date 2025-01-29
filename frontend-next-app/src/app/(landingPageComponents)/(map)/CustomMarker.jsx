'use client'

import { Marker, Tooltip } from 'react-leaflet'
import ReactDOMServer from 'react-dom/server'
import { useRouter } from 'next/navigation'

export default function CustomMarker({ school }) {
  const router = useRouter()
  // renderToSTaticMarkup zamieni react component na statyczny html ktory poprawnie sie pokaze jako marker
  var myIcon = L.divIcon({
    html: ReactDOMServer.renderToStaticMarkup(<MarkerHtml logo={school.logo} />),
    className: 'custom-marker',
    iconSize: [50, 50],
  })
  const handleClick = () => {
    router.push(`/${school.id}`)
  }

  // dowolny html wyswietli sie na mapie jako marker, proponuje herb szkoly
  return (
    <Marker position={[school.cords.lat, school.cords.long]} icon={myIcon} eventHandlers={{ click: handleClick }}>
      <Tooltip>{school.nazwa}</Tooltip>
    </Marker>
  )
}
export function MarkerHtml({ logo }) {
  return (
    <div className='h-full w-full flex items-center justify-center'>
      <img src={logo} alt='School logo' className='h-10 w-10 object-contain rounded-full' />
    </div>
  )
}
