import { AccentText } from "@/components/ui/AccentText";
import { heroExpertiseItems } from "@/data/content";

export function HeroExpertiseCard() {
  return (
    <div className="hero-expertise-card glass-panel-soft rounded-[1.75rem] p-5 md:p-6">
      <p className="mb-4 font-heading text-lg leading-snug text-white-text md:text-xl">
        <AccentText
          text="Профессиональный подход"
          accent="Профессиональный"
          accentClassName="text-accent-primary"
        />
      </p>
      <ul className="hero-expertise-list">
        {heroExpertiseItems.map((item, index) => (
          <li
            key={item.number}
            className={
              index < heroExpertiseItems.length - 1
                ? "border-b border-white/12 pb-4"
                : ""
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
                <p className="mt-1 text-xs leading-relaxed text-text-secondary md:text-sm">
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
