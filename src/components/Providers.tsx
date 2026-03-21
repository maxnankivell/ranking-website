"use client";

import { RankingDataProvider } from "../contexts/RankingDataContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <RankingDataProvider>{children}</RankingDataProvider>;
}
