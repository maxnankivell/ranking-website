import type { ComponentProps } from "react";

type ButtonSize = "small" | "medium" | "large";
type ButtonVariant = "contained" | "outlined";

const sizeClasses: Record<ButtonSize, string> = {
  small: "py-1 px-5 text-sm",
  medium: "py-3 px-8 text-base",
  large: "py-5 px-12 text-lg",
};

const variantClasses: Record<ButtonVariant, string> = {
  contained:
    "border-2 border-transparent bg-emerald-500 text-black hover:bg-emerald-600 disabled:bg-emerald-500/50 disabled:hover:bg-emerald-500/50",
  outlined:
    "border-2 border-emerald-500 bg-transparent text-black hover:bg-emerald-500/10 dark:text-white disabled:border-emerald-500/40 disabled:text-black/50 dark:disabled:text-white/50 disabled:hover:bg-transparent",
};

export type ButtonProps = ComponentProps<"button"> & {
  size?: ButtonSize;
  variant?: ButtonVariant;
  fullWidth?: boolean;
};

export default function Button({
  size = "medium",
  variant = "contained",
  fullWidth = false,
  className,
  type,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type ?? "button"}
      className={[
        "flex cursor-pointer items-center justify-center gap-2 rounded-full font-bold transition-colors disabled:cursor-not-allowed",
        fullWidth ? "w-full max-w-none" : "max-w-40",
        variantClasses[variant],
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
