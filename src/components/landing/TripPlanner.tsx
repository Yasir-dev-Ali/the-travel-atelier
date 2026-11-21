import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Compass, MessageCircle, Minus, Plus } from "lucide-react";

import { useGsapAnimation } from "@/hooks/use-gsap-animation";
import { whatsappUrl } from "@/utils/whatsapp";

const DESTINATIONS = ["I'm open to ideas", "Santorini", "The Maldives", "Kyoto", "Somewhere else"];
const TRAVEL_STYLES = [
  "Slow & restorative",
  "Culture & discovery",
  "A little adventure",
  "Celebration",
];
const BUDGETS = ["Under $2,500", "$2,500–$5,000", "$5,000–$10,000", "$10,000+"];
const STEPS = ["The inspiration", "The details", "Your introduction"];

type PlannerData = {
  destination: string;
  style: string;
  departure: string;
  returnDate: string;
  travelers: number;
  budget: string;
  name: string;
  email: string;
  notes: string;
};

const INITIAL_DATA: PlannerData = {
  destination: DESTINATIONS[0],
  style: TRAVEL_STYLES[0],
  departure: "",
  returnDate: "",
  travelers: 2,
  budget: BUDGETS[1],
  name: "",
  email: "",
  notes: "",
};

export function TripPlanner() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(INITIAL_DATA);
  const rootRef = useGsapAnimation<HTMLElement>(({ gsap }) => {
    gsap.fromTo(
      ".planner-content",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
    );
  });
  const today = new Date().toISOString().slice(0, 10);

  function update<K extends keyof PlannerData>(key: K, value: PlannerData[K]) {
    setData((current) => ({ ...current, [key]: value }));
  }

  function submitInquiry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const details = [
      `I'd love help planning a trip with Meridian Travel.`,
      `Destination: ${data.destination}`,
      `Travel style: ${data.style}`,
      `Dates: ${data.departure || "Flexible"} to ${data.returnDate || "Flexible"}`,
      `Travelers: ${data.travelers}`,
      `Budget per person: ${data.budget}`,
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.notes.trim() ? `A little more about my trip: ${data.notes.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(whatsappUrl(details), "_blank", "noopener,noreferrer");
  }

  return (
    <section
      id="trip-planner"
      ref={rootRef as React.RefObject<HTMLElement>}
      className="scroll-mt-20 bg-background py-24 sm:py-32"
      aria-labelledby="planner-title"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="max-w-lg">
          <p className="eyebrow text-primary">A few thoughtful questions</p>
          <h2
            id="planner-title"
            className="mt-4 font-display text-4xl leading-tight font-light text-foreground sm:text-5xl"
          >
            Let&apos;s shape your next chapter.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Start with the feeling you&apos;re after. We&apos;ll take it from there, with a trip
            shaped around your pace, your people, and the details that matter to you.
          </p>
          <div className="mt-9 flex items-center gap-3 text-sm text-muted-foreground">
            <Compass className="size-4 text-primary" aria-hidden="true" />
            <span>Thoughtful planning, without the overwhelm.</span>
          </div>
          <div className="mt-12 hidden space-y-4 sm:block">
            {STEPS.map((label, index) => (
              <div
                key={label}
                className={`flex items-center gap-3 text-sm ${index === step ? "text-foreground" : "text-muted-foreground"}`}
              >
                <span
                  className={`flex size-7 items-center justify-center rounded-full border text-xs ${index < step ? "border-primary bg-primary text-primary-foreground" : index === step ? "border-primary text-primary" : "border-border"}`}
                >
                  {index < step ? <Check className="size-3.5" aria-hidden="true" /> : index + 1}
                </span>
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="planner-content rounded-md border border-border bg-card p-6 shadow-sm sm:p-9">
          <div className="flex items-center justify-between gap-4">
            <p className="eyebrow text-primary">
              Step {step + 1} of {STEPS.length}
            </p>
            <span className="text-xs text-muted-foreground">
              You can go back and update your answers
            </span>
          </div>
          <div
            className="mt-4 h-1 w-full overflow-hidden rounded-full bg-secondary"
            aria-label={`Step ${step + 1} of ${STEPS.length}`}
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={STEPS.length}
            aria-valuenow={step + 1}
          >
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            />
          </div>

          {step === 0 && (
            <div className="mt-8" aria-labelledby="planner-step-title">
              <h3
                id="planner-step-title"
                className="font-display text-2xl font-light text-foreground"
              >
                What are you dreaming of?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Choose a destination to start — it&apos;s fine if you&apos;re still deciding.
              </p>
              <fieldset className="mt-6">
                <legend className="mb-3 text-sm font-medium">Destination</legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {DESTINATIONS.map((destination) => (
                    <Choice
                      key={destination}
                      label={destination}
                      selected={data.destination === destination}
                      onClick={() => update("destination", destination)}
                    />
                  ))}
                </div>
              </fieldset>
              <fieldset className="mt-7">
                <legend className="mb-3 text-sm font-medium">What kind of trip feels right?</legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {TRAVEL_STYLES.map((style) => (
                    <Choice
                      key={style}
                      label={style}
                      selected={data.style === style}
                      onClick={() => update("style", style)}
                    />
                  ))}
                </div>
              </fieldset>
            </div>
          )}

          {step === 1 && (
            <div className="mt-8" aria-labelledby="planner-step-title">
              <h3
                id="planner-step-title"
                className="font-display text-2xl font-light text-foreground"
              >
                Let&apos;s get the details.
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                A few guideposts help us make thoughtful recommendations.
              </p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium">
                  Departure date{" "}
                  <span className="font-normal text-muted-foreground">(optional)</span>
                  <input
                    type="date"
                    min={today}
                    value={data.departure}
                    onChange={(event) => update("departure", event.target.value)}
                    className="h-12 rounded-sm border border-input bg-background px-3 font-normal"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  Return date <span className="font-normal text-muted-foreground">(optional)</span>
                  <input
                    type="date"
                    min={data.departure || today}
                    value={data.returnDate}
                    onChange={(event) => update("returnDate", event.target.value)}
                    className="h-12 rounded-sm border border-input bg-background px-3 font-normal"
                  />
                </label>
              </div>
              <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium">Travelers</p>
                  <p className="mt-1 text-xs text-muted-foreground">Adults and children</p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => update("travelers", Math.max(1, data.travelers - 1))}
                    disabled={data.travelers <= 1}
                    aria-label="Remove traveler"
                    className="flex size-10 items-center justify-center rounded-full border border-input disabled:opacity-40"
                  >
                    <Minus className="size-4" />
                  </button>
                  <output className="w-5 text-center" aria-live="polite">
                    {data.travelers}
                  </output>
                  <button
                    type="button"
                    onClick={() => update("travelers", Math.min(12, data.travelers + 1))}
                    disabled={data.travelers >= 12}
                    aria-label="Add traveler"
                    className="flex size-10 items-center justify-center rounded-full border border-input disabled:opacity-40"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
              </div>
              <fieldset className="mt-7">
                <legend className="mb-3 text-sm font-medium">Approximate budget per person</legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {BUDGETS.map((budget) => (
                    <Choice
                      key={budget}
                      label={budget}
                      selected={data.budget === budget}
                      onClick={() => update("budget", budget)}
                    />
                  ))}
                </div>
              </fieldset>
            </div>
          )}

          {step === 2 && (
            <form
              id="trip-planner-form"
              className="mt-8"
              onSubmit={submitInquiry}
              aria-labelledby="planner-step-title"
            >
              <h3
                id="planner-step-title"
                className="font-display text-2xl font-light text-foreground"
              >
                A little about you.
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We&apos;ll send your trip outline to WhatsApp so our team can pick up from there.
              </p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium">
                  Your name
                  <input
                    required
                    minLength={2}
                    maxLength={80}
                    autoComplete="name"
                    value={data.name}
                    onChange={(event) => update("name", event.target.value)}
                    className="h-12 rounded-sm border border-input bg-background px-3 font-normal"
                    placeholder="Full name"
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  Email address
                  <input
                    required
                    type="email"
                    maxLength={255}
                    autoComplete="email"
                    value={data.email}
                    onChange={(event) => update("email", event.target.value)}
                    className="h-12 rounded-sm border border-input bg-background px-3 font-normal"
                    placeholder="you@example.com"
                  />
                </label>
              </div>
              <label className="mt-5 grid gap-2 text-sm font-medium">
                Anything else we should know?{" "}
                <span className="font-normal text-muted-foreground">(optional)</span>
                <textarea
                  maxLength={500}
                  rows={3}
                  value={data.notes}
                  onChange={(event) => update("notes", event.target.value)}
                  className="resize-y rounded-sm border border-input bg-background p-3 font-normal"
                  placeholder="A celebration, a must-see, or anything that would make this trip yours…"
                />
              </label>
              <p className="mt-5 rounded-sm bg-secondary p-4 text-xs leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">Your trip so far:</span>{" "}
                {data.destination} · {data.style} · {data.travelers} travelers · {data.budget} per
                person
              </p>
            </form>
          )}

          <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep((current) => current - 1)}
                className="inline-flex items-center gap-2 px-1 py-3 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="size-4" /> Back
              </button>
            ) : (
              <span />
            )}
            {step < 2 ? (
              <button
                type="button"
                onClick={() => setStep((current) => current + 1)}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85"
              >
                Continue <ArrowRight className="size-4" />
              </button>
            ) : (
              <button
                type="submit"
                form="trip-planner-form"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/85"
              >
                <MessageCircle className="size-4" /> Send trip inquiry
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Choice({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`min-h-12 rounded-sm border px-4 py-3 text-left text-sm transition-colors ${selected ? "border-primary bg-primary/5 text-foreground ring-1 ring-primary" : "border-input bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"}`}
    >
      {label}
    </button>
  );
}
