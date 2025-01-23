import Map from "./(map)/Map";
import ListOfSchools from "./(sidebarList)/ListOfSchools";

export default async function SchoolBrowser() {
  // tutaj (server component) pobrac liste szkol, podac komponentom nizej do wyswietlenia

  return (
    <div className="flex flex-row h-[80vh]">
      <ListOfSchools />
      <Map />
    </div>
  );
}
