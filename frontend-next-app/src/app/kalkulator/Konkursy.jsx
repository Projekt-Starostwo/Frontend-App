import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { useState, useEffect } from "react";

const Konkursy = ({ competitionPoints, setCompetitionPoints, setTotalCompetitionPoints }) => {
  const handleCompetitionChange = (event) => {
    const { name, value } = event.target;
    setCompetitionPoints((prevPoints) => {
      const updatedPoints = {
        ...prevPoints,
        [name]: parseInt(value, 10),
      };

      
      const totalPoints = Object.values(updatedPoints ).reduce((sum, points) => sum + points, 0);
      setTotalCompetitionPoints(Math.min(totalPoints, 18)); 

      return updatedPoints;
    });
  };

  return (

    <div className="w-full p-4 sm:p-6">
<Accordion type="single" collapsible className="w-full">
      <AccordionItem value="competitions">
        <AccordionTrigger className="font-bold text-xl sm:text-2xl mb-2">Konkursy</AccordionTrigger>
        <AccordionContent>
          <p className="font-normal mb-6">Maksymalna ilość uzyskanych punktów z konkursów to 18pkt.*</p>
          {/* Konkursy ponadwojewódzkie */}
          <div className="mb-6 leading-7">
            <h4 className="font-bold text-[15px] sm:text-xl">
              Uzyskanie w zawodach wiedzy będących konkursem o zasięgu ponadwojewódzkim organizowanym przez kuratorów oświaty na podstawie zawartych porozumień:
            </h4>
            {[
              { label: " Brak (0 pkt)", value: 0 },
              { label: " Tytuł finalisty konkursu przedmiotowego (10 pkt)", value: 10 },
              { label: " Tytuł laureata konkursu tematycznego lub interdyscyplinarnego (7 pkt)", value: 7 },
              { label: " Tytuł finalisty konkursu tematycznego lub interdyscyplinarnego (5 pkt)", value: 5 },
            ].map((option, index) => (
              <label key={`competition1-${index}`} className="block font-normal">
                <input
                  type="radio"
                  name="competition1"
                  value={option.value}
                  onChange={handleCompetitionChange}
                  checked={competitionPoints["competition1"] === option.value}
                  className="w-3 h-3 border-2 border-gray-300 rounded-full cursor-pointer peer appearance-none checked:bg-[#fcf403]  transition-colors hover:bg-[#008cd8]"
                />
                {option.label}
              </label>
            ))}
          </div>

          {/* Konkursy międzynarodowe i ogólnopolskie */}
          <div className="mb-6 leading-7">
            <h4 className="font-bold text-[15px] sm:text-xl">
              Uzyskanie w zawodach wiedzy będących konkursem o zasięgu międzynarodowym lub ogólnopolskim albo turniejem o zasięgu ogólnopolskim:
            </h4>
            {[
              { label: " Brak (0 pkt)", value: 0 },
              {
                label: " Tytułu finalisty konkursu z przedmiotu lub przedmiotów artystycznych objętych ramowym planem nauczania szkoły artystycznej (10 pkt)",
                value: 10,
              },
              {
                label: " Tytułu laureata turnieju z przedmiotu lub przedmiotów artystycznych nieobjętych ramowym planem nauczania szkoły artystycznej (4 pkt)",
                value: 4,
              },
              {
                label: " Tytułu finalisty turnieju z przedmiotu lub przedmiotów artystycznych nieobjętych ramowym planem nauczania szkoły artystycznej (3 pkt)",
                value: 3,
              },
            ].map((option, index) => (
              <label key={`competition2-${index}`} className="block font-normal">
                <input
                  type="radio"
                  name="competition2"
                  value={option.value}
                  onChange={handleCompetitionChange}
                  checked={competitionPoints["competition2"] === option.value}
                  className="w-3 h-3 border-2 border-gray-300 rounded-full cursor-pointer peer appearance-none checked:bg-[#fcf403]  transition-colors hover:bg-[#008cd8]"
                />
                {option.label}
              </label>
            ))}
          </div>

          {/* Konkursy krajowe */}
          <div className="mb-6 leading-7">
            <h4 className="font-bold text-[15px] sm:text-xl">Uzyskanie w zawodach wiedzy będących konkursem o zasięgu wojewódzkim organizowanym przez kuratora oświaty:</h4>
            {[
              { label: " Brak (0 pkt)", value: 0 },
              { label: " Dwóch lub więcej tytułów finalisty konkursu przedmiotowego (10 pkt)", value: 10 },
              { label: " Dwóch lub więcej tytułów laureata konkursu tematycznego lub interdyscyplinarnego (7 pkt)", value: 7 },
              { label: " Dwóch lub więcej tytułów finalisty konkursu tematycznego interdyscyplinarnego (5 pkt)", value: 5 },
              { label: " Tytuł finalisty konkursu przedmiotowego (7 pkt)", value: 7 },
              { label: " Tytuł laureata konkursu tematycznego interdyscyplinarnego (5 pkt)", value: 5 },
              { label: " Tytuł finalisty konkursu tematycznego lub interdyscyplinarnego (3 pkt)", value: 3 },
            ].map((option, index) => (
              <label key={`competition3-${index}`} className="block font-normal">
                <input
                  type="radio"
                  name="competition3"
                  value={option.value}
                  onChange={handleCompetitionChange}
                  checked={competitionPoints["competition3"] === option.value}
                  className="w-3 h-3 border-2 border-gray-300 rounded-full cursor-pointer peer appearance-none checked:bg-[#fcf403]  transition-colors hover:bg-[#008cd8]"
                />
                {option.label}
              </label>
            ))}
          </div>

          {/* Konkursy regionalne */}
          <div className="mb-6 leading-7">
            <h4 className="font-bold text-[15px] sm:text-xl">Uzyskanie w zawodach wiedzy będących konkursem albo turniejem, o zasięgu ponadwojewódzkim lub wojewódzkim:</h4>
            {[
              { label: " Brak (0 pkt)", value: 0 },
              { label: " Dwóch lub więcej tytułów finalisty konkursu przedmiotowego (10 pkt)", value: 10 },
              { label: " Dwóch lub więcej tytułów laureata konkursu tematycznego lub interdyscyplinarnego (7 pkt)", value: 7 },
              { label: " Dwóch lub więcej tytułów finalisty konkursu tematycznego lub interdyscyplinarnego (5 pkt)", value: 5 },
              { label: " Tytułu finalisty konkursu przedmiotowego (7 pkt)", value: 7 },
              { label: " Tytułu laureata konkursu tematycznego lub interdyscyplinarnego (3 pkt)", value: 3 },
              { label: " Tytułu finalisty konkursu tematycznego lub interdyscyplinarnego (2 pkt)", value: 2 },
            ].map((option, index) => (
              <label key={`competition4-${index}`} className="block font-normal">
                <input
                  type="radio"
                  name="competition4"
                  value={option.value}
                  onChange={handleCompetitionChange}
                  checked={competitionPoints["competition4"] === option.value}
                  className="w-3 h-3 border-2 border-gray-300 rounded-full cursor-pointer peer appearance-none checked:bg-[#fcf403]  transition-colors hover:bg-[#008cd8]"
                />
                {option.label}
              </label>
            ))}
          </div>

          <div className="mb-6 leading-7">
            <h4 className="font-bold text-[15px] sm:text-xl">
              Uzyskanie wysokiego miejsca w zawodach wiedzy innych niż wymienione w pkt 1–4, artystycznych lub sportowych, organizowanych przez kuratora oświaty lub inne
              podmioty działające na terenie szkoły, na szczeblu:
            </h4>
          
            {[
              { label: " Brak (0 pkt)", value: 0 },
              { label: " Międzynarodowym (4 pkt)", value: 4 },
              { label: " Krajowym (3 pkt)", value: 3 },
              { label: " Wojewódzkim (2 pkt)", value: 2 },
              { label: " Powiatowym (1 pkt)", value: 1 },
            ].map((option, index) => (
              <label key={`competition5-${index}`} className="block font-normal">
                <input
                  type="radio"
                  name="competition5"
                  value={option.value}
                  onChange={handleCompetitionChange}
                  checked={competitionPoints["competition5"] === option.value}
                  className="w-3 h-3 border-2 border-gray-300 rounded-full cursor-pointer peer appearance-none checked:bg-[#fcf403]  transition-colors hover:bg-[#008cd8]"
                />
                {option.label}
              </label>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>

    </div>
    
  );
};

export default Konkursy;
