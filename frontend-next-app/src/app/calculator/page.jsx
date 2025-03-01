"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
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

  const handleExamChange = (e) => {
    setExamScores({ ...examScores, [e.target.name]: e.target.value });
  };

  const handleGradeChange = (e) => {
    setGrades({ ...grades, [e.target.name]: e.target.value });
  };

  const handleBonusChange = (e) => {
    setBonus({ ...bonus, [e.target.name]: e.target.checked });
  };

  const handleExemptedChange = (e) => {
    setExempted({ ...exempted, [e.target.name]: e.target.checked });
  };

  const handleCompetitionChange = (e) => {
    setCompetitionPoints(parseInt(e.target.value));
  };

  const calculatePoints = () => {
    const examPoints =
      (exempted.polish ? 35 : (parseFloat(examScores.polish) || 0) * 0.35) +
      (exempted.math ? 35 : (parseFloat(examScores.math) || 0) * 0.35) +
      (exempted.foreignLang ? 30 : (parseFloat(examScores.foreignLang) || 0) * 0.3);

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
          <h3 className="font-medium">Egzamin ósmoklasisty</h3>
          {['polish', 'math', 'foreignLang'].map((subject) => (
            <div key={subject}>
              <label className="flex items-center space-x-2 mb-2">
                <input type="checkbox" name={subject} onChange={handleExemptedChange} />
                <span>Zwolniony z egzaminu ({subject})</span>
              </label>
              {!exempted[subject] && (
                <input
                  type="number"
                  name={subject}
                  placeholder={`Wynik z ${subject}`}
                  onChange={handleExamChange}
                  max="100"
                  className="block w-full p-2 border rounded mt-2"
                />
              )}
            </div>
          ))}

          <h3 className="font-medium">Świadectwo</h3>
          {['polish', 'math', 'extra1', 'extra2'].map((subject) => (
            <input
              key={subject}
              type="number"
              name={subject}
              placeholder={`Ocena ${subject}`}
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
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
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
          {result !== null && (
            <h1 className="text-2xl font-bold text-center mt-4">Twoje punkty: {result}</h1>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}