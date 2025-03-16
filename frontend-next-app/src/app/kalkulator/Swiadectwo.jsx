import React from "react";

export default function Swiadectwo({ grades, setGrades }) {
  const subjectNamesGrades = {
    polish: "z języka polskiego",
    math: "z matematyki",
    extra1: "z dodatkowego przedmiotu",
    extra2: "z dodatkowego przedmiotu",
  };

  const handleGradeChange = (e) => {
    let value = e.target.value;

    
    if (!/^\d*$/.test(value)) return;

    
    value = parseInt(value, 10);

   
    if (isNaN(value) || value < 1) value = 0;
    if (value > 6) value = 6;

    setGrades((prev) => ({ ...prev, [e.target.name]: value }));
  };

  return (
    <div>
      <h3 className="font-bold text-2xl">Świadectwo</h3>
      {Object.keys(subjectNamesGrades).map((subject) => (
        <div key={subject}>
          <label className="block font-bold">
            Ocena {subjectNamesGrades[subject]}
          </label>
          <input
            type="number"
            name={subject}
            placeholder={`Ocena ${subjectNamesGrades[subject]}`}
            value={grades[subject] || ""}
            onChange={handleGradeChange}
            className="block w-full p-2 border-2 rounded mt-2 bg-transparent"
          />
        </div>
      ))}
    </div>
  );
}
