"use client";

import { useState } from "react";
import { BookOpen, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function FAQSection({ faqs }) {
  const [openFaq, setOpenFaq] = useState(null);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className=" rounded-2xl p-6 border  ">
      <h3 className="text-base font-semibold  mb-5 flex items-center gap-2">
        <BookOpen className="w-5 h-5 " />
        Najczęściej zadawane pytania
      </h3>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={cn("rounded-xl  overflow-hidden transition-all border")}
          >
            <button
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <span className="text-sm font-medium ">{faq.question}</span>
              <ChevronDown
                className={cn(
                  "w-5 h-5  transition-transform flex-shrink-0 ml-4",
                  openFaq === index && "rotate-180 text-[var(--main-mmz-blue)]",
                )}
              />
            </button>
            {openFaq === index && (
              <div className="px-4 pb-4 text-sm  leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
