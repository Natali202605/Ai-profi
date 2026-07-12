type AccentTextProps = {
  text: string;
  accent?: string;
  accents?: string[];
  accentClassName?: string;
  className?: string;
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function AccentText({
  text,
  accent,
  accents,
  accentClassName = "text-accent-primary",
  className = "",
}: AccentTextProps) {
  const phrases = accents?.length
    ? accents.filter(Boolean)
    : accent?.trim()
      ? [accent]
      : [];

  if (!phrases.length) {
    return <span className={className}>{text}</span>;
  }

  const pattern = phrases.map(escapeRegExp).join("|");
  const parts = text.split(new RegExp(`(${pattern})`, "gi"));

  return (
    <span className={className}>
      {parts.map((part, index) => {
        const isAccent = phrases.some((phrase) => phrase.toLowerCase() === part.toLowerCase());
        if (isAccent) {
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
