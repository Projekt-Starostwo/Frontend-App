export default async function SchoolDescription({ school }) {
  return (
    <div className='h-1/2 p-4'>
      <h1 className='text-2xl font-bold'>O nas</h1>
      <p className='py-4'>{school.opis_szkoly}</p>
    </div>
  )
}
