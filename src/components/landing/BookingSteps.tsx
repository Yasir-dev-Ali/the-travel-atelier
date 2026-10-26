import { useGsapAnimation } from "@/hooks/use-gsap-animation";

const STEPS = [
  {
    number: "01",
    title: "Share your plans",
    text: "Tell us where you're going, when, and what matters most — through the inquiry form or a quick WhatsApp message.",
  },
  {
    number: "02",
    title: "Review your options",
    text: "We prepare visa requirements, flight options, stays and transport, and walk you through everything before you confirm.",
  },
  {
    number: "03",
    title: "Travel, looked after",
    text: "Your documents, tickets and bookings arrive in one place — with a direct contact on WhatsApp if anything changes.",
  },
] as const;

export function BookingSteps() {
  const rootRef = useGsapAnimation<HTMLElement>(({ gsap }) => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        ".step-item",
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".steps-grid", start: "top 75%" },
        },
      );
    });
  });

  return (
    <section
      id="process"
      ref={rootRef as React.RefObject<HTMLElement>}
      className="bg-secondary py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow text-primary">How it works</p>
          <h2 className="mt-4 font-display text-4xl leading-tight font-light text-foreground sm:text-5xl">
            Three steps from idea to itinerary
          </h2>
        </div>

        <div className="steps-grid mt-16 grid gap-10 lg:mt-20 lg:grid-cols-3 lg:gap-14">
          {STEPS.map((step) => (
            <div key={step.number} className="step-item border-t border-foreground/20 pt-8">
              <p className="font-display text-5xl font-light text-primary">{step.number}</p>
              <h3 className="mt-5 font-display text-2xl font-medium text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
