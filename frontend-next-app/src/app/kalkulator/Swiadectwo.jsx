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
    <div className="w-full mx-auto p-4 sm:p-6">
      <h3 className="font-bold text-xl sm:text-3xl mb-10">Świadectwo</h3>
      <div className="flex flex-col gap-4 mb-8">
        {Object.keys(subjectNamesGrades).map((subject) => (
          <div key={subject}>
            <label className="mb-4 block font-bold text-base sm:text-lg">
              Ocena {subjectNamesGrades[subject]}
            </label>
            <input
              type="number"
              name={subject}
              placeholder={`Ocena ${subjectNamesGrades[subject]}`}
              value={grades[subject] || ""}
              onChange={handleGradeChange}
              className="w-1/4 p-2 border-2 rounded bg-transparent text-base sm:text-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
