import menuData from "@/data/menu.json";

export type Dish = {
  name: string;
  sub?: string;
  desc?: string;
  price: string;
  tags: string[];
  heat: number;
  image?: string;
  signature?: boolean;
};

export type MenuCategory = {
  id: string;
  name: string;
  subtitle?: string;
  dishes: Dish[];
};

export type MenuData = {
  intro?: string;
  allergyNote?: string;
  categories: MenuCategory[];
};

export const menu = menuData as MenuData;

/** Filter der interaktiven Karte. `test` entscheidet pro Gericht. */
export type MenuFilter = {
  id: string;
  labelIt: string;
  labelDe: string;
  /** erscheint über dem Raster, sobald der Filter aktiv ist */
  note: string;
  test: (d: Dish) => boolean;
};

export const MENU_FILTERS: MenuFilter[] = [
  {
    id: "tutte",
    labelIt: "Tutte",
    labelDe: "alles",
    note: "Die ganze Karte, so wie sie heute Abend gilt.",
    test: () => true,
  },
  {
    id: "classiche",
    labelIt: "Classiche",
    labelDe: "Klassiker",
    note: "Die Pizze, die es in jeder guten Pizzeria in Neapel gibt – und bei uns.",
    test: (d) => d.tags.includes("classica"),
  },
  {
    id: "bianche",
    labelIt: "Bianche",
    labelDe: "ohne Tomate",
    note: "Weisse Pizza – Fior di Latte statt Sugo, oft erst nach dem Ofen belegt.",
    test: (d) => d.tags.includes("bianca"),
  },
  {
    id: "piccanti",
    labelIt: "Piccanti",
    labelDe: "scharf",
    note: "Mit Chili, 'Nduja oder scharfer Salami. Die Flammen zeigen wie deutlich.",
    test: (d) => d.heat > 0,
  },
  {
    id: "mare",
    labelIt: "Mare",
    labelDe: "Fisch & Meer",
    note: "Sardellen, Muscheln, Garnelen, Stockfisch – die Küche der Küste.",
    test: (d) => d.tags.includes("mare"),
  },
  {
    id: "vegetariane",
    labelIt: "Vegetariane",
    labelDe: "vegetarisch",
    note: "Ohne Fleisch und Fisch. Nicht als Verzicht gedacht, sondern als eigene Idee.",
    test: (d) => d.tags.includes("vegetariana"),
  },
];

export function countMatches(filter: MenuFilter): number {
  return menu.categories.reduce(
    (n, c) => n + c.dishes.filter(filter.test).length,
    0,
  );
}

/** Gerichte für die Startseiten-Vorschau (Feld `signature: true`). */
export function signatureDishes(): Dish[] {
  return menu.categories.flatMap((c) => c.dishes.filter((d) => d.signature));
}
