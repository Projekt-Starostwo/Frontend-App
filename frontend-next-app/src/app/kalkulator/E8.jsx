import React from "react";

export default function E8({
  examScores,
  setExamScores,
  exempted,
  setExempted,
}) {
  const subjectNames = {
    polish: "z języka polskiego",
    math: "z matematyki",
    foreignLang: "z języka obcego",
  };

  const handleInputChange = (e) => {
    let value = e.target.value;
    const subject = e.target.name;

    if (!/^\d*$/.test(value)) return;
    value = parseInt(value, 10);

    if (isNaN(value)) value = "";

    if (exempted[subject]) {
      if (value < 1) value = 0;
      if (value > 6) value = 6;
    } else {
      if (value < 0) value = 0;
      if (value > 100) value = 100;
    }

    setExamScores({
      ...examScores,
      [subject]: value,
    });
  };

  const handleExemptionChange = (e) => {
    const subject = e.target.name;
    const isChecked = e.target.checked;

    setExempted({ ...exempted, [subject]: isChecked });

    if (isChecked) {
      setExamScores({ ...examScores, [subject]: "" });
    } else {
      setExamScores({ ...examScores, [subject]: 0 });
    }
  };

  return (
    <div className="w-full p-4 sm:p-6">
      <h3 className="font-bold text-xl sm:text-3xl mb-10">
        Egzamin ósmoklasisty
      </h3>
      {Object.keys(subjectNames).map((subject) => (
        <div key={subject} className="mb-8">
          <label className="mb-2 block text-lg sm:text-xl font-bold">
            {exempted[subject]
              ? `Ocena ${subjectNames[subject]}`
              : `Wynik % ${subjectNames[subject]}`}
          </label>

          <input
            type="number"
            name={subject}
            placeholder={
              exempted[subject]
                ? `Ocena ${subjectNames[subject]}`
                : `Wynik % ${subjectNames[subject]}`
            }
            value={examScores[subject] || ""}
            onChange={handleInputChange}
            className="block w-1/2 p-2 sm:p-3 border-2 rounded bg-transparent text-base sm:text-lg"
          />

          <label className="flex items-center space-x-2 mt-2">
            <input
              className="cursor-pointer"
              type="checkbox"
              name={subject}
              onChange={handleExemptionChange}
              checked={exempted[subject] || false}
            />
            <span className="text-base sm:text-lg">
              Zwolniony z egzaminu ({subjectNames[subject]})
            </span>
          </label>
        </div>
      ))}
    </div>
  );
}
