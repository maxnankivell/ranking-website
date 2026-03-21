import type { ComponentProps } from "react";

const linkClassName =
  "font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline";

export type ExternalLinkProps = ComponentProps<"a">;

export default function ExternalLink({
  className,
  target = "_blank",
  rel,
  ...props
}: ExternalLinkProps) {
  const resolvedRel =
    rel ?? (target === "_blank" ? "noopener noreferrer" : undefined);

  return (
    <a
      className={[linkClassName, className].filter(Boolean).join(" ")}
      target={target}
      rel={resolvedRel}
      {...props}
    />
  );
}
