"use client";

import SchoolListItem from "./SchoolListItem";

export default function ListOfSchools({ map, listOfSchools }) {
  return (
    <div className="bg-gray-800 h-full w-1/3 overflow-y-auto">
      {listOfSchools.map((school) => {
        return <SchoolListItem map={map} key={school.id} school={school} />;
      })}
    </div>
  );
}
