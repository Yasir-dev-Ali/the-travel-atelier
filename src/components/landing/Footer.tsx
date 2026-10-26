import { SITE, whatsappUrl } from "@/lib/site";

const EXPLORE_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Destinations", href: "#destinations" },
  { label: "Why Us", href: "#why-us" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Plan My Trip", href: "#inquiry" },
] as const;

const SERVICE_LINKS = [
  "Visa Assistance",
  "Flight Booking",
  "Hotel Reservations",
  "Car Rental",
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-deep text-deep-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-20 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <p className="font-display text-2xl font-medium">
            Meridian <span className="italic text-accent">Travel</span>
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-deep-muted">
            {SITE.tagline} Every detail arranged, every step explained.
          </p>
        </div>

        <nav aria-label="Footer">
          <h3 className="eyebrow text-accent">Explore</h3>
          <ul className="mt-5 space-y-3">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="link-underline text-sm text-deep-muted transition-colors hover:text-deep-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="eyebrow text-accent">Services</h3>
          <ul className="mt-5 space-y-3">
            {SERVICE_LINKS.map((label) => (
              <li key={label}>
                <a
                  href="#services"
                  className="link-underline text-sm text-deep-muted transition-colors hover:text-deep-foreground"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-accent">Contact</h3>
          <ul className="mt-5 space-y-3 text-sm text-deep-muted">
            <li>
              <a
                href={whatsappUrl("Hello Meridian Travel!")}
                target="_blank"
                rel="noopener"
                className="link-underline transition-colors hover:text-deep-foreground"
              >
                WhatsApp — the fastest way to reach us
              </a>
            </li>
            {SITE.email ? (
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="link-underline transition-colors hover:text-deep-foreground"
                >
                  {SITE.email}
                </a>
              </li>
            ) : null}
            {SITE.phone ? <li>{SITE.phone}</li> : null}
            {SITE.address ? <li>{SITE.address}</li> : null}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-deep-muted sm:flex-row sm:px-8">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p>Arranged with care, one journey at a time.</p>
        </div>
      </div>
    </footer>
  );
}
