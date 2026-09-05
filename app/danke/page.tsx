import type { Metadata } from "next";
import Link from "next/link";
import { getPage, type Hero } from "@/lib/content";
import { Container } from "@/components/ui";
import { site } from "@/lib/site";
import { IconArrowRight, IconPhone } from "@/components/Icons";

const page = getPage("danke");

export const metadata: Metadata = {
  title: page.seoTitle,
  description: page.seoDescription,
  robots: { index: false, follow: false },
};

export default function DankePage() {
  const hero = (page.hero ?? {}) as Hero;

  return (
    <section className="block-deep flex min-h-[70vh] items-center pb-section pt-32 sm:pt-36">
      <Container className="max-w-prose">
        <p className="eyebrow">
          {hero.eyebrowIt}
          <span aria-hidden="true" className="text-latte-mute">
            ·
          </span>
          <span className="eyebrow-de">{hero.eyebrowDe}</span>
        </p>
        <h1 className="mt-4 text-step-4 font-semibold">{hero.title}</h1>
        <p className="mt-5 text-step-1 leading-relaxed text-latte-dim">
          {hero.lead}
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-fiamma">
            Zur Startseite
            <IconArrowRight className="h-4 w-4" />
          </Link>
          <a href={`tel:${site.phoneTel}`} className="btn btn-outline">
            <IconPhone className="h-4 w-4" />
            {site.phoneDisplay}
          </a>
        </div>
      </Container>
    </section>
  );
}
