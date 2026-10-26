import { FileCheck2, MapPinned, MessagesSquare, ShieldCheck } from "lucide-react";
import { useGsapAnimation } from "@/lib/animations";

const BENEFITS = [
  {
    icon: MapPinned,
    title: "One itinerary, every detail",
    text: "Visas, flights, stays and transport planned together, so each booking fits the rest of the journey.",
  },
  {
    icon: FileCheck2,
    title: "Paperwork handled early",
    text: "Requirements for your destination checked before you book anything, with documents reviewed before submission.",
  },
  {
    icon: MessagesSquare,
    title: "One direct contact",
    text: "Reach the same person who planned your trip on WhatsApp — before departure and while you travel.",
  },
  {
    icon: ShieldCheck,
    title: "Clear before you commit",
    text: "Fare rules, rate conditions and what's included are explained up front — you approve every option before it's booked.",
  },
] as const;

export function WhyChooseUs() {
  const rootRef = useGsapAnimation<HTMLElement>(({ gsap }) => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        ".benefit-row",
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".benefit-list", start: "top 75%" },
        },
      );
      gsap.fromTo(
        ".benefit-head",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".why-root", start: "top 70%" },
        },
      );
    });
  });

  return (
    <section
      id="why-us"
      ref={rootRef as React.RefObject<HTMLElement>}
      className="why-root bg-background py-24 sm:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div className="benefit-head lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow text-primary">Why travel with us</p>
          <h2 className="mt-4 font-display text-4xl leading-tight font-light text-foreground sm:text-5xl">
            The difference is in how it's arranged
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            We're a small team that treats your trip like a single, connected
            piece of work — not a pile of separate bookings.
          </p>
        </div>

        <ul className="benefit-list">
          {BENEFITS.map((benefit) => (
            <li
              key={benefit.title}
              className="benefit-row flex gap-6 border-t border-border py-9 first:border-t-0 first:pt-0 sm:gap-8"
            >
              <span className="mt-1 flex size-11 shrink-0 items-center justify-center rounded-full border border-primary/30 text-primary">
                <benefit.icon className="size-5" aria-hidden />
              </span>
              <div>
                <h3 className="font-display text-xl font-medium text-foreground sm:text-2xl">
                  {benefit.title}
                </h3>
                <p className="mt-2.5 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {benefit.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
