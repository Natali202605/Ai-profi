import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Services } from "@/components/sections/Services";
import { ArtApproach } from "@/components/sections/ArtApproach";
import { FeaturedPortfolio } from "@/components/sections/FeaturedPortfolio";
import { Process } from "@/components/sections/Process";
import { VKSection } from "@/components/sections/VKSection";
import { About } from "@/components/sections/About";
import { Benefits } from "@/components/sections/Benefits";
import { Cases } from "@/components/sections/Cases";
import { Reviews } from "@/components/sections/Reviews";
import { Cooperation } from "@/components/sections/Cooperation";
import { FAQ } from "@/components/sections/FAQ";
import { ContactForm } from "@/components/forms/ContactForm";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Services />
      <ArtApproach />
      <FeaturedPortfolio />
      <Process />
      <VKSection />
      <About />
      <Benefits />
      <Cases />
      <Reviews />
      <Cooperation />
      <FAQ />
      <ContactForm />
      <FinalCTA />
    </>
  );
}
