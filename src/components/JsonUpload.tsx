"use client";

import { useRef, useState } from "react";
import { useRankingData } from "../contexts/RankingDataContext";
import type { RankingData } from "../types/RankingData";

function validateAndParse(raw: unknown): RankingData[] {
  if (!Array.isArray(raw)) {
    throw new Error("JSON must be an array");
  }

  return raw.map((entry, i) => {
    if (typeof entry !== "object" || entry === null || Array.isArray(entry)) {
      throw new Error(`Entry at index ${i} is not an object`);
    }

    const obj = entry as Record<string, unknown>;

    if (typeof obj.title !== "string" || obj.title.trim() === "") {
      throw new Error(
        `Entry at index ${i} is missing a valid "title" (string)`,
      );
    }

    const item: RankingData = { title: obj.title.trim() };

    if (obj.image !== undefined) {
      if (typeof obj.image !== "string") {
        throw new Error(`Entry at index ${i}: "image" must be a string`);
      }
      item.image = obj.image;
    }

    if (obj.rank !== undefined) {
      if (typeof obj.rank !== "number") {
        throw new Error(`Entry at index ${i}: "rank" must be a number`);
      }
      item.rank = obj.rank;
    }

    if (obj.tier !== undefined) {
      if (typeof obj.tier !== "string") {
        throw new Error(`Entry at index ${i}: "tier" must be a string`);
      }
      item.tier = obj.tier;
    }

    return item;
  });
}

export default function JsonUpload() {
  const { addItems } = useRankingData();
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [successCount, setSuccessCount] = useState<number | null>(null);

  function handleFile(file: File) {
    setError(null);
    setSuccessCount(null);

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string);
        const items = validateAndParse(parsed);
        if (items.length === 0) {
          setError("JSON array is empty");
          return;
        }
        addItems(items);
        setSuccessCount(items.length);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Invalid JSON file");
      }
    };
    reader.onerror = () => setError("Failed to read file");
    reader.readAsText(file);
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold text-subheading">Add items via JSON</h2>

      <label
        className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-neutral-400 px-6 py-8 text-sm transition-colors hover:border-emerald-500 dark:border-neutral-600 dark:hover:border-emerald-500"
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const file = e.dataTransfer.files[0];
          if (file) handleFile(file);
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
        <span className="text-subheading">
          Drop a JSON file here or click to browse
        </span>
      </label>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {successCount !== null && (
        <p className="text-sm text-emerald-500">
          Successfully added {successCount}{" "}
          {successCount === 1 ? "entry" : "entries"}
        </p>
      )}
    </div>
  );
}
