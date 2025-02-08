'use client'
import Link from 'next/link'
import { Button } from './ui/button'

export default function LinkButton({
  linkHref,
  linkTarget,
  children,
  handleOnClick,
  buttonStyle,
  linkStyle,
  linkIcon,
}) {
  return (
    <Link className={linkStyle} href={`${linkHref}`} target={linkTarget}>
      <Button
        variant='link'
        onClick={() => {
          handleOnClick()
        }}
        className={buttonStyle}
      >
        {linkIcon}
        {children}
      </Button>
    </Link>
  )
}
