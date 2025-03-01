"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";

export default function Calculator() {
  const [examScores, setExamScores] = useState({
    polish: "",
    math: "",
    foreignLang: "",
  });
  const [grades, setGrades] = useState({
    polish: "",
    math: "",
    extra1: "",
    extra2: "",
  });
  const [bonus, setBonus] = useState({
    volunteer: false,
    distinction: false,
  });
  const [exempted, setExempted] = useState({
    polish: false,
    math: false,
    foreignLang: false,
  });
  const [competitionPoints, setCompetitionPoints] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const subjectNames = {
    polish: "języka polskiego",
    math: "matematyki",
    foreignLang: "języka obcego",
  };

  const handleExamChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    if (value > 100) {
      setError(`Wynik z ${subjectNames[e.target.name]} nie może przekraczać 100!`);
    } else {
      setError("");
      setExamScores({ ...examScores, [e.target.name]: value });
    }
  };

  const handleGradeChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    if (value > 6 || value < 1) {
      setError(`Ocena z ${subjectNames[e.target.name] || e.target.name} musi być między 1 a 6!`);
    } else {
      setError("");
      setGrades({ ...grades, [e.target.name]: value });
    }
  };

  const handleBonusChange = (e) => {
    setBonus({ ...bonus, [e.target.name]: e.target.checked });
  };

  const handleExemptedChange = (e) => {
    setExempted({ ...exempted, [e.target.name]: e.target.checked });
  };

  const handleCompetitionChange = (e) => {
    setCompetitionPoints(parseInt(e.target.value) || 0);
  };

  const calculatePoints = () => {
    if (error) return; // Nie liczymy punktów, jeśli jest błąd

    const examPoints =
      (exempted.polish ? 35 : examScores.polish * 0.35) +
      (exempted.math ? 35 : examScores.math * 0.35) +
      (exempted.foreignLang ? 30 : examScores.foreignLang * 0.3);

    const gradeToPoints = { "6": 18, "5": 17, "4": 14, "3": 8, "2": 2, "1": 0 };

    const gradesPoints =
      (gradeToPoints[grades.polish] || 0) +
      (gradeToPoints[grades.math] || 0) +
      (gradeToPoints[grades.extra1] || 0) +
      (gradeToPoints[grades.extra2] || 0);

    const bonusPoints = (bonus.volunteer ? 3 : 0) + (bonus.distinction ? 7 : 0) + competitionPoints;

    setResult(Math.min(200, examPoints + gradesPoints + bonusPoints));
  };

  return (
    <div className="flex justify-center p-10">
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>Kalkulator punktów rekrutacyjnych</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <h1 className="text-red-500 font-bold">{error}</h1>}
          
          <h3 className="font-medium">Egzamin ósmoklasisty</h3>
          {["polish", "math", "foreignLang"].map((subject) => (
            <div key={subject}>
              <label className="flex items-center space-x-2 mb-2">
                <input type="checkbox" name={subject} onChange={handleExemptedChange} />
                <span>Zwolniony z egzaminu ({subjectNames[subject]})</span>
              </label>
              {!exempted[subject] && (
                <input
                  type="number"
                  name={subject}
                  placeholder={`Wynik z ${subjectNames[subject]}`}
                  onChange={handleExamChange}
                  max="100"
                  className="block w-full p-2 border rounded mt-2"
                />
              )}
            </div>
          ))}

          <h3 className="font-medium">Świadectwo</h3>
          {["polish", "math", "extra1", "extra2"].map((subject) => (
            <input
              key={subject}
              type="number"
              name={subject}
              placeholder={`Ocena ${subjectNames[subject] || subject}`}
              onChange={handleGradeChange}
              max="6"
              className="block w-full p-2 border rounded mt-2"
            />
          ))}

          <h3 className="font-medium">Bonusy</h3>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="volunteer" onChange={handleBonusChange} />
            <span>Wolontariat (+3 pkt)</span>
          </label>
          <label className="flex items-center space-x-2 mt-2">
            <input type="checkbox" name="distinction" onChange={handleBonusChange} />
            <span>Świadectwo z wyróżnieniem (+7 pkt)</span>
          </label>

          <h3 className="font-medium">Konkursy</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Rodzaje konkursów</AccordionTrigger>
              <AccordionContent>
                Tutaj możesz dodać listę dostępnych konkursów i ich punktację.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter>
          <button
            onClick={calculatePoints}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          >
            Oblicz punkty
          </button>
          {result !== null && <h1 className="text-2xl font-bold text-center mt-4">Twoje punkty: {result}</h1>}
        </CardFooter>
      </Card>
    </div>
  );
}
