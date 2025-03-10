import React from "react";

export default function E8({ examScores, setExamScores, exempted, setExempted }) {
  const subjectNames = { polish: "języka polskiego", math: "matematyki", foreignLang: "języka obcego" };

  const mathPointsMap = { 1: 0, 2: 10, 3: 15, 4: 25, 5: 30, 6: 35 };
  const gradePointsMap = { 1: 0, 2: 10, 3: 15, 4: 25, 5: 30, 6: 35 }; // Tak samo dla polskiego!

  const handleInputChange = (e) => {
    let value = e.target.value;
    const subject = e.target.name;

    if (!/^\d*$/.test(value)) return;
    value = parseInt(value, 10);

    if (exempted[subject]) {
      if (isNaN(value) || value < 1) value = 0;
      if (value > 6) value = 6;
      setExamScores({ ...examScores, [subject]: subject === "math" ? mathPointsMap[value] : gradePointsMap[value] });
    } else {
      if (isNaN(value) || value < 0) value = 0;
      if (value > 100) value = 100;
      setExamScores({ ...examScores, [subject]: value });
    }
  };

  const handleExemptionChange = (e) => {
    const subject = e.target.name;
    const isChecked = e.target.checked;

    setExempted({ ...exempted, [subject]: isChecked });

    if (isChecked) {
      setExamScores({ ...examScores, [subject]: "" });
    } else {
      setExamScores({ ...examScores, [subject]: "" });
    }
  };

  return (
    <div>
      <h3 className="font-bold text-2xl">Egzamin ósmoklasisty</h3>
      {Object.keys(subjectNames).map((subject) => (
        <div key={subject}>
          <h1 className="text-xl font-bold">{subjectNames[subject]}</h1>

          <input
  type="number"
  name={subject}
  placeholder={
    exempted[subject]
      ? `Ocena z ${subjectNames[subject]} (1-6)`
      : `Wynik % z ${subjectNames[subject]}`
  }
  value={
    exempted[subject]
      ? Object.keys(mathPointsMap).find(key => mathPointsMap[key] == examScores[subject]) || ""
      : examScores[subject] || ""
  }
  onChange={handleInputChange}
  className="block w-full p-2 border-2 rounded bg-transparent"
/>

          <label className="flex items-center space-x-2 mb-2">
            <input
              type="checkbox"
              name={subject}
              onChange={handleExemptionChange}
              checked={exempted[subject] || false}
            />
            <span>Zwolniony z egzaminu ({subjectNames[subject]})</span>
          </label>
        </div>
      ))}
    </div>
  );
}
