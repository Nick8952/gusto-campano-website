import { img } from "@/lib/site";
import gallery from "@/data/gallery.json";
import Reveal from "./Reveal";

type GalleryImage = { src: string; alt: string; span?: string };

/**
 * Bilderwand. `span: "wide"` = zwei Spalten, `span: "tall"` = zwei Reihen –
 * so entsteht ein unregelmässiges Raster statt gleichförmiger Kacheln.
 * `limit` kappt die Zahl für die Startseite.
 */
export default function GalleryWall({ limit }: { limit?: number }) {
  const images: GalleryImage[] = limit
    ? gallery.images.slice(0, limit)
    : gallery.images;

  return (
    <div className="grid grid-flow-row-dense auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[220px] lg:grid-cols-4">
      {images.map((im, i) => (
        <Reveal
          key={im.src + i}
          delay={(i % 4) * 0.05}
          className={[
            "group relative overflow-hidden rounded-card border border-crosta/70",
            im.span === "wide" ? "col-span-2" : "",
            im.span === "tall" ? "row-span-2" : "",
          ].join(" ")}
        >
          <img
            src={img(im.src)}
            alt={im.alt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-forno group-hover:scale-[1.06]"
          />
          <span className="pointer-events-none absolute inset-0 bg-carbone-deep/10 transition-colors duration-300 group-hover:bg-carbone-deep/0" />
        </Reveal>
      ))}
    </div>
  );
}
