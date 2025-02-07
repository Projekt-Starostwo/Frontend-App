'use client'

import SchoolListItem from './SchoolListItem'

export default function ListOfSchools({ map, listOfSchools }) {
  return (
    <div className='h-full w-1/3 overflow-y-auto p-5 flex flex-col gap-10'>
      {listOfSchools.data.map((school) => {
        return <SchoolListItem map={map} key={school.id} school={school} />
      })}
    </div>
  )
}
