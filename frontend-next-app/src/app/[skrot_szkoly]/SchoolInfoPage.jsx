import SingleSchoolMap from "./SingleSchoolMap";
import { getCmsUrl, getSchoolDetails } from "@/lib/queries";
import OfertaEdukacyjna from "./OfertaEdukacyjna";
import ErrorPage from "@/components/ErrorPage";
import LinkButton from "@/components/LinkButton";
import PhotoGallery from "@/components/PhotoGallery";
import {
  Link2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Image as ImageIcon,
} from "lucide-react";
import { tryCatch } from "@/lib/utils";
import Image from "next/image";

export default async function SchoolPageInfo({ params }) {
  const { data, error } = await tryCatch(getSchoolDetails(params.skrot_szkoly));
  const school = data;

  console.log(error);

  const cmsUrl = await getCmsUrl();
  return (
    <div className="min-h-screen p-6">
      {error && (
        <ErrorPage errorMessage={"Nie znaleziono szkoły"} statusCode={404}>
          <LinkButton buttonStyle={"p-0"} linkHref={"/"} linkIcon={<Link2 />}>
            Przejdź do strony głównej
          </LinkButton>
        </ErrorPage>
      )}

      {!error && school && (
        <div className="max-w-7xl mx-auto bg-background rounded-3xl shadow-sm overflow-hidden">
          <Header school={school} cmsUrl={cmsUrl} />
          <ContactInfoBar school={school} />
          <div className="p-10">
            <OfertaEdukacyjna school={school} />
            <section className="flex flex-col gap-8">
              <MapSection school={school} />
              <GallerySection school={school} />
            </section>
          </div>
        </div>
      )}
    </div>
  );
}

function FacebookIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function Header({ school, cmsUrl }) {
  return (
    <div className="bg-zinc-900 p-10 text-white">
      <div className="flex items-center gap-8">
        {cmsUrl && (
          <div className="w-28 h-28 bg-background rounded-2xl p-3 flex items-center justify-center">
            <Image
              src={`${cmsUrl}${school.glowne_zdjecie_szkoly.url}`}
              alt="Logo"
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{school.nazwa_szkoly}</h1>
          <p className="text-zinc-400 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {school.adres_szkoly}
          </p>
        </div>
        <div className="flex gap-3">
          <a
            href={school.adres_strony_szkoly}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <Globe className="w-5 h-5" />
          </a>
          <a
            href={school.adres_facebooka_szkoly}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <FacebookIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}

function ContactInfoBar({ school }) {
  return (
    <div className="border-b px-10 py-4 bg-muted flex items-center gap-8 text-sm text-muted-foreground">
      <span className="flex items-center gap-2">
        <Phone className="w-4 h-4" />
        {school.numer_telefonu}
      </span>
      <span className="flex items-center gap-2">
        <Mail className="w-4 h-4" />
        {school.email_szkoly}
      </span>
    </div>
  );
}

function GallerySection({ school }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <ImageIcon className="w-6 h-6 text-muted-foreground" />
        Galeria
      </h2>
      <PhotoGallery
        photos={school.glowna_galeria_zdjec_szkoly}
        containerDivStyles="h-[50vh] w-full flex flex-col justify-center items-center"
      />
    </div>
  );
}

function MapSection({ school }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <MapPin className="w-6 h-6 text-muted-foreground" />
        Tu nas znajdziesz
      </h2>
      <div className="bg-muted rounded-2xl p-6">
        <p className="text-sm text-muted-foreground mb-4">
          {school.adres_szkoly}
        </p>
        <div className="aspect-video rounded-xl overflow-hidden">
          <SingleSchoolMap school={school} />
        </div>
      </div>
    </div>
  );
}
