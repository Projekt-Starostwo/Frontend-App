"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { slugify, tryCatch } from "@/lib/utils";
import {
  Command,
  GraduationCap,
  MapPin,
  Moon,
  School,
  Scroll,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import { DialogTitle } from "./ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { getListOfSchool } from "@/lib/queries";

export default function GlobalSearch() {
  const { setTheme } = useTheme();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const { data: listOfSchools } = useQuery({
    queryKey: ["listOfSchoolsSearch"],
    queryFn: async () => {
      const { data, error } = await tryCatch(getListOfSchool());

      if (error) throw new Error("Nie pobrano szkół");
      // console.log(data.data);
      return data.data;
    },
  });

  React.useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleInputClick = () => {
    setOpen(true); // Open the CommandDialog when the input is clicked
  };
  const handleCommandSelect = () => {
    setOpen(false); // Close the CommandDialog when a command is selected
  };

  const possibleKeys = ["liceum", "technikum", "szkola_zawodowa"];

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={handleInputClick}
        className="  h-9  "
      >
        <div className="w-40 flex flex-row justify-between items-center">
          <h1>Szukaj...</h1>
          <div className="flex flex-row justify-center items-center gap-2  p-[5px] rounded-md">
            <Command size={1} />
            <p className="text-[13px]">K</p>
          </div>
        </div>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="w-0 h-0"></DialogTitle>

        <CommandInput placeholder="Przejdź do strony lub wyszukaj..." />
        <CommandList>
          <CommandEmpty>Nie znaleziono wyników.</CommandEmpty>
          <CommandGroup heading="Preferencje">
            <CommandItem
              onSelect={() => {
                setTheme("dark");
                handleCommandSelect();
              }}
            >
              <Moon /> Ciemny Motyw
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setTheme("light");
                handleCommandSelect();
              }}
            >
              <Sun /> Jasny Motyw
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Przejdź do strony">
            <CommandItem
              onSelect={() => {
                router.push("/");
                handleCommandSelect();
              }}
            >
              <MapPin />
              Nasze Szkoły
            </CommandItem>
            <CommandItem
              onSelect={() => {
                router.push("/rekrutacja-vulcan");
                handleCommandSelect();
              }}
            >
              <Scroll />
              Rekrutacja Vulcan
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Wyszukiwanie">
            {listOfSchools?.map((school) => (
              <div key={school.skrot_szkoly}>
                <CommandItem
                  onSelect={() => {
                    router.push(`/${school.skrot_szkoly}`);
                    handleCommandSelect();
                  }}
                >
                  <div className="w-full flex flex-row justify-start items-center gap-2">
                    <School />
                    {school.nazwa_szkoly}
                    <p className="text-muted-foreground">Szkoła</p>
                  </div>
                </CommandItem>
                {possibleKeys.map((key) => {
                  if (
                    school.rodzaje_szkoly[key] &&
                    school.rodzaje_szkoly[key].lista_kierunkow
                  ) {
                    return school.rodzaje_szkoly[key].lista_kierunkow.map(
                      (kierunek) => (
                        <CommandItem
                          // key={`${school.skrot_szkoly}-${slugify(kierunek.kierunek.nazwa_kierunku)}`} // Unique key
                          key={kierunek.id}
                          onSelect={() => {
                            router.push(
                              `/${school.skrot_szkoly}/${slugify(
                                kierunek.kierunek.nazwa_kierunku
                              )}`
                            );
                            handleCommandSelect();
                          }}
                        >
                          <div className="w-full flex flex-row justify-start items-center gap-2">
                            <GraduationCap />
                            {kierunek.kierunek.nazwa_kierunku}
                            <p className="text-muted-foreground">
                              {school.skrot_szkoly}
                            </p>
                          </div>
                        </CommandItem>
                      )
                    );
                  }
                  return null;
                })}
              </div>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
