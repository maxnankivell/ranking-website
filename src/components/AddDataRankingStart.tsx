"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "./Button";
import ToggleButton from "./ToggleButton";

type AddDataRankingStartProps = {
  className?: string;
};

export default function AddDataRankingStart({
  className,
}: AddDataRankingStartProps) {
  const router = useRouter();
  const [flow, setFlow] = useState<"comparison" | "ranking">("comparison");
  const [rankType, setRankType] = useState<"ordered" | "tierlist">("ordered");

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
          value={rankType}
          onChange={(v) => setRankType(v as "ordered" | "tierlist")}
        />
      </div>
      <Button
        type="button"
        variant="contained"
        onClick={() => router.push(`${path}?type=${rankType}`)}
      >
        Start
      </Button>
    </section>
  );
}
