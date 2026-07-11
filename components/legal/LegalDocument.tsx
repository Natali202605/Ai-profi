import Link from "next/link";
import type { LegalBlock, SiteLegal } from "@/lib/site-content-types";

function interpolate(text: string, operator: SiteLegal["operator"]) {
  return text
    .replaceAll("{{brand}}", operator.brand)
    .replaceAll("{{fullName}}", operator.fullName)
    .replaceAll("{{status}}", operator.status)
    .replaceAll("{{siteUrl}}", operator.siteUrl)
    .replaceAll("{{vkProfile}}", operator.vkProfile)
    .replaceAll("{{vkCommunity}}", operator.vkCommunity)
    .replaceAll("{{vkReviews}}", operator.vkReviews);
}

function renderContactLine(line: string, operator: SiteLegal["operator"]) {
  if (line === "site") {
    return (
      <>
        Сайт:{" "}
        <a href={operator.siteUrl} className="break-all text-link">
          {operator.siteUrl}
        </a>
      </>
    );
  }

  if (line === "vkProfile") {
    return (
      <>
        ВКонтакте:{" "}
        <a
          href={operator.vkProfile}
          className="break-all text-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {operator.vkProfile}
        </a>
      </>
    );
  }

  if (line === "vkContacts") {
    return (
      <>
        ВКонтакте:{" "}
        <a
          href={operator.vkProfile}
          className="text-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          личная страница
        </a>
        ,{" "}
        <a
          href={operator.vkCommunity}
          className="text-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          сообщество
        </a>
      </>
    );
  }

  return interpolate(line, operator);
}

function renderBlock(block: LegalBlock, operator: SiteLegal["operator"], index: number) {
  switch (block.type) {
    case "p":
      return (
        <p key={index} className="break-words">
          {interpolate(block.text, operator)}
        </p>
      );
    case "h2":
      return (
        <h2 key={index} className="heading-display text-xl text-white-text sm:text-2xl">
          {block.text}
        </h2>
      );
    case "ul":
      return (
        <ul key={index} className="list-disc space-y-2 pl-6">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "p_vk":
      return (
        <p key={index} className="break-words">
          {block.before}
          <a
            href={operator.vkProfile}
            className="text-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {block.linkLabel}
          </a>
          {block.after}
        </p>
      );
    case "related":
      return (
        <p key={index} className="break-words text-sm text-text-secondary/60">
          {block.before}
          {block.links.map((link, linkIndex) => (
            <span key={link.href}>
              {linkIndex > 0 ? ", " : ""}
              <Link href={link.href} className="text-link">
                {link.label}
              </Link>
            </span>
          ))}
          {block.middle}
          {block.linksAfter?.map((link, linkIndex) => (
            <span key={link.href}>
              {linkIndex > 0 ? ", " : ""}
              <Link href={link.href} className="text-link">
                {link.label}
              </Link>
            </span>
          ))}
          {block.after}
        </p>
      );
    case "contact":
      return (
        <p key={index} className="break-words">
          {block.lines.map((line, lineIndex) => (
            <span key={`${line}-${lineIndex}`}>
              {lineIndex > 0 ? <br /> : null}
              {renderContactLine(line, operator)}
            </span>
          ))}
        </p>
      );
    default:
      return null;
  }
}

export function LegalDocument({
  page,
  operator,
  publishedAt,
}: {
  page: SiteLegal["privacy"] | SiteLegal["consent"] | SiteLegal["offer"];
  operator: SiteLegal["operator"];
  publishedAt?: string;
}) {
  return (
    <div className="space-y-6 text-text-secondary leading-relaxed">
      {page.blocks.map((block, index) => renderBlock(block, operator, index))}
      {publishedAt ? (
        <p className="text-sm text-text-secondary/60">Дата публикации: {publishedAt}</p>
      ) : null}
    </div>
  );
}
