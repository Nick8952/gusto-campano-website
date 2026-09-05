/**
 * Warm-heller Zitat-Block – die bewusste Punktierung im dunklen Verlauf
 * der Seite. Sparsam einsetzen (einmal auf Start, einmal «Über uns»).
 */
export default function PullQuote({
  quote,
  author,
}: {
  quote: string;
  author?: string;
}) {
  return (
    <figure className="mx-auto max-w-3xl text-center">
      <blockquote className="font-display text-step-3 italic leading-tight text-carbone">
        <span aria-hidden="true" className="text-brace">
          «
        </span>
        {quote}
        <span aria-hidden="true" className="text-brace">
          »
        </span>
      </blockquote>
      {author ? (
        <figcaption className="mt-5 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-carbone/55">
          {author}
        </figcaption>
      ) : null}
    </figure>
  );
}
