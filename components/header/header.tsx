import HeaderUtility from "@/components/header/header-utility";
import HeaderLogo from "@/components/header/header-logo";
import { Button } from "../ui/button";
import { PrimaryNav } from "@/content/header";
import Link from "next/link";

export default function Header() {
  return (
    <header
      className="flex flex-col items-center justify-start text-white"
      style={{ background: "var(--Linear)" }}
    >
      <HeaderUtility />

      <div className="max-width pt-6 pb-1 flex flex-row items-stretch justify-between">
        <HeaderLogo />

        <div className="flex flex-col justify-between items-end self-stretch">
          <Button variant="ghost-outline" size="xs">Contact a Rep</Button>
          <ul className="flex flex-row items-center justify-center divide-x divide-white text-[15px] font-medium pb-3">
            {PrimaryNav.map((nav) => (
              <li key={nav.label} className="px-2 hover:underline whitespace-nowrap transition-all last:pr-0">
                <Link href={nav.href}>{nav.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}