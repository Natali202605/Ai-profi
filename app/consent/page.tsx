import type { Metadata } from "next";
import { getSiteContent } from "@/lib/site-content-store";
import { LegalDocument } from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных",
  robots: { index: false },
};

export default async function ConsentPage() {
  const { legal } = await getSiteContent();

  return (
    <div className="pt-24 pb-24 md:pb-20 md:pt-32">
      <div className="container-site max-w-3xl">
        <h1 className="heading-display mb-8 text-3xl text-white-text sm:text-4xl">
          {legal.consent.title}
        </h1>
        <LegalDocument page={legal.consent} operator={legal.operator} />
      </div>
    </div>
  );
}
