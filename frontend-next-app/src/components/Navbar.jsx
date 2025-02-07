'use client'

import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
// import { Icons } from "@/components/icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { ThemeToggle } from './ThemeToggle'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const components = [
  {
    title: 'Alert Dialog',
    href: '/docs/primitives/alert-dialog',
    description: 'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '/docs/primitives/hover-card',
    description: 'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '/docs/primitives/progress',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    href: '/docs/primitives/scroll-area',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '/docs/primitives/tabs',
    description: 'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '/docs/primitives/tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
]

export default function Navbar() {
  const router = useRouter()
  return (
    <div className='w-full flex justify-center items-center h-[7vh] border-b'>
      <div className='absolute left-4'>
        <Image
          width={60}
          height={60}
          src={'/herb_powiatu_minskiego.png'}
          alt='logo szkoly'
          onClick={() => router.push('/')}
          className='h-[60px] w-[60px] cursor-pointer'
        />
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href='/' legacyBehavior passHref>
              <div className='cursor-pointer'>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Nasze szkoły</NavigationMenuLink>
              </div>
            </Link>
          </NavigationMenuItem>

          {/* <NavigationMenuItem>
            <NavigationMenuTrigger>Informacje</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
                {components.map((component) => (
                  <ListItem key={component.title} title={component.title} href={component.href}>
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem> */}
          <div>
            <Link href='/rekrutacja-vulcan' legacyBehavior passHref>
              <div className='cursor-pointer'>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Rekrutacja Vulcan</NavigationMenuLink>
              </div>
            </Link>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
      <ThemeToggle />
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
