import type { ElementType, ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-shell px-gutter ${className}`}>
      {children}
    </div>
  );
}

/**
 * Sektion mit Farbblock. `tone` steuert Grund + Textfarbe; die
 * dunkel-dominante Seite wechselt sparsam auf `pietra` und noch seltener
 * auf den warm-hellen `panna`-Block.
 */
export function Section({
  children,
  tone = "carbone",
  className = "",
  id,
  as: Tag = "section",
}: {
  children: ReactNode;
  tone?: "carbone" | "deep" | "pietra" | "panna";
  className?: string;
  id?: string;
  as?: ElementType;
}) {
  return (
    <Tag id={id} className={`block-${tone} py-section ${className}`}>
      {children}
    </Tag>
  );
}
