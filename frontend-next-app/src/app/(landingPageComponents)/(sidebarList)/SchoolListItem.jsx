"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SchoolListItem({ map, school }) {
  console.log(map);
  return (
    <div className="flex flex-col p-2">
      <Card className="bg-gray-600">
        <CardHeader>
          <CardTitle>{school.nazwa}</CardTitle>
          <CardDescription>
            {school.cords.lat} {school.cords.long}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link target="_blanc" className="underline" href={`/${school.id}`}>
            dowiedz sie wiecej
          </Link>
        </CardContent>
        <CardFooter>
          <Button
            className="bg-black text-slate-300"
            onClick={() => {
              map.map.setView([school.cords.lat, school.cords.long], 16);
            }}
          >
            pokaz na mapie
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
