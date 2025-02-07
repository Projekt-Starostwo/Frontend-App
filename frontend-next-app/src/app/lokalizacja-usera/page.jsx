"use client";

import { useEffect } from "react";

const RequestLocation = ({ onLocationGranted }) => {
  useEffect(() => {
    const savedPermission = localStorage.getItem("locationPermission");

    if (savedPermission === "granted") {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          onLocationGranted([pos.coords.latitude, pos.coords.longitude]);
        },
        () => localStorage.setItem("locationPermission", "denied")
      );
    } else {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          onLocationGranted([pos.coords.latitude, pos.coords.longitude]);
          localStorage.setItem("locationPermission", "granted");
        },
        () => localStorage.setItem("locationPermission", "denied")
      );
    }
  }, [onLocationGranted]);

  return null; // Nie pokazuje niczego w UI, działa w tle
};

export default RequestLocation;
