"use client";

import dynamic from "next/dynamic";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Districts from "./Districts";
import CustomMarker from "./CustomMarker";
import { Button } from "@/components/ui/button";

import { useTheme } from "next-themes";


const MAP_CENTER = [52.179, 21.57211];

const LeafletMap = ({ map, listOfSchools }) => {
  const { theme } = useTheme();
 

  return (
    <div className="bg-white dark:bg-white h-full w-2/3 p-12 flex justify-center items-center gap-2">
      <Button className="bg-red-900 text-slate-300" onClick={() => map.map.setView(MAP_CENTER, 10)}>RESET MAP</Button>

import { useEffect, useState, useRef } from "react";

export const MAP_CENTER = [52.179, 21.57211];

const LeafletMap = ({ map, listOfSchools }) => {
  console.log(listOfSchools);
  const mapRef = useRef(null);

  return (
    <div className="bg-gray-700 h-full w-2/3 p-10">
      <Button
        className="bg-black text-slate-300"
        onClick={() => {
          if (mapRef.current) {
            mapRef.current.setView(MAP_CENTER, 10);
          } else {
            console.warn("Mapa jeszcze nie jest gotowa!");
          }
        }}
      >
        RESET MAP
      </Button>


      <MapContainer
        center={MAP_CENTER}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
        maxZoom={17}

        minZoom={10}
        maxBounds={[
          [51.8, 20.6],
          [52.5, 22.4113],
        ]}
        ref={map.setMap}
      >
        <TileLayer
          attribution={
            theme === "dark"
              ? '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }
          url={
            theme === "dark"
              ? "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
              : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
        />

        {listOfSchools.map((school) => (
          <CustomMarker key={school.id + "marker"} school={school} />
        ))}

        minZoom={4}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
        ref={map.setMap}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {listOfSchools.map((school) => {
          console.log(school);
          return <CustomMarker key={school.id} school={school} />;
        })}


        <Districts />
      </MapContainer>
    </div>
  );
};

export default dynamic(() => Promise.resolve(LeafletMap), { ssr: false });
