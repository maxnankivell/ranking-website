import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AddData() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <h1>Add Data</h1>
      <p>This is a add data page.</p>
    </div>
  );
}
