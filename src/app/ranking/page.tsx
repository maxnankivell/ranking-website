import { Press_Start_2P } from "next/font/google";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <h1>Ranking</h1>
      <p className={pressStart2P.className}>This is a ranking page.</p>
    </div>
  );
}
