import { Hero } from "@/components/sections/Hero";
import { Positioning } from "@/components/sections/Positioning";
import { FeaturedPortfolio } from "@/components/sections/FeaturedPortfolio";
import { Services } from "@/components/sections/Services";
import { ArtApproach } from "@/components/sections/ArtApproach";
import { Cases } from "@/components/sections/Cases";
import { Process } from "@/components/sections/Process";
import { ComplexSolution } from "@/components/sections/ComplexSolution";
import { About } from "@/components/sections/About";
import { Certificates } from "@/components/sections/Certificates";
import { VKSection } from "@/components/sections/VKSection";
import { Reviews } from "@/components/sections/Reviews";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ContactForm } from "@/components/forms/ContactForm";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Positioning />
      <FeaturedPortfolio />
      <Services />
      <ArtApproach />
      <Cases />
      <Process />
      <ComplexSolution />
      <About />
      <Certificates />
      <VKSection />
      <Reviews />
      <FAQ />
      <FinalCTA />
      <ContactForm />
    </>
  );
}
