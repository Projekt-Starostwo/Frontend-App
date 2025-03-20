import Image from 'next/image'

export default function Hero() {
  return (
    <>
      <div className='hidden lg:h-[50vh] lg:w-full lg:flex lg:flex-row lg:justify-center lg:flex-wrap lg:items-center lg:border-b'>
        <div className='h-full w-2/5 flex flex-col justify-center items-center'>
          <div className='text-6xl flex flex-col gap-4 '>
            <h1 className=' font-bold'>Szkoły średnie w</h1>
            <h1 className=' font-bold mmz-heading '>Mińsku Mazowieckim</h1>
          </div>
        </div>
        <div className='h-full w-2/5 flex flex-col justify-center items-center'>
          <Image
            priority={true}
            alt='Herb miasta Mińsk Mazowiecki'
            src={'/Herb-miasta.png'}
            width={300}
            height={300}
            className='w-64 heading-pic'
          />
        </div>
      </div>
      {/* mobile */}
      <div className='lg:hidden h-[50vh] sm:h-[80vh] w-full flex flex-col justify-center items-center border-b'>
        <div className='h-1/2 w-4/5 flex flex-col justify-center items-center'>
          <div className='sm:text-6xl text-4xl flex flex-col p-0 gap-4 m-0'>
            <h1 className='text-center font-bold'>Szkoły średnie w</h1>
            <h1 className='text-center font-bold mmz-heading '>Mińsku Mazowieckim</h1>
          </div>
        </div>
        <div className='h-full w-3/5 flex flex-col justify-center items-center'>
          <Image
            priority={true}
            alt='Herb miasta Mińsk Mazowiecki'
            src={'/Herb-miasta.png'}
            width={300}
            height={300}
            className='w-40 sm:w-64 heading-pic'
          />
        </div>
      </div>
    </>
  )
}
