import type { ComponentProps } from "react";

type ButtonSize = "small" | "medium" | "large";
type ButtonVariant = "contained" | "outlined";

const sizeClasses: Record<ButtonSize, string> = {
  small: "h-9 px-3 text-sm",
  medium: "h-12 px-5 text-base",
  large: "h-14 px-6 text-lg",
};

const variantClasses: Record<ButtonVariant, string> = {
  contained:
    "bg-emerald-500 text-black hover:bg-emerald-600 disabled:bg-emerald-500/50 disabled:hover:bg-emerald-500/50",
  outlined:
    "border-2 border-emerald-500 bg-transparent text-emerald-700 hover:bg-emerald-500/10 disabled:border-emerald-500/40 disabled:text-emerald-700/50 disabled:hover:bg-transparent",
};

export type ButtonProps = ComponentProps<"button"> & {
  size?: ButtonSize;
  variant?: ButtonVariant;
};

export default function Button({
  size = "medium",
  variant = "contained",
  className,
  type,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type ?? "button"}
      className={[
        "flex w-full cursor-pointer items-center justify-center gap-2 rounded-full font-bold transition-colors md:w-[158px] disabled:cursor-not-allowed",
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
