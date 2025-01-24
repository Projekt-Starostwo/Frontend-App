"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SchoolListItem({ map, school }) {
  return (
    <div className="border border-black ">
      <Link href={`/${school.id}`}>dowiedz sie wiecej</Link>
      <p>
        {school.nazwa} {school.cords.lat} {school.cords.long}
      </p>

      <Button
        onClick={() => {
          map.map.setView([school.cords.lat, school.cords.long], 16);
        }}
      >
        pokaz na mapie
      </Button>
    </div>
  );
}
