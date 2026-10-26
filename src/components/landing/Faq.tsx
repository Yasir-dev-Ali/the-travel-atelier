import { useState } from "react";
import { Plus } from "lucide-react";
import { useGsapAnimation } from "@/hooks/use-gsap-animation";

const FAQS = [
  {
    question: "How does visa assistance work?",
    answer:
      "We start by confirming the exact requirements for your nationality and destination, then help you gather and review every document before submission. Where appointments are needed, we guide you through booking them, and we stay reachable until a decision arrives.",
  },
  {
    question: "Can you book flights, hotels and car rental together?",
    answer:
      "Yes — that's the point of planning with one team. Your flights, stays and ground transport are arranged as a single itinerary, so arrival times, check-ins and pick-ups all line up.",
  },
  {
    question: "What happens if my plans change?",
    answer:
      "Before you confirm anything, we explain the fare rules and rate conditions that apply to each option, including what can be changed and at what cost. If plans shift later, message us on WhatsApp and we'll rework the itinerary.",
  },
  {
    question: "Does an inquiry cost anything?",
    answer:
      "No. You tell us about your trip, we come back with options and clear explanations, and you decide what to approve before anything is booked or paid for.",
  },
  {
    question: "How far in advance should I start planning?",
    answer:
      "The moment your dates are roughly firm. Visa appointments and peak-season stays fill up early, so the more lead time we have, the more options you'll have to choose from.",
  },
] as const;

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const rootRef = useGsapAnimation<HTMLElement>(({ gsap }) => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        ".faq-item",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".faq-list", start: "top 78%" },
        },
      );
    });
  });

  return (
    <section
      id="faq"
      ref={rootRef as React.RefObject<HTMLElement>}
      className="bg-background py-24 sm:py-32"
    >
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="text-center">
          <p className="eyebrow text-primary">Questions</p>
          <h2 className="mt-4 font-display text-4xl leading-tight font-light text-foreground sm:text-5xl">
            Before you ask
          </h2>
        </div>

        <div className="faq-list mt-14">
          {FAQS.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div key={faq.question} className="faq-item border-t border-border">
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`faq-panel-${index}`}
                    id={`faq-button-${index}`}
                    onClick={() => setOpenIndex(open ? null : index)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-lg font-medium text-foreground sm:text-xl">
                      {faq.question}
                    </span>
                    <Plus
                      className={`size-5 shrink-0 text-primary transition-transform duration-300 ${
                        open ? "rotate-45" : ""
                      }`}
                      aria-hidden
                    />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-button-${index}`}
                  className={`grid transition-[grid-template-rows] duration-400 ease-out ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-7 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
}
