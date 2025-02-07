'use client'
import Link from 'next/link'
import { Button } from './ui/button'
import { Link2 } from 'lucide-react'

export default function LinkButton({ linkHref, linkTarget, children, handleOnClick, buttonStyle, linkStyle }) {
  return (
    <Link className={linkStyle} href={`${linkHref}`} target={linkTarget}>
      <Button
        variant='link'
        onClick={() => {
          handleOnClick()
        }}
        className={buttonStyle}
      >
        <Link2 />
        {children}
      </Button>
    </Link>
  )
}
