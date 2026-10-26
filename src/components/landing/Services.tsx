import { ArrowRight } from "lucide-react";

import visaImage from "@/assets/service-visa.jpg";
import flightsImage from "@/assets/service-flights.jpg";
import hotelsImage from "@/assets/service-hotels.jpg";
import carImage from "@/assets/service-car.jpg";
import { useGsapAnimation } from "@/lib/animations";

const SERVICES = [
  {
    number: "01",
    title: "Visa Assistance",
    image: visaImage,
    alt: "Passport with entry stamps and travel documents on a navy desk",
    description:
      "Document checks, appointment guidance and application support — prepared thoroughly, submitted confidently.",
  },
  {
    number: "02",
    title: "Flight Booking",
    image: flightsImage,
    alt: "View of golden clouds and an aircraft wing through a plane window",
    description:
      "Thoughtful routings and fare options compared for you, then booked and ticketed — without the hours of searching.",
  },
  {
    number: "03",
    title: "Hotel Reservations",
    image: hotelsImage,
    alt: "Bright hotel suite with ocean views, navy furniture and ivory linens",
    description:
      "Stays chosen to match your taste, budget and itinerary — confirmed before you ever pack a bag.",
  },
  {
    number: "04",
    title: "Car Rental",
    image: carImage,
    alt: "Navy luxury sedan on a winding coastal road at dusk",
    description:
      "The right vehicle waiting at your destination, arranged before you land — from city sedans to coastal cruisers.",
  },
] as const;

export function Services() {
  const rootRef = useGsapAnimation<HTMLElement>(({ gsap }) => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const items = gsap.utils.toArray<HTMLElement>(".service-item");
      items.forEach((item) => {
        gsap.fromTo(
          item.querySelector(".service-mask"),
          { clipPath: "inset(12% 6% 12% 6% round 2px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 2px)",
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 78%" },
          },
        );
        gsap.fromTo(
          item.querySelectorAll(".service-reveal"),
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 78%" },
          },
        );
      });
    });
  });

  return (
    <section
      id="services"
      ref={rootRef as React.RefObject<HTMLElement>}
      className="bg-background py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow text-primary">What we do</p>
          <h2 className="mt-4 font-display text-4xl leading-tight font-light text-foreground sm:text-5xl">
            Four services, one seamless journey
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Each part of your trip handled by the same careful pair of hands —
            so nothing falls between the gaps.
          </p>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {SERVICES.map((service, i) => (
            <article
              key={service.number}
              className={`service-item group ${i % 2 === 1 ? "lg:mt-14" : ""}`}
            >
              <a
                href="#inquiry"
                className="block focus-visible:outline-offset-4"
                aria-label={`Enquire about ${service.title}`}
              >
                <div className="service-mask aspect-[3/4] overflow-hidden rounded-md">
                  <img
                    src={service.image}
                    alt={service.alt}
                    width={912}
                    height={1200}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                </div>
                <p className="service-reveal mt-6 font-display text-sm text-primary">
                  {service.number}
                </p>
                <h3 className="service-reveal mt-1 font-display text-2xl font-medium text-foreground">
                  {service.title}
                </h3>
                <p className="service-reveal mt-3 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <span className="service-reveal mt-4 inline-flex items-center gap-2 text-xs font-medium tracking-widest text-foreground uppercase">
                  Enquire
                  <ArrowRight
                    className="size-3.5 transition-transform duration-300 group-hover:translate-x-1.5"
                    aria-hidden
                  />
                </span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
