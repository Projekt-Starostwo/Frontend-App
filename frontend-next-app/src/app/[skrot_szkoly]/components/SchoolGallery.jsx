import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { appedDomain } from '@/lib/utils'
import Image from 'next/image'

export default async function SchoolGallery({ school }) {
  return (
    <div className='py-28 w-full flex flex-col gap-28'>
      <div className='h-52 w-full flex flex-col justify-center items-center'>
        <Carousel
          className='w-1/2'
          opts={{
            slidesToShow: 3,
            loop: true,
          }}
        >
          <CarouselContent>
            {school.glowna_galeria_zdjec_szkoly?.map((zdjecie) => {
              return (
                <CarouselItem key={zdjecie.id}>
                  <div className='w-full flex flex-col justify-center items-center gap-2'>
                    <Image
                      src={appedDomain(zdjecie.url)}
                      alt={'Fdjks'}
                      width={100}
                      height={100}
                      className='rounded-lg w-96'
                    />
                  </div>
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}
