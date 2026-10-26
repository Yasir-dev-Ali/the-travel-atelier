import { createFileRoute } from "@tanstack/react-router";

import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Services } from "@/components/landing/Services";
import { Destinations } from "@/components/landing/Destinations";
import { WhyChooseUs } from "@/components/landing/WhyChooseUs";
import { BookingSteps } from "@/components/landing/BookingSteps";
import { Faq } from "@/components/landing/Faq";
import { ContactCta } from "@/components/landing/ContactCta";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Meridian Travel — Visa, Flight, Hotel & Car Rental Services",
      },
      {
        name: "description",
        content:
          "Visa assistance, flight booking, hotel reservations and car rental — planned as one seamless journey. Start with a free inquiry.",
      },
      {
        property: "og:title",
        content: "Meridian Travel — Visa, Flight, Hotel & Car Rental Services",
      },
      {
        property: "og:description",
        content:
          "Visas, flights, stays and cars — planned as one seamless journey. Start with a free inquiry.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Destinations />
        <WhyChooseUs />
        <BookingSteps />
        <Faq />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
