import React from "react";

export default function Swiadectwo({ grades, setGrades }) {
  const subjectNamesGrades = {
    polish: "z języka polskiego",
    math: "z matematyki",
    extra1: "z dodatkowego przedmiotu",
    extra2: "z dodatkowego przedmiotu",
  };

  const handleGradeChange = (e) => {
    const { name, value } = e.target;
    const numValue = parseInt(value) || 0;
    setGrades((prev) => ({ ...prev, [name]: numValue }));
  };

  return (
    <div>
      <h3 className="font-bold text-2xl">Świadectwo</h3>
      {Object.keys(subjectNamesGrades).map((subject) => (
        <input
          key={subject}
          type="number"
          name={subject}
          placeholder={`Ocena ${subjectNamesGrades[subject]}`}
          onChange={handleGradeChange}
          max="6"
          className="block w-full p-2 border-2  rounded mt-2 bg-transparent"
        />
      ))}
    </div>
  );
}
