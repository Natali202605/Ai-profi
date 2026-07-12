import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ClientPains } from "@/components/sections/ClientPains";
import { ValueSolution } from "@/components/sections/ValueSolution";
import { PortfolioDirections } from "@/components/sections/PortfolioDirections";
import { FeaturedWorks } from "@/components/sections/FeaturedWorks";
import { Services } from "@/components/sections/Services";
import { ArtApproach } from "@/components/sections/ArtApproach";
import { Cases } from "@/components/sections/Cases";
import { ComplexSolution } from "@/components/sections/ComplexSolution";
import { Process } from "@/components/sections/Process";
import { WorkProcessTimeline } from "@/components/sections/WorkProcessTimeline";
import { TrustApproach } from "@/components/sections/TrustApproach";
import { About } from "@/components/sections/About";
import { Certificates } from "@/components/sections/Certificates";
import { VKSection } from "@/components/sections/VKSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { ReviewFormSection } from "@/components/sections/ReviewFormSection";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { CooperationSecurity } from "@/components/sections/CooperationSecurity";
import { ContactForm } from "@/components/forms/ContactForm";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ClientPains />
      <ValueSolution />
      <PortfolioDirections />
      <FeaturedWorks />
      <Services />
      <ArtApproach />
      <Cases />
      <ComplexSolution />
      <Process />
      <WorkProcessTimeline />
      <TrustApproach />
      <About />
      <Certificates />
      <VKSection />
      <ReviewsSection />
      <ReviewFormSection />
      <FAQ />
      <FinalCTA />
      <CooperationSecurity />
      <ContactForm />
    </>
  );
}
