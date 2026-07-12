"use client";

import { AccentText } from "@/components/ui/AccentText";
import { heroExpertiseItems as fallbackItems } from "@/data/content";
import { useSiteContent } from "@/components/providers/SiteContentProvider";

export function HeroExpertiseCard() {
  const { hero } = useSiteContent();
  const cardTitle = hero.expertiseCardTitle || "Профессиональный подход";
  const cardTitleAccent = hero.expertiseCardTitleAccent || "Профессиональный";
  const items = (hero.expertiseItems || fallbackItems).filter((item) => item.isVisible !== false);

  return (
    <div className="hero-expertise-card hero-expertise-card-dense rounded-[1.75rem] p-5 md:p-6">
      <p className="mb-4 font-heading text-lg leading-snug text-white-text md:text-xl">
        <AccentText
          text={cardTitle}
          accent={cardTitleAccent}
          accentClassName="text-accent-primary"
        />
      </p>
      <ul className="hero-expertise-list">
        {items.map((item, index) => (
          <li
            key={item.number}
            className={
              index < items.length - 1 ? "border-b border-white/12 pb-4" : ""
            }
          >
            <div className="flex gap-3 md:gap-4">
              <span className="text-accent-secondary shrink-0 pt-0.5 font-mono text-xs tracking-wider md:text-sm">
                {item.number}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold leading-snug text-white-text md:text-[0.9375rem]">
                  <AccentText
                    text={item.title}
                    accent={item.titleAccent}
                    accentClassName="text-accent-secondary"
                  />
                </p>
                <p className="mt-1 text-xs leading-relaxed text-body-secondary md:text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
