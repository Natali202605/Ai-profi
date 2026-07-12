type AccentTextProps = {
  text: string;
  accent?: string;
  accentClassName?: string;
  className?: string;
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function AccentText({
  text,
  accent,
  accentClassName = "text-accent-primary",
  className = "",
}: AccentTextProps) {
  if (!accent?.trim()) {
    return <span className={className}>{text}</span>;
  }

  const parts = text.split(new RegExp(`(${escapeRegExp(accent)})`, "i"));
  const accentLower = accent.toLowerCase();

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.toLowerCase() === accentLower) {
          return (
            <span key={`${part}-${index}`} className={accentClassName}>
              {part}
            </span>
          );
        }
        return part;
      })}
    </span>
  );
}
