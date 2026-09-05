import { getLegal, toHtml } from "@/lib/content";
import { Container } from "./ui";

/** Rendert Impressum / Datenschutz aus content/legal/<slug>.md. */
export default function LegalPage({ slug }: { slug: string }) {
  const doc = getLegal(slug);

  return (
    <article className="block-deep pb-section pt-32 sm:pt-36">
      <Container className="max-w-prose">
        <p className="eyebrow">
          Legale<span className="eyebrow-de">rechtliches</span>
        </p>
        <h1 className="mt-4 text-step-4 font-semibold">{doc.title}</h1>
        {doc.subtitle ? (
          <p className="mt-3 text-step-1 text-latte-dim">{doc.subtitle}</p>
        ) : null}
        <div
          className="prose-gc mt-10"
          dangerouslySetInnerHTML={{ __html: toHtml(doc.body) }}
        />
      </Container>
    </article>
  );
}
