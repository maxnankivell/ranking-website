import type { Metadata } from "next";
import { Suspense } from "react";
import ComparisonsClient from "./ComparisonsClient";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function Comparisons() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <Suspense fallback={null}>
        <ComparisonsClient />
      </Suspense>
    </div>
  );
}
