import React from "react";

export default function Wynik({ result }) {
  function getResultMessage(result) {
    let message = "";
    if (result < 90) {
      message = "Trochę za mało punktów? Nie zniechęcaj się, możesz więcej!";
    } else if (result < 120) {
      message = "Przydałoby się więcej punktów? Jeszcze trochę nauki, a będzie się czym pochwalić :)";
    } else if (result < 140) {
      message = "Całkiem nieźle. Potrzebujesz więcej? Wiemy, że stać Cię na to, tylko trochę popracuj :)";
    } else if (result < 160) {
      message = "Dobre liceum w zasięgu ręki! Pamiętaj, że zawsze możesz więcej!";
    } else if (result < 180) {
      message = "Co za potencjał! Bardzo dobre szkoły czekają na Ciebie! Zawsze możesz poprawić ten wynik, bo już teraz dużo umiesz!";
    } else {
      message = "Jesteśmy pod wrażeniem! Możesz wybierać spośród najlepszych szkół w Polsce!";
    }
    return message;
  }

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center py-10 border-t p-10 w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full sm:w-2/3">
        <div className="w-full sm:w-1/2">
          <h1 className="text-xl sm:text-2xl font-semibold text-center sm:text-left">
            Suma uzyskanych punktów: {result}
          </h1>
        </div>
        <h1 className="text-lg sm:text-xl mt-4 sm:mt-0 sm:text-center">{getResultMessage(result)}</h1>
      </div>
    </div>
  );
}
