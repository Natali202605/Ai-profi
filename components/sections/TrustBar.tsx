import { Palette, Sparkles, Globe, Layers, Target } from "lucide-react";
import { trustBarItems } from "@/data/content";
import { RevealAnimation } from "@/components/ui/RevealAnimation";

const trustIcons = [Palette, Sparkles, Globe, Layers, Target];

export function TrustBar() {
  return (
    <section className="border-y border-border-subtle bg-plum/30 py-5 backdrop-blur-md">
      <div className="container-site">
        <RevealAnimation>
          <ul className="flex gap-5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-5 md:gap-4 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden">
            {trustBarItems.map((item, index) => {
              const Icon = trustIcons[index % trustIcons.length];
              return (
                <li
                  key={item}
                  className="flex min-w-[220px] shrink-0 items-center gap-3 md:min-w-0 md:shrink md:justify-center md:text-center"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/25 bg-gold/10 text-gold">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="text-sm leading-snug text-text-secondary md:whitespace-normal">
                    {item}
                  </span>
                </li>
              );
            })}
          </ul>
        </RevealAnimation>
      </div>
    </section>
  );
}
