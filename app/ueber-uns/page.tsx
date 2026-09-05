import type { Metadata } from "next";
import { getPage, toHtml, type Hero } from "@/lib/content";
import { img } from "@/lib/site";
import { Container, Section } from "@/components/ui";
import PageHero from "@/components/PageHero";
import SectionHead from "@/components/SectionHead";
import CraftSteps from "@/components/CraftSteps";
import IngredientCards from "@/components/IngredientCards";
import PullQuote from "@/components/PullQuote";
import Reveal from "@/components/Reveal";
import about from "@/data/about.json";

const page = getPage("ueber-uns");

export const metadata: Metadata = {
  title: page.seoTitle,
  description: page.seoDescription,
};

export default function UeberUnsPage() {
  const hero = (page.hero ?? {}) as Hero;

  return (
    <>
      <PageHero hero={hero} />

      <Section tone="carbone">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr]">
            <div
              className="prose-gc max-w-prose"
              dangerouslySetInnerHTML={{ __html: toHtml(page.body ?? "") }}
            />
            <Reveal className="space-y-4">
              <div className="overflow-hidden rounded-card border border-crosta">
                <img
                  src={img("sala-1.jpg")}
                  alt="Warm beleuchteter Gastraum am Abend"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-card border border-crosta">
                <img
                  src={img("costiera.jpg")}
                  alt="Küste Kampaniens"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="pietra">
        <Container>
          <SectionHead
            it="Il metodo"
            de="dal grano al forno"
            title={about.craftHeading}
            lead={about.craftLead}
          />
          <CraftSteps />
        </Container>
      </Section>

      <Section tone="carbone">
        <Container>
          <SectionHead
            it="La materia prima"
            de="woher es kommt"
            title={about.ingredientsHeading}
            lead="Was nicht aus Kampanien oder von einem Produzenten mit Namen kommt, steht nicht auf der Karte."
          />
          <IngredientCards />
        </Container>
      </Section>

      <Section tone="panna">
        <Container>
          <PullQuote
            quote={String(page.quote ?? about.quote)}
            author={String(page.quoteAuthor ?? about.quoteAuthor)}
          />
        </Container>
      </Section>
    </>
  );
}
