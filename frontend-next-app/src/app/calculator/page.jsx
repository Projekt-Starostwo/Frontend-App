"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState, useEffect } from "react";

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

  const subjectNamesGrades = {
    polish: "z języka polskiego",
    math: "z matematyki",
    extra1: "z dodatkowego przedmiotu",
    extra2: "z dodatkowego przedmiotu",
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

  useEffect(() => {
    calculatePoints();
  }, [examScores, grades, bonus, exempted, competitionPoints]); // Automatyczna aktualizacja przy zmianie wartości
  
  const calculatePoints = () => {
    if (error) return;

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
      <Card className="w-[1000px] font-bold m-10 p-10 text-sm/8">
        <CardHeader>
          <CardTitle><h1 className='font-bold text-4xl'>Kalkulator punktów rekrutacyjnych</h1></CardTitle>
        </CardHeader>
        <CardContent>
          {error && <h1 className="text-red-500 font-bold">{error}</h1>}
          
          <h3 className="font-bold text-2xl">Egzamin ósmoklasisty</h3>
          {["polish", "math", "foreignLang"].map((subject) => (
            <div key={subject}>
              
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
              <label className="flex items-center space-x-2 mb-2">
                <input type="checkbox" name={subject} onChange={handleExemptedChange} />
                <span>Zwolniony z egzaminu ({subjectNames[subject]})</span>
              </label>
            </div>
          ))}

          <h3 className="font-bold text-2xl">Świadectwo</h3>
          {["polish", "math", "extra1", "extra2"].map((subject) => (
            <input
              key={subject}
              type="number"
              name={subject}
              placeholder={`Ocena ${subjectNamesGrades[subject] || subject}`}
              onChange={handleGradeChange}
              max="6"
              className="block w-full p-2 border rounded mt-2"
            />
          ))}

          <h3 className="font-bold text-2xl">Bonusy</h3>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="volunteer" onChange={handleBonusChange} />
            <span>Wolontariat (+3 pkt)</span>
          </label>
          <label className="flex items-center space-x-2 mt-2">
            <input type="checkbox" name="distinction" onChange={handleBonusChange} />
            <span>Świadectwo z wyróżnieniem (+7 pkt)</span>
          </label>

          <h3 className="font-bold">Konkursy</h3>
<Accordion type="single" collapsible className="w-full font-bold">
  <AccordionItem value="item-1">
    <AccordionTrigger className="font-bold">
      Uzyskanie w zawodach wiedzy będących konkursem o zasięgu ponadwojewódzkim
    </AccordionTrigger>
    <AccordionContent>
      {[
        { label: " brak (0 pkt)", value: 0 },
        { label: " tytuł finalisty konkursu przedmiotowego (10 pkt)", value: 10 },
        { label: " tytuł laureata konkursu tematycznego lub interdyscyplinarnego (7 pkt)", value: 7 },
        { label: " tytuł finalisty konkursu tematycznego lub interdyscyplinarnego (5 pkt)", value: 5 },
      ].map((option) => (
        <label key={option.value} className="block">
          <input type="radio" name="competition1" value={option.value} onChange={handleCompetitionChange} />
          {option.label}
        </label>
      ))}
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
    <AccordionTrigger className="font-bold">
      Uzyskanie w zawodach wiedzy będących konkursem o zasięgu międzynarodowym lub ogólnopolskim
    </AccordionTrigger>
    <AccordionContent>
      {[
        { label: " brak (0 pkt)", value: 0 },
        { label: " tytuł finalisty konkursu przedmiotowego lub artystycznego (10 pkt)", value: 10 },
        { label: " tytuł laureata turnieju artystycznego (4 pkt)", value: 4 },
        { label: " tytuł finalisty turnieju artystycznego (3 pkt)", value: 3 },
      ].map((option) => (
        <label key={option.value} className="block">
          <input type="radio" name="competition2" value={option.value} onChange={handleCompetitionChange} />
          {option.label}
        </label>
      ))}
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-3">
    <AccordionTrigger className="font-bold">
      Uzyskanie w zawodach wiedzy będących konkursem o zasięgu wojewódzkim
    </AccordionTrigger>
    <AccordionContent>
      {[
        { label: " brak (0 pkt)", value: 0 },
        { label: " dwóch lub więcej tytułów finalisty konkursu przedmiotowego (10 pkt)", value: 10 },
        { label: " dwóch lub więcej tytułów laureata konkursu interdyscyplinarnego (7 pkt)", value: 7 },
        { label: " dwóch lub więcej tytułów finalisty konkursu interdyscyplinarnego (5 pkt)", value: 5 },
        { label: " tytuł finalisty konkursu przedmiotowego (7 pkt)", value: 7 },
        { label: " tytuł laureata konkursu interdyscyplinarnego (5 pkt)", value: 5 },
        { label: " tytuł finalisty konkursu interdyscyplinarnego (3 pkt)", value: 3 },
      ].map((option, index) => (
        <label key={`${option.value}-${index}`} className="block">
          <input type="radio" name="competition3" value={option.value} onChange={handleCompetitionChange} />
          {option.label}
        </label>
      ))}
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-4">
    <AccordionTrigger className="font-bold">
    Uzyskanie w zawodach wiedzy będących konkursem albo turniejem, o zasięgu ponadwojewódzkim lub wojewódzkim:
    </AccordionTrigger>
    <AccordionContent>
      {[
        { label: " brak (0 pkt)", value: 0 },
        { label: " dwóch lub więcej tytułów finalisty konkursu przedmiotowego (10 pkt)", value: 10 },
        { label: " dwóch lub więcej tytułów laureata konkursu tematycznego lub interdyscyplinarnego (7 pkt)", value: 7 },
        { label: " dwóch lub więcej tytułów finalisty konkursu tematycznego lub interdyscyplinarnego (5 pkt)", value: 5 },
        { label: " tytułu finalisty konkursu przedmiotowego (7 pkt)", value: 7 },
        { label: " tytułu laureata konkursu tematycznego lub interdyscyplinarnego (3 pkt)", value: 3 },
        { label: " tytułu finalisty konkursu tematycznego lub interdyscyplinarnego (2 pkt)", value: 2 }
      ].map((option, index) => (
        <label key={`${option.value}-${index}`} className="block">
          <input type="radio" name="competition4" value={option.value} onChange={handleCompetitionChange} />
          {option.label}
        </label>
      ))}
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-5">
    <AccordionTrigger className="font-bold">
    Uzyskanie wysokiego miejsca w zawodach wiedzy innych niż wymienione w pkt 1–4, artystycznych lub sportowych, organizowanych przez kuratora oświaty lub inne podmioty działające na terenie szkoły, na szczeblu:
    </AccordionTrigger>
    <AccordionContent>
      {[
        { label: " brak (0 pkt)", value: 0 },
        { label: " międzynarodowym (4 pkt)", value: 4 },
        { label: " krajowym (3 pkt)", value: 3 },
        { label: " wojewódzkim (2 pkt)", value: 2 },
        { label: " powiatowym (1 pkt)", value: 1 },
      ].map((option, ) => (
        <label key={option.value} className="block">
          <input type="radio" name="competition5" value={option.value} onChange={handleCompetitionChange} />
          {option.label}
        </label>
      ))}
    </AccordionContent>
  </AccordionItem>

</Accordion>


        </CardContent>
        <CardFooter>
          <div className='flex flex-col'>

          <button
            onClick={calculatePoints}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          >
            Oblicz punkty
          </button>
          
          {result !== null && <h1 className="text-2xl font-bold text-center mt-4">Twoje punkty: {result}</h1>}

          </div>
          
        </CardFooter>
      </Card>
    </div>
  );
}
