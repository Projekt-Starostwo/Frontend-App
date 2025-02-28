import Image from 'next/image'

export default function Hero() {
  return (
    <div className='h-[50vh] w-full flex flex-row justify-center items-center border-b'>
      <div className='h-full w-2/5 flex flex-col justify-center items-center'>
        <div className='text-7xl flex flex-col gap-4 '>
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
          className='w-1/3 heading-pic'
        />
      </div>
    </div>
  )
}
