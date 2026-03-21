"use client";

import { useId, type ReactNode } from "react";

export type CardSelectorOption = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
};

export type CardSelectorProps = {
  options: CardSelectorOption[];
  columns: number;
  value: string | null;
  onChange: (value: string) => void;
  disabled?: boolean;
  label?: ReactNode;
  className?: string;
  ariaLabel?: string;
};

export default function CardSelector({
  options,
  columns,
  value,
  onChange,
  disabled: groupDisabled = false,
  label,
  className,
  ariaLabel,
}: CardSelectorProps) {
  const labelId = useId();
  const safeColumns = Math.max(1, Math.floor(columns));

  const isRowDisabled = (option: CardSelectorOption) =>
    groupDisabled || !!option.disabled;

  return (
    <div
      className={["flex w-full flex-col gap-3", className]
        .filter(Boolean)
        .join(" ")}
    >
      {label != null && (
        <h2
          id={labelId}
          className="text-2xl font-bold text-mist-950 dark:text-mist-50"
        >
          {label}
        </h2>
      )}
      <div
        role="radiogroup"
        aria-disabled={groupDisabled || undefined}
        aria-labelledby={label != null ? labelId : undefined}
        aria-label={label != null ? undefined : ariaLabel}
        className="grid w-full gap-4"
        style={{
          gridTemplateColumns: `repeat(${safeColumns}, minmax(0, 1fr))`,
        }}
      >
        {options.map((option, index) => {
          const rowDisabled = isRowDisabled(option);
          const selected = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={rowDisabled}
              onClick={() => onChange(option.value)}
              className={[
                "w-full rounded-2xl border-2 p-4 text-left font-bold transition-colors",
                "disabled:cursor-not-allowed disabled:opacity-50",
                selected
                  ? "border-emerald-500 bg-emerald-500 text-black dark:text-black disabled:border-emerald-500/60 disabled:bg-emerald-500/50"
                  : "border-neutral-300 bg-transparent text-neutral-900 enabled:hover:border-emerald-400 enabled:hover:bg-emerald-500/10 dark:border-neutral-600 dark:text-neutral-100 dark:enabled:hover:border-emerald-500/80",
              ].join(" ")}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
