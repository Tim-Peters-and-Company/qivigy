import HeaderLogo from "./header-logo";
import HeaderUtility from "./header-utility";
import { Button } from "../ui/button";
import { useState } from "react";
import PrimaryAccordion from "../nav/primary-accordion";

const BarsIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="29" height="22" viewBox="0 0 29 22" fill="none">
      <rect width="29" height="4" fill="white" />
      <rect y="9" width="29" height="4" fill="white" />
      <rect y="18" width="29" height="4" fill="white" />
    </svg>
  );
};

export default function HeaderMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div
        className="flex flex-col items-center justify-start text-white font-open-sans"
        style={{ background: "var(--Linear)" }}>

        <HeaderUtility />

        <div className="max-width flex flex-row items-center justify-between">
          <HeaderLogo />
          <Button variant="ghost-outline" size="xs">Contact a Rep</Button>

          <div className="flex flex-col items-center gap-2 relative -top-2">
            <p className="text-[9px] font-semibold">For HCPs</p>
            <button onClick={toggleMenu}>
              <BarsIcon />
              <span className="sr-only">Toggle navigation</span>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <PrimaryAccordion />
      )}
    </header>
  );
}