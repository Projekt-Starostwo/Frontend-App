"use client";

import SchoolListItem from "./SchoolListItem";

export default function ListOfSchools({ map, listOfSchools }) {
  return (
    <div className="bg-blue-400 h-full w-1/3">
      lista szkol kilka info o nich
      {listOfSchools.map((school) => {
        return <SchoolListItem map={map} key={school.id} school={school} />;
      })}
    </div>
  );
}
