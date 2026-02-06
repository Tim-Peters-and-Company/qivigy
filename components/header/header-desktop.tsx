import HeaderLogo from "./header-logo";
import HeaderUtility from "./header-utility";
import PrimaryDropdown from "../nav/primary-dropdown";
import { Button } from "../ui/button";

export default function HeaderDesktop() {
  return (
    <header
      className="flex flex-col items-center justify-start text-white relative z-50"
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