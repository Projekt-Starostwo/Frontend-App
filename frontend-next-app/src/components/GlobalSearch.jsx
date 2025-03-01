'use client'

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { slugify } from '@/lib/utils'
import { GraduationCap, Link2, MapPin, Moon, School, Scroll, Sun } from 'lucide-react'
import { Badge } from './ui/badge'
import { useTheme } from 'next-themes'
import { CommandSeparator } from 'cmdk'
import { getListOfSchool } from '@/lib/queries'
import { DialogContent, DialogTitle } from './ui/dialog'

export default function GlobalSearch() {
  const { setTheme } = useTheme()
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const handleInputClick = () => {
    setOpen(true) // Open the CommandDialog when the input is clicked
  }
  const handleCommandSelect = () => {
    setOpen(false) // Close the CommandDialog when a command is selected
  }

  const {
    data: listOfSchools,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['listOfschoolsForSearch'],
    queryFn: async () => getListOfSchool(),
  })
  // console.log(listOfSchools)

  const possibleKeys = ['liceum', 'technikum', 'szkola_zawodowa']

  return (
    <>
      <Button
        variant='outline'
        size='sm'
        onClick={handleInputClick}
        className='relative w-40 h-9 justify-between overflow-visible'
      >
        <h1 className='font-bold'>Szukaj...</h1>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className='w-0 h-0'></DialogTitle>

        <CommandInput placeholder='Przejdź do strony lub wyszukaj...' />
        <CommandList>
          <CommandEmpty>Nie znaleziono wyników.</CommandEmpty>
          <CommandGroup heading='Preferencje'>
            <CommandItem
              onSelect={() => {
                setTheme('dark')
                handleCommandSelect()
              }}
            >
              <Moon /> Ciemny Motyw
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setTheme('light')
                handleCommandSelect()
              }}
            >
              <Sun /> Jasny Motyw
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading='Przejdź do strony'>
            <CommandItem
              onSelect={() => {
                router.push('/')
                handleCommandSelect()
              }}
            >
              <MapPin />
              Nasze Szkoły
            </CommandItem>
            <CommandItem
              onSelect={() => {
                router.push('/rekrutacja-vulcan')
                handleCommandSelect()
              }}
            >
              <Scroll />
              Rekrutacja Vulcan
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading='Wyszukiwanie'>
            {listOfSchools?.data?.map((school) => (
              <div key={school.skrot_szkoly}>
                <CommandItem
                  onSelect={() => {
                    router.push(`/${school.skrot_szkoly}`)
                    handleCommandSelect()
                  }}
                >
                  <div className='w-full flex flex-row justify-start items-center gap-2'>
                    <School />
                    {school.nazwa_szkoly}
                    <p className='text-muted-foreground'>Szkoła</p>
                  </div>
                </CommandItem>
                {possibleKeys.map((key) => {
                  if (school.rodzaje_szkoly[key] && school.rodzaje_szkoly[key].lista_kierunkow) {
                    return school.rodzaje_szkoly[key].lista_kierunkow.map((kierunek) => (
                      <CommandItem
                        // key={`${school.skrot_szkoly}-${slugify(kierunek.kierunek.nazwa_kierunku)}`} // Unique key
                        key={kierunek.id}
                        onSelect={() => {
                          router.push(`/${school.skrot_szkoly}/${slugify(kierunek.kierunek.nazwa_kierunku)}`)
                          handleCommandSelect()
                        }}
                      >
                        <div className='w-full flex flex-row justify-start items-center gap-2'>
                          <GraduationCap />
                          {kierunek.kierunek.nazwa_kierunku}
                          <p className='text-muted-foreground'>{school.skrot_szkoly}</p>
                        </div>
                      </CommandItem>
                    ))
                  }
                  return null
                })}
              </div>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
