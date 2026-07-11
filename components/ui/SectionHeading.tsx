type SectionHeadingProps = {
  label?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  align?: "left" | "center";
};

export function SectionHeading({
  label,
  title,
  subtitle,
  light = false,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-12 md:mb-16 text-readable ${align === "center" ? "text-center" : ""}`}
    >
      {label && (
        <p
          className={`mb-3 text-xs font-semibold uppercase tracking-[0.2em] ${
            light ? "text-berry" : "text-gold"
          }`}
        >
          {label}
        </p>
      )}
      <h2
        className={`heading-display text-balance text-3xl text-white-text sm:text-4xl md:text-5xl lg:text-[56px]`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 max-w-2xl text-lg leading-relaxed ${
            align === "center" ? "mx-auto" : ""
          } text-text-secondary`}
        >
          {subtitle}
        </p>
      )}
      <div className={`gold-line mt-6 ${align === "center" ? "mx-auto" : ""}`} />
    </div>
  );
}
