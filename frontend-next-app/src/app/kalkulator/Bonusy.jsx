import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function Bonusy({ bonus, setBonus }) {
  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-bold text-2xl">Bonusy</AccordionTrigger>
          <AccordionContent>
            {[
              { name: "volunteer", label: "Wolontariat (3pkt)" },
              { name: "distinction", label: "Wyróżnienie (7pkt)" }
            ].map(({ name, label }) => (
              <label key={name} className="flex items-center cursor-pointer text-lg relative">
                <input
                  className="cursor-pointer"
                  type="checkbox"
                  name={name}
                  checked={bonus[name] || false}  
                  onChange={(e) =>
                    setBonus({ ...bonus, [name]: e.target.checked })
                  }
                />
                <span className="ml-2">{label}</span>
              </label>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
