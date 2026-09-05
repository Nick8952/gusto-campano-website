import type { Metadata } from "next";
import { getLegal } from "@/lib/content";
import LegalPage from "@/components/LegalPage";

const doc = getLegal("datenschutz");

export const metadata: Metadata = {
  title: doc.seoTitle ?? doc.title,
  description: doc.seoDescription,
  robots: { index: false, follow: true },
};

export default function DatenschutzPage() {
  return <LegalPage slug="datenschutz" />;
}
