type ProcessStepProps = {
  step: number;
  title: string;
  description: string;
  light?: boolean;
};

export function ProcessStep({ step, title, description, light }: ProcessStepProps) {
  return (
    <div
      className={`rounded-2xl border p-6 md:p-8 ${
        light
          ? "glass-panel"
          : "card-glass"
      }`}
    >
      <span
        className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
          light ? "bg-gold/15 text-gold" : "bg-gold/20 text-gold"
        }`}
      >
        {step}
      </span>
      <h3 className="heading-display mb-2 text-xl text-white-text">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-text-secondary">
        {description}
      </p>
    </div>
  );
}
