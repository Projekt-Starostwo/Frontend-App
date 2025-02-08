import SchoolType from './SchoolType'

export default async function OfertaEdukacyjna({ school }) {
  return (
    <div className='h-1/2 p-4'>
      <SchoolType school={school} />
    </div>
  )
}
