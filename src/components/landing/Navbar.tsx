import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Destinations", href: "#destinations" },
  { label: "Why Us", href: "#why-us" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid
          ? "border-b border-border bg-background/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 md:h-20">
        <a
          href="#top"
          className={`font-display text-lg font-medium tracking-wide md:text-xl ${
            solid ? "text-foreground" : "text-white"
          }`}
        >
          Meridian <span className="italic text-primary">Travel</span>
        </a>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 md:flex"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`link-underline text-[13px] font-medium tracking-wide uppercase ${
                solid ? "text-foreground/80" : "text-white/85"
              } transition-colors hover:text-foreground`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#inquiry"
            className="rounded-full bg-primary px-5 py-2.5 text-[13px] font-medium tracking-wide text-primary-foreground uppercase transition-colors hover:bg-primary/85"
          >
            Plan My Trip
          </a>
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className={`rounded-sm p-2 md:hidden ${
            solid ? "text-foreground" : "text-white"
          }`}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-border bg-background transition-[max-height] duration-500 ease-out md:hidden ${
          open ? "max-h-96" : "max-h-0 border-t-0"
        }`}
      >
        <nav
          aria-label="Mobile"
          className="flex flex-col gap-1 px-5 py-4 sm:px-8"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-sm px-2 py-3 text-sm font-medium tracking-wide text-foreground uppercase hover:bg-muted"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#inquiry"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-primary px-5 py-3 text-center text-sm font-medium tracking-wide text-primary-foreground uppercase"
          >
            Plan My Trip
          </a>
        </nav>
      </div>
    </header>
  );
}
