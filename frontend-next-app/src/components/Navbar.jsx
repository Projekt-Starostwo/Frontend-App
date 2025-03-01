'use client'

import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { ThemeToggle } from './ThemeToggle'
import { ScrollProgress } from './magicui/scroll-progress'
import GlobalSearch from './GlobalSearch'

export default function Navbar() {
  return (
    <div className='sticky top-0 z-50'>
      <div className='w-full flex justify-start items-center h-[7vh] border-b bg-background pl-4'>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href='/' legacyBehavior passHref>
                <div className='cursor-pointer'>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <h1 className='text-2xl font-bold'>Nasze szkoły</h1>
                  </NavigationMenuLink>
                </div>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href='/calculator' legacyBehavior passHref>
                <div className='cursor-pointer'>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <h1 className='text-2xl font-bold'>Kalkulator</h1>
                  </NavigationMenuLink>
                </div>
              </Link>
            </NavigationMenuItem>

            <div>
              <Link href='/rekrutacja-vulcan' legacyBehavior passHref>
                <div className='cursor-pointer'>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <h1 className='text-2xl font-bold'>Rekrutacja Vulcan</h1>
                  </NavigationMenuLink>
                </div>
              </Link>
            </div>
          </NavigationMenuList>
        </NavigationMenu>
        <div className='absolute right-4 flex flex-row gap-4'>
          <GlobalSearch />
          <ThemeToggle />
        </div>
      </div>
      <ScrollProgress className='' />
    </div>
  )
  // return <div>fdjskl</div>;
}

const ListItem = ({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      {/* <NavigationMenuLink asChild> */}
      <Link
        href={'/321'}
        // ref={ref}
        className={cn(
          'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
          className
        )}
        {...props}
      >
        <div className='text-sm font-medium leading-none'>{title}</div>
        <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>{children}</p>
      </Link>
      {/* </NavigationMenuLink> */}
    </li>
  )
}
ListItem.displayName = 'ListItem'
