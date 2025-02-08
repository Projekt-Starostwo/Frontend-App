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
    queryKey: ['listOfschools'],
    queryFn: async () => getListOfSchool(),
  })
  console.log(listOfSchools)

  return (
    <>
      <Button
        variant='outline'
        size='sm'
        onClick={handleInputClick}
        className='relative w-40 justify-between overflow-visible'
      >
        Szukaj...
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
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
            {listOfSchools?.data?.map((school) => {
              const results = []

              results.push(
                <CommandItem
                  onSelect={() => {
                    router.push(`/${school.skrot_szkoly}`)
                    handleCommandSelect()
                  }}
                >
                  <div className='w-full flex flex-row justify-start items-center gap-2'>
                    <School />
                    {school.nazwa_szkoly}
                    <p className='absolute right-4 text-muted-foreground'>Szkoła</p>
                  </div>
                </CommandItem>
              )

              school.lista_kierunkow.map((kierunek) => {
                results.push(
                  <CommandItem
                    onSelect={() => {
                      router.push(`/${school.skrot_szkoly}/${slugify(kierunek.kierunek.nazwa_kierunku)}`)
                      handleCommandSelect()
                    }}
                  >
                    <div className='w-full flex flex-row justify-start items-center gap-2'>
                      <GraduationCap />

                      {kierunek.kierunek.nazwa_kierunku}
                      <p className='absolute right-4 text-muted-foreground'>Kierunek - {school.skrot_szkoly}</p>
                    </div>
                  </CommandItem>
                )
              })
              console.log(results)
              return results
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
