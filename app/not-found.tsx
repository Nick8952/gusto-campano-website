import Link from "next/link";
import { Container } from "@/components/ui";
import { IconArrowRight } from "@/components/Icons";

export const metadata = {
  title: "Seite nicht gefunden",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="block-deep flex min-h-[70vh] items-center pb-section pt-32 sm:pt-36">
      <Container className="max-w-prose">
        <p className="eyebrow">
          404<span className="eyebrow-de">nicht gefunden</span>
        </p>
        <h1 className="mt-4 text-step-4 font-semibold">
          Diese Seite gibt es nicht
        </h1>
        <p className="mt-5 text-step-1 leading-relaxed text-latte-dim">
          Vielleicht hilft die Speisekarte weiter – oder Sie gehen zurück zur
          Startseite.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-fiamma">
            Zur Startseite
            <IconArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/speisekarte/" className="btn btn-outline">
            Zur Speisekarte
          </Link>
        </div>
      </Container>
    </section>
  );
}
