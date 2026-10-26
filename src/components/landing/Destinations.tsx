import { ArrowUpRight } from "lucide-react";

import santoriniImage from "@/assets/destination-santorini.jpg";
import maldivesImage from "@/assets/destination-maldives.jpg";
import kyotoImage from "@/assets/destination-kyoto.jpg";
import { useGsapAnimation } from "@/lib/animations";

const DESTINATIONS = [
  {
    name: "Santorini",
    region: "Cyclades, Greece",
    image: santoriniImage,
    alt: "Whitewashed houses and a blue church dome above the Aegean Sea in Santorini",
    caption: "Caldera light, whitewashed villages and long Aegean evenings.",
  },
  {
    name: "The Maldives",
    region: "Indian Ocean",
    image: maldivesImage,
    alt: "Overwater villas on stilts above a turquoise lagoon in the Maldives",
    caption: "Clear lagoons, quiet water villas and slow island days.",
  },
  {
    name: "Kyoto",
    region: "Kansai, Japan",
    image: kyotoImage,
    alt: "Misty morning at a wooden temple corridor beside a raked stone garden in Kyoto",
    caption: "Temple gardens, misty mornings and seasons that slow you down.",
  },
] as const;

export function Destinations() {
  const rootRef = useGsapAnimation<HTMLElement>(({ gsap }) => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const items = gsap.utils.toArray<HTMLElement>(".destination-item");
      items.forEach((item) => {
        gsap.fromTo(
          item.querySelector(".destination-mask"),
          { clipPath: "inset(8% 5% 8% 5% round 2px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 2px)",
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 80%" },
          },
        );
        gsap.fromTo(
          item.querySelector(".destination-img"),
          { scale: 1.14 },
          {
            scale: 1,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: item, start: "top 80%" },
          },
        );
        gsap.fromTo(
          item.querySelector(".destination-caption"),
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: 0.25,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 65%" },
          },
        );
      });

      gsap.to(".destination-parallax", {
        yPercent: -7,
        ease: "none",
        scrollTrigger: {
          trigger: ".destinations-grid",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  });

  return (
    <section
      id="destinations"
      ref={rootRef as React.RefObject<HTMLElement>}
      className="bg-secondary py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow text-primary">Featured destinations</p>
            <h2 className="mt-4 font-display text-4xl leading-tight font-light text-foreground sm:text-5xl">
              Places our travelers dream about
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            A glimpse of where an inquiry can lead — every itinerary is built
            around the season, the pace and the traveler.
          </p>
        </div>

        <div className="destinations-grid mt-16 grid gap-6 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          {/* Large feature */}
          <a
            href="#inquiry"
            aria-label={`Enquire about a trip to ${DESTINATIONS[0].name}`}
            className="destination-item group relative block overflow-hidden rounded-md lg:col-span-7 lg:row-span-2"
          >
            <div className="destination-mask h-full min-h-[26rem] overflow-hidden lg:min-h-[42rem]">
              <img
                src={DESTINATIONS[0].image}
                alt={DESTINATIONS[0].alt}
                width={1104}
                height={1408}
                loading="lazy"
                className="destination-img destination-parallax h-full min-h-[26rem] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] lg:min-h-[42rem]"
              />
            </div>
            <DestinationOverlay destination={DESTINATIONS[0]} large />
          </a>

          {/* Stacked pair */}
          <div className="grid gap-6 lg:col-span-5 lg:gap-8">
            {DESTINATIONS.slice(1).map((destination) => (
              <a
                key={destination.name}
                href="#inquiry"
                aria-label={`Enquire about a trip to ${destination.name}`}
                className="destination-item group relative block overflow-hidden rounded-md"
              >
                <div className="destination-mask h-full min-h-[18rem] overflow-hidden lg:min-h-[19.5rem]">
                  <img
                    src={destination.image}
                    alt={destination.alt}
                    width={912}
                    height={1408}
                    loading="lazy"
                    className="destination-img h-full min-h-[18rem] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] lg:min-h-[19.5rem]"
                  />
                </div>
                <DestinationOverlay destination={destination} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DestinationOverlay({
  destination,
  large = false,
}: {
  destination: (typeof DESTINATIONS)[number];
  large?: boolean;
}) {
  return (
    <div className="destination-caption pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-deep/85 via-deep/10 to-transparent p-6 sm:p-8">
      <p className="eyebrow text-accent">{destination.region}</p>
      <h3
        className={`mt-2 font-display font-medium text-white ${
          large ? "text-4xl sm:text-5xl" : "text-3xl"
        }`}
      >
        {destination.name}
      </h3>
      {large ? (
        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80">
          {destination.caption}
        </p>
      ) : null}
      <span className="mt-4 inline-flex items-center gap-2 text-xs font-medium tracking-widest text-white uppercase">
        Enquire
        <ArrowUpRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          aria-hidden
        />
      </span>
    </div>
  );
}
