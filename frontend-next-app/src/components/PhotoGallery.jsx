"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEnv } from "@/lib/EnvProvider";
import { useTheme } from "next-themes";
import Image from "next/image";
// works with array of images from strapi
export default function PhotoGallery({ photos, containerDivStyles }) {
  const { theme } = useTheme();
  const { cmsUrl } = useEnv();

  return (
    <div className={containerDivStyles}>
      <Carousel
        className="w-full p-6"
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {cmsUrl &&
            photos?.map((zdjecie) => {
              if (!zdjecie.formats.large) {
                return null;
              }
              return (
                <CarouselItem key={zdjecie.id} className="basis-1/2 md:basis-1/3">
                  <div
                    className={`${
                      theme === "dark" ? "schoolPhotoDark" : "schoolPhotoLight"
                    } p-2 md:p-4`}
                  >
                    <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                      <Image
                        src={`${cmsUrl}${zdjecie.formats.large.url}`}
                        alt={"Fdjks"}
                        fill
                        className="rounded-lg object-cover"
                        priority={true}
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
        </CarouselContent>
        <div className="flex items-center justify-center gap-4 mt-4 ">
          <CarouselPrevious className="static translate-x-0 translate-y-0" />
          <CarouselNext className="static translate-x-0 translate-y-0" />
        </div>
      </Carousel>
    </div>
  );
}
// glowna_galeria_zdjec_szkoly[0].formats.large.url
