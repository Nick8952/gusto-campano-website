import StampMark from "./StampMark";

/**
 * Bildmarke + Wortmarke. `size` regelt Kopfzeile vs. Fuss.
 * «Gusto» aufrecht, «Campano» kursiv – die Kursive von Piazzolla ist der
 * kleine typografische Eigenwille, der sich durch die ganze Seite zieht.
 */
export default function Wordmark({
  size = "sm",
}: {
  size?: "sm" | "lg";
}) {
  const stamp = size === "lg" ? "h-12 w-12" : "h-9 w-9";
  const text = size === "lg" ? "text-[1.6rem]" : "text-[1.15rem]";

  return (
    <span className="flex items-center gap-2.5 leading-none">
      <StampMark className={`${stamp} shrink-0`} />
      <span className={`font-display ${text} tracking-[-0.01em] text-latte`}>
        Gusto <span className="italic text-fiamma">Campano</span>
      </span>
    </span>
  );
}
