import { Suspense } from 'react'
import SchoolPageInfo from './SchoolInfoPage'
import { Skeleton } from '@/components/ui/skeleton'

export default async function Page({ params }) {
  const param = await params

  return (
    <>
      <Suspense fallback={<SchoolPageInfoLoading />}>
        <SchoolPageInfo params={param} />
      </Suspense>
    </>
  )
}
function SchoolPageInfoLoading() {
  return (
    <div className='h-auto w-full  flex flex-col justify-start items-center  p-10'>
      {/* header */}
      <div className='h-full w-2/3'>
        <Skeleton className='h-10 w-full rounded-xl' />
      </div>
      {/* opis */}
      <div className='h-1/2 w-2/3 flex items-start justify-start flex-col py-10'>
        <Skeleton className='h-10 w-1/3  rounded-xl' />
        <div className='py-4 w-full flex flex-col gap-4'>
          <Skeleton className='h-10 w-full  rounded-xl' />
          <Skeleton className='h-10 w-full  rounded-xl' />
        </div>
      </div>
      {/* liceum/technikum/szkola zawodowa */}
      <div className='py-10 w-2/3 flex flex-col justify-center items-start gap-28'>
        <div className='h-10 w-full '>
          <Skeleton className='h-full w-1/3  rounded-xl' />
          <Skeleton className='h-full w-full  rounded-xl mt-4 ' />
        </div>

        <div className=' w-full  flex flex-col justify-center items-center'>
          <Skeleton className='h-64 w-1/2  rounded-xl' />
        </div>
        <div className='py-4 w-full flex flex-col gap-4'>
          <Skeleton className='h-10 w-full  rounded-xl' />
          <Skeleton className='h-10 w-full  rounded-xl' />
        </div>
      </div>
      <div className='py-10 w-2/3 flex flex-col justify-center items-start gap-28'>
        <div className='h-10 w-full '>
          <Skeleton className='h-full w-1/3  rounded-xl' />
          <Skeleton className='h-full w-full  rounded-xl mt-4 ' />
        </div>

        <div className=' w-full  flex flex-col justify-center items-center'>
          <Skeleton className='h-64 w-1/2  rounded-xl' />
        </div>
        <div className='py-4 w-full flex flex-col gap-4'>
          <Skeleton className='h-10 w-full  rounded-xl' />
          <Skeleton className='h-10 w-full  rounded-xl' />
        </div>
      </div>
      <div className='py-10 w-2/3 flex flex-col justify-center items-start gap-28'>
        <div className='h-10 w-full '>
          <Skeleton className='h-full w-1/3  rounded-xl' />
          <Skeleton className='h-full w-full  rounded-xl mt-4 ' />
        </div>

        <div className=' w-full  flex flex-col justify-center items-center'>
          <Skeleton className='h-64 w-1/2  rounded-xl' />
        </div>
        <div className='py-4 w-full flex flex-col gap-4'>
          <Skeleton className='h-10 w-full  rounded-xl' />
          <Skeleton className='h-10 w-full  rounded-xl' />
        </div>
      </div>
    </div>
  )
}
