import { SITE_URL, addressLine, site } from "@/lib/site";
import { menu } from "@/lib/menu";

const DAY_MAP: Record<string, string> = {
  Montag: "Monday",
  Dienstag: "Tuesday",
  Mittwoch: "Wednesday",
  Donnerstag: "Thursday",
  Freitag: "Friday",
  Samstag: "Saturday",
  Sonntag: "Sunday",
};

/**
 * Strukturierte Daten (Restaurant) für Google. Öffnungszeiten werden aus
 * data/site.json abgeleitet; jeder Zeitbereich ergibt eine Spezifikation.
 */
export default function JsonLd() {
  const openingHours = site.hours.flatMap((h) => {
    if (/geschlossen/i.test(h.value)) return [];
    return h.value.split("·").flatMap((part) => {
      const m = part.trim().match(/(\d{1,2}:\d{2}).*?(\d{1,2}:\d{2})/);
      if (!m) return [];
      return [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: DAY_MAP[h.day] ?? h.day,
          opens: m[1],
          closes: m[2],
        },
      ];
    });
  });

  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.legalName,
    alternateName: site.name,
    description: site.blurb,
    url: SITE_URL,
    image: `${SITE_URL}/img/hero-forno.jpg`,
    servesCuisine: ["Neapolitanisch", "Italienisch", "Pizza"],
    priceRange: "$$",
    telephone: site.phoneTel,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.zip,
      addressLocality: site.address.city,
      addressRegion: "ZH",
      addressCountry: "CH",
    },
    areaServed: site.region,
    foundingDate: site.foundedYear,
    sameAs: [site.instagram].filter(Boolean),
    openingHoursSpecification: openingHours,
    hasMenu: {
      "@type": "Menu",
      name: "Speisekarte",
      hasMenuSection: menu.categories.map((c) => ({
        "@type": "MenuSection",
        name: c.name,
        hasMenuItem: c.dishes.map((d) => ({
          "@type": "MenuItem",
          name: d.name,
          description: d.desc,
          offers: {
            "@type": "Offer",
            price: d.price,
            priceCurrency: "CHF",
          },
        })),
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
