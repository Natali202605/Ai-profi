import { trustBarItems } from "@/data/content";
import { RevealAnimation } from "@/components/ui/RevealAnimation";

export function TrustBar() {
  return (
    <section className="border-y border-border-subtle bg-plum/30 py-4 backdrop-blur-md">
      <div className="container-site">
        <RevealAnimation>
          <ul className="flex gap-6 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-5 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden">
            {trustBarItems.map((item) => (
              <li
                key={item}
                className="flex shrink-0 items-center gap-2 text-sm text-text-secondary md:shrink md:justify-center md:text-center"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                <span className="whitespace-nowrap md:whitespace-normal">{item}</span>
              </li>
            ))}
          </ul>
        </RevealAnimation>
      </div>
    </section>
  );
}
