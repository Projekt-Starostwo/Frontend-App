'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div>
      {theme === 'dark' ? (
        <Button
          variant='outline'
          size='icon'
          onClick={() => {
            setTheme('light')
          }}
        >
          <Moon />
        </Button>
      ) : (
        <Button
          variant='outline'
          size='icon'
          onClick={() => {
            setTheme('dark')
          }}
        >
          <Sun />
        </Button>
      )}
    </div>
  )
}
