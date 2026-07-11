"use client";

type PortfolioFilterProps = {
  categories: readonly { id: string; label: string }[];
  active: string;
  onChange: (id: string) => void;
};

export function PortfolioFilter({ categories, active, onChange }: PortfolioFilterProps) {
  return (
    <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:flex-wrap md:overflow-visible" role="tablist" aria-label="Фильтр портфолио">
      {categories.map((cat) => (
        <button
          key={cat.id}
          role="tab"
          aria-selected={active === cat.id}
          onClick={() => onChange(cat.id)}
          className={`min-h-11 shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
            active === cat.id
              ? "bg-gold text-graphite"
              : "border border-border-subtle bg-card-bg text-text-secondary hover:border-gold/30 hover:text-white-text"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
