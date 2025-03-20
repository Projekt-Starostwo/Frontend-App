"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Image from "next/image";

export default function SchoolGallery() {
  const router = useRouter(); 
  const schoolSlug = router.query?.schoolSlug; 
  const [school, setSchool] = useState(null);

  useEffect(() => {
    if (!schoolSlug) return;

    const fetchSchoolData = async () => {
      try {
        console.log("Pobieranie danych dla:", schoolSlug);

        const response = await fetch(
          `http://localhost:1337/api/lista-szkols?filters[skrot_szkoly][$eq]=${schoolSlug}&populate=*`
        );

        if (!response.ok) {
          throw new Error("Błąd podczas pobierania danych z API");
        }

        const data = await response.json();
        console.log("Dane z API:", data);

        if (data.data && data.data.length > 0) {
          setSchool(data.data[0].attributes);
        } else {
          setSchool(null); 
        }
      } catch (error) {
        console.error("Błąd API:", error);
        setSchool(null);
      }
    };

    fetchSchoolData();
  }, [schoolSlug]);

  if (!school) return <p>Ładowanie...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{school.nazwa_szkoly}</h1>
      {school.glowna_galeria_zdjec_szkoly?.data?.length > 0 ? (
        <Carousel>
          <CarouselContent>
            {school.glowna_galeria_zdjec_szkoly.data.map((img, index) => (
              <CarouselItem key={index} className="relative w-full h-64">
                <Image
                  src={`http://localhost:1337${img.attributes.url}`}
                  alt={`Zdjęcie ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      ) : (
        <p>Brak zdjęć dla tej szkoły.</p>
      )}
    </div>
  );
}
