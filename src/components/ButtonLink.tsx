import Link from "next/link";
import type { ComponentProps } from "react";

import {
  buttonSizeClasses,
  buttonVariantClasses,
  type ButtonSize,
  type ButtonVariant,
} from "./buttonStyles";

export type ButtonLinkProps = ComponentProps<typeof Link> & {
  size?: ButtonSize;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  error?: boolean;
};

export default function ButtonLink({
  size = "medium",
  variant = "contained",
  fullWidth = false,
  error = false,
  className,
  ...props
}: ButtonLinkProps) {
  const tone = error ? "error" : "default";
  return (
    <Link
      className={[
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-bold transition-colors",
        fullWidth ? "w-full max-w-none" : "max-w-40",
        buttonVariantClasses[variant][tone],
        buttonSizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
