import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Check } from "lucide-react";

import heroImage from "@/assets/hero-coast.jpg";
import {
  SERVICE_OPTIONS,
  buildInquiryMessage,
  inquirySchema,
  type InquiryInput,
} from "@/lib/inquiry";
import { whatsappUrl } from "@/lib/site";
import { useGsapAnimation } from "@/lib/animations";

const HEADLINE_LINES = ["Journeys composed", "with quiet care."];

export function Hero() {
  const rootRef = useGsapAnimation<HTMLElement>(({ gsap }) => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      gsap.set(".hero-img", { scale: 1.18, clipPath: "inset(0% 0% 0% 0%)" });
      gsap.set(".hero-line-inner", { yPercent: 112 });
      gsap.set(".hero-fade", { y: 26, opacity: 0 });

      tl.to(".hero-img", {
        scale: 1.02,
        duration: 2.4,
        ease: "power2.out",
      })
        .to(
          ".hero-line-inner",
          { yPercent: 0, duration: 1.3, stagger: 0.14 },
          0.35,
        )
        .to(
          ".hero-fade",
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.12 },
          0.9,
        );

      gsap.to(".hero-img", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-root",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { service: "Full Trip Planning" },
  });

  const onSubmit = (data: InquiryInput) => {
    window.open(whatsappUrl(buildInquiryMessage(data)), "_blank", "noopener");
  };

  return (
    <section
      id="top"
      ref={rootRef as React.RefObject<HTMLElement>}
      className="hero-root relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-deep"
    >
      <img
        src={heroImage}
        alt="Aerial view of a turquoise coastline with limestone cliffs at golden hour"
        width={1920}
        height={1080}
        className="hero-img absolute inset-0 -z-10 h-[115%] w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-deep via-deep/45 to-deep/20" />

      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 pt-40 pb-16 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-20 lg:pb-24">
        <div>
          <p className="hero-fade eyebrow text-accent">
            Visas · Flights · Stays · Cars
          </p>
          <h1 className="mt-6 font-display text-5xl leading-[1.04] font-light text-white sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
            {HEADLINE_LINES.map((line) => (
              <span key={line} className="block overflow-hidden pb-1">
                <span className="hero-line-inner block">{line}</span>
              </span>
            ))}
          </h1>
          <p className="hero-fade mt-7 max-w-xl text-base leading-relaxed font-light text-white/85 sm:text-lg">
            From the first document to the final transfer, every detail of your
            journey is arranged for you — so all that's left to do is arrive.
          </p>
        </div>

        <div className="hero-fade lg:mb-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            aria-label="Travel inquiry"
            className="rounded-lg bg-card/95 p-6 shadow-2xl backdrop-blur sm:p-8"
          >
            <h2 className="font-display text-2xl font-medium text-foreground">
              Start your journey
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Tell us the essentials and we'll continue the conversation on
              WhatsApp.
            </p>

            <div className="mt-6 grid gap-5">
              <Field label="Full name" error={errors.name?.message}>
                <input
                  type="text"
                  autoComplete="name"
                  placeholder="Amelia Farooq"
                  className="w-full rounded-sm border border-input bg-transparent px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-ring"
                  {...register("name")}
                />
              </Field>

              <Field label="Destination" error={errors.destination?.message}>
                <input
                  type="text"
                  autoComplete="off"
                  placeholder="Santorini, Greece"
                  className="w-full rounded-sm border border-input bg-transparent px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-ring"
                  {...register("destination")}
                />
              </Field>

              <Field
                label="What do you need?"
                error={errors.service?.message}
              >
                <select
                  className="w-full rounded-sm border border-input bg-transparent px-3 py-2.5 text-sm text-foreground focus:border-ring"
                  {...register("service")}
                >
                  {SERVICE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Email" error={errors.email?.message}>
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full rounded-sm border border-input bg-transparent px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-ring"
                  {...register("email")}
                />
              </Field>

              <button
                type="submit"
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium tracking-wide text-primary-foreground uppercase transition-colors hover:bg-primary/85"
              >
                <Check className="size-4" aria-hidden />
                Send my inquiry
              </button>
              <p className="text-center text-xs text-muted-foreground">
                No fees, no commitment — you approve every option first.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium tracking-widest text-muted-foreground uppercase">
        {label}
      </span>
      {children}
      {error ? (
        <span role="alert" className="mt-1.5 block text-xs text-destructive">
          {error}
        </span>
      ) : null}
    </label>
  );
}
