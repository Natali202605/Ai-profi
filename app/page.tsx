import { Hero } from "@/components/sections/Hero";
import { Positioning } from "@/components/sections/Positioning";
import { Audience } from "@/components/sections/Audience";
import { ClientPains } from "@/components/sections/ClientPains";
import { Services } from "@/components/sections/Services";
import { PortfolioDirections } from "@/components/sections/PortfolioDirections";
import { FeaturedWorks } from "@/components/sections/FeaturedWorks";
import { About } from "@/components/sections/About";
import { Certificates } from "@/components/sections/Certificates";
import { Competencies } from "@/components/sections/Competencies";
import { WorkProcessTimeline } from "@/components/sections/WorkProcessTimeline";
import { TrustAgreements } from "@/components/sections/TrustAgreements";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ContactForm } from "@/components/forms/ContactForm";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Positioning />
      <Audience />
      <ClientPains />
      <Services />
      <PortfolioDirections />
      <FeaturedWorks />
      <About />
      <Certificates />
      <Competencies />
      <WorkProcessTimeline />
      <TrustAgreements />
      <ReviewsSection />
      <FAQ />
      <FinalCTA />
      <ContactForm />
    </>
  );
}
