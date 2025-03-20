import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function Bonusy({ bonus, setBonus }) {
  return (
    <div className="w-full p-4 sm:p-6">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-bold text-xl sm:text-2xl mb-2">Bonusy</AccordionTrigger>
          <AccordionContent>
            {[
              { name: "volunteer", label: "Wolontariat (3pkt)" },
              { name: "distinction", label: "Wyróżnienie (7pkt)" }
            ].map(({ name, label }) => (
              <label key={name} className="flex items-center cursor-pointer text-base sm:text-lg relative py-2">
                <input
                  className="cursor-pointer w-4 h-4 sm:w-5 sm:h-5"
                  type="checkbox"
                  name={name}
                  checked={bonus[name] || false}
                  onChange={(e) => setBonus({ ...bonus, [name]: e.target.checked })}
                />
                <span className="ml-2 sm:ml-4">{label}</span>
              </label>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
