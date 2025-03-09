"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
  
  const [competitionPoints, setCompetitionPoints] = useState({
    competition1: 0,
    competition2: 0,
    competition3: 0,
    competition4: 0,
    competition5: 0,
  });
  

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const [totalCompetitionPoints, setTotalCompetitionPoints] = useState(0);

  const [examErrors, setExamErrors] = useState({});
const [gradeErrors, setGradeErrors] = useState({});


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
    const { name, value } = e.target;
    const numValue = parseInt(value) || 0;
  
    if (numValue < 1 || numValue > 6) {
      setGradeErrors((prev) => ({
        ...prev,
        [name]: `Ocena ${subjectNamesGrades[name] || name} musi być między 1 a 6!`
      }));
    } else {
      setGradeErrors((prev) => ({ ...prev, [name]: "" }));
      setGrades((prev) => ({ ...prev, [name]: numValue }));
    }
  };
  

  const handleBonusChange = (e) => {
    setBonus({ ...bonus, [e.target.name]: e.target.checked });
  };

  const handleExemptedChange = (e) => {
    setExempted({ ...exempted, [e.target.name]: e.target.checked });
  };

  const handleCompetitionChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    const name = e.target.name;
  
    setCompetitionPoints((prev) => {
      const updatedPoints = { ...prev, [name]: value };
      const total = Object.values(updatedPoints).reduce((sum, val) => sum + val, 0);
      setTotalCompetitionPoints(total); 
      return updatedPoints;
    });
  };
  

  useEffect(() => {
    calculatePoints();
  }, [examScores, grades, bonus, exempted, competitionPoints]); 

  


  const calculatePoints = () => {
    if (error) return;

    const examPoints =
      (exempted.polish ? 35 : examScores.polish * 0.35) + (exempted.math ? 35 : examScores.math * 0.35) + (exempted.foreignLang ? 30 : examScores.foreignLang * 0.3);

    const gradeToPoints = { 6: 18, 5: 17, 4: 14, 3: 8, 2: 2, 1: 0 };

    const gradesPoints =
      (gradeToPoints[grades.polish] || 0) + (gradeToPoints[grades.math] || 0) + (gradeToPoints[grades.extra1] || 0) + (gradeToPoints[grades.extra2] || 0);

    const bonusPoints = (bonus.volunteer ? 3 : 0) + (bonus.distinction ? 7 : 0) + totalCompetitionPoints;

    const totalPoints = examPoints + gradesPoints + bonusPoints;
    const scaledResult = Math.round(Math.min(200, totalPoints));
    setResult(scaledResult);
  };

  return (
    <div className="flex justify-center p-10 ">
      <Card className="w-[1000px] font-bold m-10 p-10 text-sm/8">
        <CardHeader>
          <CardTitle>
            <h1 className="font-bold text-4xl py-8">Kalkulator punktów rekrutacyjnych</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error && <h1 className="text-red-500 font-bold">{error}</h1>}

          <h3 className="font-bold text-2xl py-10">Egzamin ósmoklasisty</h3>
          {["polish", "math", "foreignLang"].map((subject) => (
            <div key={subject}>
              <h1 className="text-xl font-bold">
                {subject === "polish" && "Jezyk polski"}
                {subject === "math" && "Matematyka"}
                {subject === "foreignLang" && "Jezyk obcy"}
              </h1>

              {!exempted[subject] && (
                <input
                  type="number"
                  name={subject}
                  placeholder={`Wynik % z ${subjectNames[subject]}`}
                  onChange={handleExamChange}
                  max="100"
                  className="block w-full p-2 border-2 border-[#008cd8] rounded mt-2 bg-transparent"
                />
              )}
              <label className="flex items-center space-x-2 mb-2">
                <input type="checkbox" name={subject} onChange={handleExemptedChange} />
                <span>Zwolniony z egzaminu ({subjectNames[subject]})</span>
              </label>
            </div>
          ))}

          <h3 className="font-bold text-2xl py-10">Świadectwo</h3>
          
          {["polish", "math", "extra1", "extra2"].map((subject) => (
            
            <input
              key={subject}
              type="number"
              name={subject}
              placeholder={`Ocena ${subjectNamesGrades[subject] || subject}`}
              onChange={handleGradeChange}
              max="6"
              className="block w-full p-2 border-2 border-[#008cd8] rounded mt-2 bg-transparent"
            />
          ))}

          <h3 className="font-bold text-2xl py-10">Bonusy</h3>
          <label className="flex items-center cursor-pointer text-lg relative">
      <input
        type="checkbox"
        className="absolute opacity-0 w-0 h-0 peer"
        name="volunteer"
        onChange={handleBonusChange}
      />
      <span
        className="w-5 h-5 border-2 rounded-full transition-all duration-300 border-gray-400 peer-checked:border-[#008cd8] peer-checked:bg-[#fcf403] hover:bg-[#008cd8]"
      ></span>
      <span className="ml-2">Wolontariat (3pkt)</span>
    </label>
    <label className="flex items-center cursor-pointer text-lg relative">
      <input
        type="checkbox"
        className="absolute opacity-0 w-0 h-0 peer"
        name="distinction"
        onChange={handleBonusChange}
      />
      <span
        className="w-5 h-5 border-2 rounded-full transition-all duration-300 border-gray-400 peer-checked:border-[#008cd8] peer-checked:bg-[#fcf403] hover:bg-blue-[#008cd8]"
      ></span>
      <span className="ml-2">Wolontariat (7pkt)</span>
    </label>

          <h3 className="font-bold text-2xl"></h3>
          <Accordion type="single" collapsible className="w-full font-bold">
            <AccordionItem value="competitions">
              <AccordionTrigger className="font-bold text-2xl py-10">Konkursy</AccordionTrigger>
              <AccordionContent>
                <div className="mb-4 leading-7">
                  <h4 className="font-bold text-xl">Uzyskanie w zawodach wiedzy będących konkursem o zasięgu ponadwojewódzkim:</h4>
                  {[
                    { label: " brak (0 pkt)", value: 0 },
                    { label: " tytuł finalisty konkursu przedmiotowego (10 pkt)", value: 10 },
                    { label: " tytuł laureata konkursu tematycznego lub interdyscyplinarnego (7 pkt)", value: 7 },
                    { label: " tytuł finalisty konkursu tematycznego lub interdyscyplinarnego (5 pkt)", value: 5 },
                  ].map((option, index) => (
                    <label key={`competition1-${index}`} className="block">
                      <input type="radio" name="competition1" value={option.value} onChange={handleCompetitionChange} defaultChecked={option.value === 0}  className="w-3 h-3 border-2 border-gray-300 rounded-full cursor-pointer peer appearance-none checked:bg-[#fcf403] checked:border-[#008cd8] transition-colors hover:bg-[#008cd8] " />
                      {option.label}
                    </label>
                  ))}
                </div>

                <div className="mb-4 leading-7">
                  <h4 className="font-bold text-xl">Uzyskanie w zawodach wiedzy będących konkursem o zasięgu międzynarodowym lub ogólnopolskim:</h4>
                  {[
                    { label: " brak (0 pkt)", value: 0 },
                    { label: " tytuł finalisty konkursu przedmiotowego lub artystycznego (10 pkt)", value: 10 },
                    { label: " tytuł laureata turnieju artystycznego (4 pkt)", value: 4 },
                    { label: " tytuł finalisty turnieju artystycznego (3 pkt)", value: 3 },
                  ].map((option, index) => (
                    <label key={`competition2-${index}`} className="block">
                      <input type="radio" name="competition2" value={option.value} onChange={handleCompetitionChange} defaultChecked={option.value === 0} className="w-3 h-3 border-2 border-gray-300 rounded-full cursor-pointer peer appearance-none checked:bg-[#fcf403] checked:border-[#008cd8] transition-colors hover:bg-[#008cd8]" />
                      {option.label}
                    </label>
                  ))}
                </div>

                <div className="mb-4 leading-7">
                  <h4 className="font-bold text-xl">Uzyskanie w zawodach wiedzy będących konkursem o zasięgu wojewódzkim:</h4>
                  {[
                    { label: " brak (0 pkt)", value: 0 },
                    { label: " dwóch lub więcej tytułów finalisty konkursu przedmiotowego (10 pkt)", value: 10 },
                    { label: " dwóch lub więcej tytułów laureata konkursu interdyscyplinarnego (7 pkt)", value: 7 },
                    { label: " dwóch lub więcej tytułów finalisty konkursu interdyscyplinarnego (5 pkt)", value: 5 },
                    { label: " tytuł finalisty konkursu przedmiotowego (7 pkt)", value: 7 },
                    { label: " tytuł laureata konkursu interdyscyplinarnego (5 pkt)", value: 5 },
                    { label: " tytuł finalisty konkursu interdyscyplinarnego (3 pkt)", value: 3 },
                  ].map((option, index) => (
                    <label key={`competition3-${index}`} className="block">
                      <input type="radio" name="competition3" value={option.value} onChange={handleCompetitionChange} defaultChecked={option.value === 0} className="w-3 h-3 border-2 border-gray-300 rounded-full cursor-pointer peer appearance-none checked:bg-[#fcf403] checked:border-[#008cd8] transition-colors hover:bg-[#008cd8] " />
                      {option.label}
                    </label>
                  ))}
                </div>

                <div className="mb-4 leading-7">
                  <h4 className="font-bold text-xl">Uzyskanie w zawodach wiedzy będących konkursem albo turniejem, o zasięgu ponadwojewódzkim lub wojewódzkim:</h4>
                  {[
                    { label: " brak (0 pkt)", value: 0 },
                    { label: " dwóch lub więcej tytułów finalisty konkursu przedmiotowego (10 pkt)", value: 10 },
                    { label: " dwóch lub więcej tytułów laureata konkursu tematycznego lub interdyscyplinarnego (7 pkt)", value: 7 },
                    { label: " dwóch lub więcej tytułów finalisty konkursu tematycznego lub interdyscyplinarnego (5 pkt)", value: 5 },
                    { label: " tytułu finalisty konkursu przedmiotowego (7 pkt)", value: 7 },
                    { label: " tytułu laureata konkursu tematycznego lub interdyscyplinarnego (3 pkt)", value: 3 },
                    { label: " tytułu finalisty konkursu tematycznego lub interdyscyplinarnego (2 pkt)", value: 2 },
                  ].map((option, index) => (
                    <label key={`competition4-${index}`} className="block">
                      <input type="radio" name="competition4" value={option.value} onChange={handleCompetitionChange} defaultChecked={option.value === 0} className="w-3 h-3 border-2 border-gray-300 rounded-full cursor-pointer peer appearance-none checked:bg-[#fcf403] checked:border-[#008cd8] transition-colors hover:bg-[#008cd8]"/>
                      {option.label}
                    </label>
                  ))}
                </div>

                <div>
                  <h4 className="font-bold text-xl">
                    Uzyskanie wysokiego miejsca w zawodach wiedzy innych niż wymienione w pkt 1–4, artystycznych lub sportowych, organizowanych przez kuratora oświaty lub
                    inne podmioty działające na terenie szkoły, na szczeblu:
                  </h4>
                  {[
                    { label: " brak (0 pkt)", value: 0 },
                    { label: " międzynarodowym (4 pkt)", value: 4 },
                    { label: " krajowym (3 pkt)", value: 3 },
                    { label: " wojewódzkim (2 pkt)", value: 2 },
                    { label: " powiatowym (1 pkt)", value: 1 },
                  ].map((option, index) => (
                    <label key={`competition5-${index}`} className="block">
                      <input type="radio" name="competition5" value={option.value} onChange={handleCompetitionChange} defaultChecked={option.value === 0} className="w-3 h-3 border-2 border-gray-300 rounded-full cursor-pointer peer appearance-none checked:bg-[#fcf403] checked:border-[#008cd8] transition-colors hover:bg-[#008cd8] "/>
                      {option.label}
                    </label>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter>
          <div className="flex justify-center items-center py-10">
            <h1 className="text-2xl font-bold text-center mr-4">Twój wynik</h1>
            {result !== null && (
              <div className="bg-blue p-4 rounded-lg shadow-lg border border-gray">
                <p className="text-center ">{result}/200</p>
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
