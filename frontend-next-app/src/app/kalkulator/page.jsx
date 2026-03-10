"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import E8 from "./E8";
import Swiadectwo from "./Swiadectwo";
import Konkursy from "./Konkursy";
import Bonusy from "./Bonusy";
import Wynik from "./Wyniki";

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
  const [bonus, setBonus] = useState({ volunteer: false, distinction: false });
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

  useEffect(() => {
    calculatePoints();
  }, [examScores, grades, bonus, exempted, competitionPoints]);

  const calculatePoints = () => {
    if (error) return;

    const gradePointsMap = { 1: 0, 2: 10, 3: 15, 4: 25, 5: 30, 6: 35 };

    const examPoints =
      (exempted.polish
        ? gradePointsMap[examScores.polish] || 0
        : examScores.polish * 0.35) +
      (exempted.math
        ? gradePointsMap[examScores.math] || 0
        : examScores.math * 0.35) +
      (exempted.foreignLang
        ? gradePointsMap[examScores.foreignLang] || 0
        : examScores.foreignLang * 0.3);

    const gradeToPoints = { 6: 18, 5: 17, 4: 14, 3: 8, 2: 2, 1: 0 };
    const gradesPoints =
      (gradeToPoints[grades.polish] || 0) +
      (gradeToPoints[grades.math] || 0) +
      (gradeToPoints[grades.extra1] || 0) +
      (gradeToPoints[grades.extra2] || 0);

    const bonusPoints =
      (bonus.volunteer ? 3 : 0) +
      (bonus.distinction ? 7 : 0) +
      totalCompetitionPoints;

    console.log(
      `Exam Points: ${examPoints}, Grades Points: ${gradesPoints}, Bonus Points: ${bonusPoints}`,
    );
    setResult(
      Math.round(Math.min(200, examPoints + gradesPoints + bonusPoints)),
    );
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center p-6">
        <Card className="xl:w-1/2 sm:w-2/3 font-bold m-4 sm:m-4 sm:p-4 text-sm sm:text-base bg-transparent">
          <CardHeader>
            <CardTitle>
              <h1 className="text-2xl sm:text-4xl font-bold py-4 sm:py-8 p-5">
                Kalkulator punktów rekrutacyjnych
              </h1>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error && <h1 className="text-red-500 font-bold">{error}</h1>}
            <E8
              examScores={examScores}
              setExamScores={setExamScores}
              exempted={exempted}
              setExempted={setExempted}
              setError={setError}
            />
            <Swiadectwo grades={grades} setGrades={setGrades} />
            <Bonusy bonus={bonus} setBonus={setBonus} />
            <Konkursy
              competitionPoints={competitionPoints}
              setCompetitionPoints={setCompetitionPoints}
              setTotalCompetitionPoints={setTotalCompetitionPoints}
            />
          </CardContent>
          <CardFooter>
            <p className="text-xs sm:text-sm p-5">
              Kalkulator ósmoklasisty spełnia jedynie rolę informacyjną, nie
              może być stosowany do wyliczeń w procesie rekrutacji do szkół.
              Kalkulator nie gwarantuje poprawności wyników oraz nie ponosi
              odpowiedzialności za użycie kalkulatora.
            </p>
          </CardFooter>
        </Card>
      </div>

      <div className="bg-card sticky bottom-0">
        <Wynik result={result} />
      </div>
    </>
  );
}
