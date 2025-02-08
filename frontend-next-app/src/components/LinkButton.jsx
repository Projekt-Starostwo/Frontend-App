'use client'
import Link from 'next/link'
import { Button } from './ui/button'

export default function LinkButton({
  linkHref,
  linkTarget,
  children,

  buttonStyle,
  linkStyle,
  linkIcon,
}) {
  return (
    <Link className={linkStyle} href={`${linkHref}`} target={linkTarget}>
      <Button variant='link' className={buttonStyle}>
        {linkIcon}
        {children}
      </Button>
    </Link>
  )
}
