"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEnv } from "@/lib/EnvProvider";
import { getCmsUrl } from "@/lib/queries";
import { appedDomain } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import Image from "next/image";
// works with array of images from strapi
export default function PhotoGallery({ photos, containerDivStyles }) {
  const { theme } = useTheme();
  const { cmsUrl } = useEnv();

  return (
    <div className={containerDivStyles}>
      <Carousel
        className="w-3/4"
        opts={{
          slidesToShow: 3,
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
                <CarouselItem key={zdjecie.id}>
                  <div
                    className={`${
                      theme === "dark" ? "schoolPhotoDark" : "schoolPhotoLight"
                    } p-4 px-5 h-full w-full flex flex-row justify-center items-center `}
                  >
                    <Image
                      src={`${cmsUrl}${zdjecie.formats.large.url}`}
                      alt={"Fdjks"}
                      // quality={100}
                      width={540}
                      height={540}
                      className="rounded-lg object-cover"
                      priority={true}

                      // fill
                    />
                  </div>
                </CarouselItem>
              );
            })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
// glowna_galeria_zdjec_szkoly[0].formats.large.url
