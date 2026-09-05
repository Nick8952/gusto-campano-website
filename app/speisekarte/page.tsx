import type { Metadata } from "next";
import { getPage, type Hero } from "@/lib/content";
import { Container } from "@/components/ui";
import PageHero from "@/components/PageHero";
import InteractiveMenu from "@/components/InteractiveMenu";
import { menu } from "@/lib/menu";

const page = getPage("speisekarte");

export const metadata: Metadata = {
  title: page.seoTitle,
  description: page.seoDescription,
};

export default function SpeisekartePage() {
  const hero = (page.hero ?? {}) as Hero;

  return (
    <>
      <PageHero hero={hero} />
      <section className="block-carbone py-14 sm:py-16">
        <Container>
          {menu.intro ? (
            <p className="max-w-2xl text-step-1 leading-relaxed text-latte-dim">
              {menu.intro}
            </p>
          ) : null}
          <div className="mt-10">
            <InteractiveMenu />
          </div>
        </Container>
      </section>
    </>
  );
}
