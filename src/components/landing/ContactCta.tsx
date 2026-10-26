import { MessageCircle } from "lucide-react";

import heroImage from "@/assets/hero-coast.jpg";
import { useGsapAnimation } from "@/hooks/use-gsap-animation";
import { whatsappUrl } from "@/utils/whatsapp";

export function ContactCta() {
  const rootRef = useGsapAnimation<HTMLElement>(({ gsap }) => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        ".cta-reveal",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cta-root", start: "top 70%" },
        },
      );
      gsap.to(".cta-img", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: ".cta-root",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  });

  return (
    <section
      ref={rootRef as React.RefObject<HTMLElement>}
      className="cta-root relative isolate overflow-hidden bg-deep"
    >
      <img
        src={heroImage}
        alt=""
        aria-hidden
        width={1920}
        height={1080}
        loading="lazy"
        className="cta-img absolute inset-0 -z-10 h-[120%] w-full object-cover opacity-60"
      />
      <div className="absolute inset-0 -z-10 bg-deep/70" />

      <div className="mx-auto max-w-4xl px-5 py-28 text-center sm:px-8 sm:py-36">
        <p className="cta-reveal eyebrow text-accent">Ready when you are</p>
        <h2 className="cta-reveal mt-5 font-display text-4xl leading-tight font-light text-white sm:text-6xl">
          Where to next?
        </h2>
        <p className="cta-reveal mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/80">
          Send one message about the trip you have in mind — we'll take it from there, on WhatsApp,
          at whatever pace suits you.
        </p>
        <div className="cta-reveal mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={whatsappUrl("Hello Meridian Travel! I'd like to plan a trip.")}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2.5 rounded-full bg-primary px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground uppercase transition-colors hover:bg-primary/85"
          >
            <MessageCircle className="size-4" aria-hidden />
            Chat on WhatsApp
          </a>
          <a
            href="#inquiry"
            className="link-underline text-sm font-medium tracking-widest text-white uppercase"
          >
            Or use the inquiry form
          </a>
        </div>
      </div>
    </section>
  );
}
