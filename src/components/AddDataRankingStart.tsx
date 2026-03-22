"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import {
  parseRankingFlowParam,
  parseRankingFormatParam,
} from "../utils/queryStringUtilities";
import ButtonLink from "./ButtonLink";
import ToggleButton from "./ToggleButton";

type AddDataRankingStartProps = {
  className?: string;
};

export default function AddDataRankingStart({
  className,
}: AddDataRankingStartProps) {
  const searchParams = useSearchParams();
  const [flow, setFlow] = useState<"comparison" | "ranking">(() =>
    parseRankingFlowParam(searchParams.get("rankingflow")),
  );
  const [format, setFormat] = useState<"ordered" | "tierlist">(() =>
    parseRankingFormatParam(searchParams.get("rankingformat")),
  );

  const path = flow === "comparison" ? "/comparisons" : "/ranking";

  return (
    <section
      className={[
        "flex w-full flex-col gap-4 items-center sm:items-start",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <h2 className="text-2xl font-bold text-subheading">
        Choose your ranking flow
      </h2>

      <div className="flex w-full flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
        <ToggleButton
          aria-label="Ranking flow"
          options={[
            { value: "comparison", label: "Comparison" },
            { value: "ranking", label: "Manual" },
          ]}
          value={flow}
          onChange={(v) => setFlow(v as "comparison" | "ranking")}
        />
        <ToggleButton
          aria-label="Ranking format"
          options={[
            { value: "ordered", label: "Ordered" },
            { value: "tierlist", label: "Tier List" },
          ]}
          value={format}
          onChange={(v) => setFormat(v as "ordered" | "tierlist")}
        />
      </div>
      <ButtonLink href={`${path}?format=${format}`} variant="contained">
        Start
      </ButtonLink>
    </section>
  );
}
