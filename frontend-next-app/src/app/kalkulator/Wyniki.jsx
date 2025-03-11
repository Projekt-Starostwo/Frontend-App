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
    <div className="flex flex-row justify-center items-center py-10 border-t p-10 w-full ">
      <div className=" flex flex-row items-center justify-between  w-2/3">
        <div className="w-[50%]">
          <h1 className="text-xl font-semibold ">Suma uzyskanych punktów: {result}</h1>
        </div>
        <h1>{getResultMessage(result)}</h1>
      </div>
    </div>
  );
}
