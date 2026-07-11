import type { Metadata } from "next";
import { getSiteContent } from "@/lib/site-content-store";
import { LegalDocument } from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Публичная оферта",
  robots: { index: false },
};

export default async function OfferPage() {
  const { legal } = await getSiteContent();

  return (
    <div className="pt-24 pb-24 md:pb-20 md:pt-32">
      <div className="container-site max-w-3xl">
        <h1 className="heading-display mb-8 text-3xl text-white-text sm:text-4xl">
          {legal.offer.title}
        </h1>
        <LegalDocument page={legal.offer} operator={legal.operator} publishedAt={legal.offer.publishedAt} />
      </div>
    </div>
  );
}
