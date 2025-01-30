import Link from 'next/link'
import { Button } from './ui/button'
import { Link2 } from 'lucide-react'

export default function DowiedzSieWiecej({ school }) {
  return (
    <Link className='' href={`/${school.skrot_szkoly}`}>
      <Button
        variant='link'
        onClick={() => {
          sessionStorage.setItem('school', JSON.stringify(school))
        }}
      >
        <Link2 />
        Dowiedz się więcej
      </Button>
    </Link>
  )
}
