import React from "react";

export default function E8({ examScores, setExamScores, exempted, setExempted, setError }) {
  const subjectNames = { polish: "języka polskiego", math: "matematyki", foreignLang: "języka obcego" };

  const handleExamChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    if (value > 100) {
      setError(`Wynik z ${subjectNames[e.target.name]} nie może przekraczać 100!`);
    } else {
      setError("");
      setExamScores({ ...examScores, [e.target.name]: value });
    }
  };

  return (
    <div>
      <h3 className="font-bold text-2xl">Egzamin ósmoklasisty</h3>
      {Object.keys(subjectNames).map((subject) => (
        <div key={subject}>
          <h1 className="text-xl font-bold">{subjectNames[subject]}</h1>
          {!exempted[subject] && (
            <input
              type="number"
              name={subject}
              placeholder={`Wynik % z ${subjectNames[subject]}`}
              onChange={handleExamChange}
              max="100"
              className="block w-full p-2 border-2 rounded mt-2 bg-transparent"
            />
          )}
          <label className="flex items-center space-x-2 mb-2">
            <input type="checkbox" name={subject} onChange={(e) => setExempted({ ...exempted, [e.target.name]: e.target.checked })} />
            <span>Zwolniony z egzaminu ({subjectNames[subject]})</span>
          </label>
        </div>
      ))}
    </div>
  );
}
