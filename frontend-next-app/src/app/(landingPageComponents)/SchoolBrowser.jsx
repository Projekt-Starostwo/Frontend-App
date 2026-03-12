"use client";
import dynamic from "next/dynamic";
const LeafletMap = dynamic(
  () => import("../(landingPageComponents)/(map)/LeafletMap"),
  {
    ssr: false,
  },
);
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getListOfSchool } from "@/lib/queries";
import ListOfSchools from "./(sidebarList)/ListOfSchools";
import SpinnerLoading from "@/components/SpinnerLoading";
import ErrorPage from "@/components/ErrorPage";
import { tryCatch } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Building2, Wrench } from "lucide-react";

export default function SchoolBrowser() {
  const queryClient = useQueryClient();
  // objekt mapa, na nim mozna wykonywac rozne operacje
  const [map, setMap] = useState(null);
  const mapObj = { map: map, setMap: setMap };
  const [showMarkers, setShowMarkers] = useState(true);
  const [selectedTab, setSelectedTab] = useState("list");
  const [newSchoolFocused, setNewSchoolFocused] = useState(null);

  const [currentFilters, setCurrentFilters] = useState([
    {
      id: "liceum",
      label: "Liceum",
      checked: true,
    },
    {
      id: "technikum",
      label: "Technikum",
      checked: true,
    },
    {
      id: "szkola_zawodowa",
      label: "Branżowa Szkoła I Stopnia",
      checked: true,
    },
  ]);
  const [listOfSchools, setListOfSchools] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["listOfSchools"],
    queryFn: async () => {
      const { data, error } = await tryCatch(getListOfSchool());

      if (error) throw new Error();

      const schoolsWithIsActiveProp = data.data?.map((school) => {
        return {
          ...school,
          isActive: true,
        };
      });

      setListOfSchools(schoolsWithIsActiveProp);
      return { ok: true };
    },
  });
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["listOfSchools"] });
  }, []);

  return (
    <div className="">
      {isLoading && (
        <div className="flex justify-center items-center h-[80vh] w-full">
          <SpinnerLoading />
        </div>
      )}
      {isError && (
        <ErrorPage
          errorMessage={"Błąd połączenia z serwerem, spróbuj ponownie"}
          statusCode={404}
          children={<p>Przepraszamy za niedogodności</p>}
        />
      )}
      {!isLoading && !isError && (
        <>
          {/* Mobile view - Tabs for switching between list and map */}
          <div className="lg:hidden">
            <Tabs
              defaultValue="list"
              value={selectedTab}
              onValueChange={(e) => {
                setSelectedTab(e);
              }}
            >
              <TabsList className="grid grid-cols-2 mt-4">
                <TabsTrigger value="list">Szkoły</TabsTrigger>
                <TabsTrigger value="map">Mapa</TabsTrigger>
              </TabsList>
              <Filters
                listOfSchools={listOfSchools}
                setListOfSchools={setListOfSchools}
                currentFilters={currentFilters}
                setCurrentFilters={setCurrentFilters}
              />
              <TabsContent value="list" className="h-[70vh]">
                <ListOfSchools
                  map={mapObj}
                  listOfSchools={listOfSchools}
                  setShowMarkers={setShowMarkers}
                  setSelectedTab={setSelectedTab}
                  setNewSchoolFocused={setNewSchoolFocused}
                />
              </TabsContent>
              <TabsContent value="map" className="h-[80vh]">
                <div className="md:col-span-2 lg:col-span-3 rounded-lg overflow-hidden relative">
                  <div className="h-[80vh] w-full p-10 flex flex-col justify-center items-center gap-2 ">
                    <LeafletMap
                      map={mapObj}
                      listOfSchools={listOfSchools}
                      showPopup
                      showMarkers={showMarkers}
                      setShowMarkers={setShowMarkers}
                      newSchoolFocused={newSchoolFocused}
                      mapButtonsClassname={
                        "w-2/3 z-[9999] flex flex-row justify-center items-center gap-4 flex-wrap absolute bottom-16  "
                      }
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          {/* Desktop view */}
          <div className="xl:mx-40 md:mx-20 hidden lg:grid md:grid-cols-3 lg:grid-cols-5 gap-6 h-[85vh] xl:p-6 md:p-4">
            <div className=" md:col-span-1 lg:col-span-2 rounded-xl overflow-hidden border bg-background shadow-sm flex flex-col">
              <Filters
                listOfSchools={listOfSchools}
                setListOfSchools={setListOfSchools}
                currentFilters={currentFilters}
                setCurrentFilters={setCurrentFilters}
              />
              <ListOfSchools
                map={mapObj}
                listOfSchools={listOfSchools}
                setShowMarkers={setShowMarkers}
              />
            </div>
            <div className="md:col-span-2 lg:col-span-3  rounded-lg overflow-hidden relative">
              <div className="h-[85vh] w-full  flex flex-col justify-center items-center gap-2 ">
                <LeafletMap
                  map={mapObj}
                  listOfSchools={listOfSchools}
                  showPopup
                  showMarkers={showMarkers}
                  setShowMarkers={setShowMarkers}
                  mapButtonsClassname={
                    "w-full z-[9999] flex flex-row justify-center items-center gap-4 flex-wrap absolute bottom-6  "
                  }
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Filters({
  listOfSchools,
  setListOfSchools,
  currentFilters,
  setCurrentFilters,
}) {
  useEffect(() => {
    if (!listOfSchools) return;
    setListOfSchools((prevListOfSchools) => {
      const res = prevListOfSchools.map((school) => {
        return {
          ...school,
          isActive: CalcSchoolActivity(school, currentFilters),
        };
      });
      // console.log(res)
      return res;
    });
  }, [currentFilters]);

  function handleFiltersChange(itemId, itemLabel, newValue, itemIndex) {
    // console.log('changed: ', itemId, 'for', newValue)

    setCurrentFilters((prevFilters) => {
      const newObject = {
        id: itemId,
        label: itemLabel,
        checked: newValue,
      };

      // keep the order of filters
      if (itemIndex == 0) {
        return [newObject, prevFilters[1], prevFilters[2]];
      }
      if (itemIndex == 1) {
        return [prevFilters[0], newObject, prevFilters[2]];
      }
      if (itemIndex == 2) {
        return [prevFilters[0], prevFilters[1], newObject];
      }
    });
  }
  function CalcSchoolActivity(school, filters) {
    // check if option is checked and if a school contains this option
    const result = filters.map((filter) => {
      if (filter.checked && school.rodzaje_szkoly[filter.id] !== null) {
        // console.log('NALEZY POKAZAC', filter.label)
        //  show school
        return true;
      }
      // school doesnt match filters
      return false;
    });

    // returns true if any element in arr matched condition
    return result.some((element) => element === true);
  }
  const filterIcons = {
    liceum: GraduationCap,
    technikum: Building2,
    szkola_zawodowa: Wrench,
  };

  return (
    <div className="p-3 border-b">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-foreground">Szkoły</h2>
        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
          {listOfSchools?.filter((s) => s.isActive).length || 0} wyników
        </span>
      </div>
      <div className="flex gap-2">
        {currentFilters.map((item, index) => {
          const Icon = filterIcons[item.id];
          return (
            <button
              key={item.id}
              onClick={() =>
                handleFiltersChange(item.id, item.label, !item.checked, index)
              }
              className={`flex-1 flex flex-col items-center gap-1 p-2 rounded-lg border transition-all ${
                item.checked
                  ? "bg-foreground/5 border-foreground/20 text-foreground"
                  : "border-transparent bg-muted/50 text-muted-foreground hover:bg-muted"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[9px] font-medium text-center leading-tight">
                {item.label === "Branżowa Szkoła I Stopnia"
                  ? "Branżowa"
                  : item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
