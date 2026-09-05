import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export type Hero = {
  eyebrowIt?: string;
  eyebrowDe?: string;
  title?: string;
  titleLine1?: string;
  titleAccent?: string;
  lead?: string;
};

/** Seiten-Texte aus content/pages/<slug>.md – im CMS unter «Seiten-Texte». */
export type PageContent = {
  seoTitle: string;
  seoDescription: string;
  hero?: Hero;
  body?: string;
  /** Startseite und «Über uns» tragen zusätzliche Felder – lose typisiert. */
  [key: string]: unknown;
};

export type LegalContent = {
  title: string;
  subtitle?: string;
  seoTitle?: string;
  seoDescription?: string;
  body: string;
};

function read(dir: string, slug: string) {
  const file = path.join(process.cwd(), "content", dir, `${slug}.md`);
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { data, content };
}

export function getPage(slug: string): PageContent {
  const { data, content } = read("pages", slug);
  return {
    ...(data as Record<string, unknown>),
    body: (data.body as string | undefined) ?? content ?? "",
  } as PageContent;
}

export function getLegal(slug: string): LegalContent {
  const { data, content } = read("legal", slug);
  return {
    ...(data as Record<string, unknown>),
    body: (data.body as string | undefined) ?? content ?? "",
  } as LegalContent;
}

export function toHtml(markdown: string): string {
  return marked.parse(markdown ?? "", { async: false }) as string;
}
