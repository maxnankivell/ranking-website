import type { ComponentProps } from "react";

type ButtonSize = "small" | "medium" | "large";

const sizeClasses: Record<ButtonSize, string> = {
  small: "h-9 px-3 text-sm",
  medium: "h-12 px-5 text-base",
  large: "h-14 px-6 text-lg",
};

export type ButtonProps = ComponentProps<"button"> & {
  size?: ButtonSize;
};

export default function Button({
  size = "medium",
  className,
  type,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type ?? "button"}
      className={[
        "flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-emerald-500 font-bold text-black transition-colors hover:bg-emerald-600 md:w-[158px] disabled:cursor-not-allowed",
        sizeClasses[size],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
