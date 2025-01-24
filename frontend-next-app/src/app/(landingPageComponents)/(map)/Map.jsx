'use client'
import dynamic from 'next/dynamic'
const LeafletMap = dynamic(() => import('./LeafletMap'), { ssr: false })
export default function Map() {
  return (
    <div className='bg-pink-600 h-full w-2/3 p-10'>
      <LeafletMap />
    </div>
  )
}
