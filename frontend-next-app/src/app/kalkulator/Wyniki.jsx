import React from "react";

export default function Wynik({ result }) {
  return (
    <div className="flex justify-center items-center py-10">
      <h1 className="text-2xl font-bold text-center mr-4">Twój wynik</h1>
      {result !== null && (
        <div className="bg-blue p-4 rounded-lg shadow-lg border border-gray">
          <p className="text-center">{result}/200</p>
        </div>
      )}
    </div>
  );
}
