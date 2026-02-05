import HeaderUtility from "@/components/header/header-utility";
import HeaderLogo from "@/components/header/header-logo";
import { Button } from "../ui/button";
import PrimaryDropdown from "../nav/primary-dropdown";

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
          <PrimaryDropdown />
        </div>
      </div>
    </header>
  );
}