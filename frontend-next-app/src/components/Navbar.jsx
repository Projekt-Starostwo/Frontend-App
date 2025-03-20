'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { ThemeToggle } from './ThemeToggle'
import { ScrollProgress } from './magicui/scroll-progress'
import { Menu, X } from 'lucide-react'
import GlobalSearch from './GlobalSearch'

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <div className='sticky top-0 navbar'>
      <div className='w-full flex justify-between items-center h-[7vh] border-b bg-background px-4 py-2'>
        <button className='sm:hidden' onClick={() => setIsOpen(!isOpen)} aria-label='Toggle Menu'>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className='hidden sm:flex items-center space-x-4'>
          <Link href='/' legacyBehavior passHref>
            <a onClick={handleLinkClick} className={`${navigationMenuTriggerStyle()} text-lg sm:text-2xl font-bold`}>
              Nasze szkoły
            </a>
          </Link>
          <Link href='/kalkulator' legacyBehavior passHref>
            <a onClick={handleLinkClick} className={`${navigationMenuTriggerStyle()} text-lg sm:text-2xl font-bold`}>
              Kalkulator punktów
            </a>
          </Link>
          <Link href='/rekrutacja-vulcan' legacyBehavior passHref>
            <a onClick={handleLinkClick} className={`${navigationMenuTriggerStyle()} text-lg sm:text-2xl font-bold`}>
              Rekrutacja Vulcan
            </a>
          </Link>
        </div>
        <div className='flex items-center gap-4'>
          <GlobalSearch />
          <ThemeToggle />
        </div>
      </div>
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden border-b bg-background px-4 py-2`}>
        <Link href='/' legacyBehavior passHref>
          <a onClick={handleLinkClick} className='block py-2 text-lg sm:text-xl font-bold'>
            Nasze szkoły
          </a>
        </Link>
        <Link href='/kalkulator' legacyBehavior passHref>
          <a onClick={handleLinkClick} className='block py-2 text-lg sm:text-xl font-bold'>
            Kalkulator
          </a>
        </Link>
        <Link href='/rekrutacja-vulcan' legacyBehavior passHref>
          <a onClick={handleLinkClick} className='block py-2 text-lg sm:text-xl font-bold'>
            Rekrutacja Vulcan
          </a>
        </Link>
      </div>
      <ScrollProgress className='' />
    </div>
  )
}

const ListItem = React.forwardRef(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <Link
        href={href}
        ref={ref}
        className={cn(
          'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
          className
        )}
        {...props}
      >
        <div className='text-sm font-medium leading-none'>{title}</div>
        <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>{children}</p>
      </Link>
    </li>
  )
})
ListItem.displayName = 'ListItem'
