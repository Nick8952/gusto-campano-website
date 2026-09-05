import type { Metadata } from "next";
import { getPage, type Hero } from "@/lib/content";
import { Container, Section } from "@/components/ui";
import PageHero from "@/components/PageHero";
import GalleryWall from "@/components/GalleryWall";
import gallery from "@/data/gallery.json";

const page = getPage("galerie");

export const metadata: Metadata = {
  title: page.seoTitle,
  description: page.seoDescription,
};

export default function GaleriePage() {
  const hero = (page.hero ?? {}) as Hero;

  return (
    <>
      <PageHero hero={hero} />
      <Section tone="carbone">
        <Container>
          <GalleryWall />
          {gallery.intro ? (
            <p className="mt-8 max-w-2xl border-t-2 border-dotted border-crosta pt-5 font-mono text-[0.72rem] leading-relaxed text-latte-mute">
              {gallery.intro}
            </p>
          ) : null}
        </Container>
      </Section>
    </>
  );
}
