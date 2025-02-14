import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { appedDomain } from '@/lib/utils'
import Image from 'next/image'
// works with array of images from strapi
export default async function PhotoGallery({ photos, containerDivStyles }) {
  return (
    <div className={containerDivStyles}>
      <Carousel
        className='w-1/2'
        opts={{
          slidesToShow: 3,
          loop: true,
        }}
      >
        <CarouselContent>
          {photos?.map((zdjecie) => {
            return (
              <CarouselItem key={zdjecie.id}>
                <div className='h-full w-full flex flex-row justify-center items-center gap-2'>
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
  )
}
