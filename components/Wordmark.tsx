import PeakMark from "./PeakMark";

/**
 * Bildmarke + Wortmarke, an das Logo des Hauses angelehnt:
 * «Gusto» im Salbeigrün, «Campano» im Weinrot – wie auf dem Emblem.
 * Die Kursive von Piazzolla ist der typografische Eigenwille der Seite.
 */
export default function Wordmark({
  size = "sm",
}: {
  size?: "sm" | "lg";
}) {
  const mark = size === "lg" ? "h-11 w-11" : "h-9 w-9";
  const text = size === "lg" ? "text-[1.6rem]" : "text-[1.15rem]";

  return (
    <span className="flex items-center gap-2.5 leading-none">
      <PeakMark className={`${mark} shrink-0 text-oliva-hi`} chili={size === "lg"} />
      <span className={`font-display ${text} tracking-[-0.01em]`}>
        <span className="text-oliva-hi">Gusto</span>{" "}
        <span className="italic text-brace-hi">Campano</span>
      </span>
    </span>
  );
}
