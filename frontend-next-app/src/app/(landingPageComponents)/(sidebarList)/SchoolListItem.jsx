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
      <Card className="bg-gray-900 ">
        <CardHeader>
          <CardTitle>{school.nazwa_szkoly}</CardTitle>
          <CardDescription>
            {school.lokalizacja_szkoly.dlugosc_geograficzna_szkoly}{" "}
            {school.lokalizacja_szkoly.szerokosc_geograficzna_szkoly}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            target="_blanc"
            className="underline"
            href={`/${school.skrot_szkoly}`}
          >
            dowiedz sie wiecej
          </Link>
        </CardContent>
        <CardFooter>
          <Button
            className="bg-black text-slate-300"
            onClick={() => {
              map.map.setView(
                [
                  school.lokalizacja_szkoly.dlugosc_geograficzna_szkoly,
                  school.lokalizacja_szkoly.szerokosc_geograficzna_szkoly,
                ],
                16
              );
            }}
          >
            pokaz na mapie
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
