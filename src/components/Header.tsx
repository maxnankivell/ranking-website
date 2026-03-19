import Image from "next/image";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 h-16 border-b border-foreground/10">
      <div className="flex items-center gap-3">
        <Image
          src="/general/Logo.svg"
          alt="Objective Rankings logo"
          width={32}
          height={32}
          unoptimized
        />
        <span className="font-bold text-lg tracking-tight">
          Objective Rankings
        </span>
      </div>
      <ThemeSwitcher />
    </header>
  );
}
