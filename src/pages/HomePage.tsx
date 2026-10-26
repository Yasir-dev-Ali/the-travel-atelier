import { BookingSteps } from "@/components/landing/BookingSteps";
import { ContactCta } from "@/components/landing/ContactCta";
import { Destinations } from "@/components/landing/Destinations";
import { Faq } from "@/components/landing/Faq";
import { Hero } from "@/components/landing/Hero";
import { Services } from "@/components/landing/Services";
import { WhyChooseUs } from "@/components/landing/WhyChooseUs";
import { SiteLayout } from "@/layouts/SiteLayout";

export function HomePage() {
  return (
    <SiteLayout>
      <main>
        <Hero />
        <Services />
        <Destinations />
        <WhyChooseUs />
        <BookingSteps />
        <Faq />
        <ContactCta />
      </main>
    </SiteLayout>
  );
}
