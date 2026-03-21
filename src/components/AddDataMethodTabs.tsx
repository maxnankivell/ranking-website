"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { dataMethods } from "../constants/dataMethods";
import ExternalLink from "./ExternalLink";
import JsonUpload from "./JsonUpload";
import ManualAdd from "./ManualAdd";

function isMethodDisabled(method: (typeof dataMethods)[number]): boolean {
  return method.disabled === true || method.label.includes("(Coming soon)");
}

type AddDataMethodTabsProps = {
  className?: string;
};

export default function AddDataMethodTabs({
  className,
}: AddDataMethodTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const enabledMethods = dataMethods.filter(
    (method) => !isMethodDisabled(method),
  );
  const enabledMethodValues = enabledMethods.map((method) => method.value);
  const defaultMethod = enabledMethodValues[0] ?? "";
  const queryMethod = searchParams.get("method");
  const selectedMethod = enabledMethodValues.includes(queryMethod ?? "")
    ? (queryMethod as string)
    : defaultMethod;

  return (
    <section
      className={["flex w-full flex-col gap-4", className]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        role="tablist"
        aria-label="Add data method tabs"
        className="flex flex-wrap border-b border-neutral-300 dark:border-neutral-700"
      >
        {dataMethods.map((method) => {
          const selected = method.value === selectedMethod;
          const disabled = isMethodDisabled(method);
          return (
            <button
              key={method.value}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-disabled={disabled}
              disabled={disabled}
              className={[
                "px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors",
                selected
                  ? "border-emerald-500 text-heading"
                  : "border-transparent text-subheading",
                disabled
                  ? "cursor-not-allowed opacity-60"
                  : "cursor-pointer hover:text-heading hover:border-neutral-400 dark:hover:border-neutral-500",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => {
                if (disabled) return;
                const nextParams = new URLSearchParams(searchParams.toString());
                nextParams.set("method", method.value);
                router.replace(`${pathname}?${nextParams.toString()}`);
              }}
            >
              {method.label}
            </button>
          );
        })}
      </div>
      <div className="flex flex-col gap-4">
        {/* <h2 className="text-2xl font-bold text-heading">
          {selectedMethodLabel}
        </h2> */}
        {selectedMethod === "backloggd" && (
          <p className="max-w-3xl text-lg leading-8 mb-4 text-subheading">
            Backloggd does not provide a public API for us to use so you will
            need to use our data scraping tool to get your data and then use the
            json upload utility. You can download the latest version for your
            operating system from{" "}
            <ExternalLink href="https://github.com/maxnankivell/backloggd-scraper/releases">
              here
            </ExternalLink>{" "}
            there is an exe for windows and binaries for linux and macos. If you
            need more information on how to use the tool, you can find it on the
            readme page{" "}
            <ExternalLink href="https://github.com/maxnankivell/backloggd-scraper?tab=readme-ov-file#install">
              here
            </ExternalLink>{" "}
          </p>
        )}
        <JsonUpload />
        <ManualAdd />
      </div>
    </section>
  );
}
