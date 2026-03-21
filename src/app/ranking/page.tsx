import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function Ranking() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <h1>Ranking</h1>
      <p>This is a ranking page.</p>
    </div>
  );
}
