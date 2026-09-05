import type { Hero } from "@/lib/content";
import { Container } from "./ui";

/**
 * Kopf der Unterseiten. Ruhiger als der Start-Hero: nur die zweisprachige
 * Überzeile, der Titel mit «carta»-Linie und ein Leadtext.
 */
export default function PageHero({ hero }: { hero: Hero }) {
  return (
    <section className="block-deep border-b-2 border-dotted border-crosta pb-10 pt-32 sm:pb-12 sm:pt-36">
      <Container>
        <p className="eyebrow">
          {hero.eyebrowIt}
          {hero.eyebrowDe ? (
            <>
              <span aria-hidden="true" className="text-latte-mute">
                ·
              </span>
              <span className="eyebrow-de">{hero.eyebrowDe}</span>
            </>
          ) : null}
        </p>

        <div className="mt-4 flex items-end gap-4">
          <h1 className="max-w-3xl text-step-4 font-semibold">{hero.title}</h1>
          <span className="leader hidden sm:block" aria-hidden="true" />
        </div>

        {hero.lead ? (
          <p className="mt-5 max-w-2xl text-step-1 leading-relaxed text-latte-dim">
            {hero.lead}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
