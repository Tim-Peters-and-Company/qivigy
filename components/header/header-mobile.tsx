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

const CloseIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 411 411" fill="none">
      <path d="M67.9 22.7L45.3 0L0 45.3L22.6 67.9L160 205.3L22.6 342.7L0 365.3L45.3 410.6L67.9 387.9L205.3 250.6L342.6 387.9L365.3 410.6L410.5 365.3L387.9 342.7L250.5 205.3L387.9 67.9L410.5 45.3L365.3 0L342.6 22.7L205.3 160L67.9 22.7Z" fill="white" />
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
          <Button variant="ghost-outline" size="xs" href="/connect">Contact a Rep</Button>

          <div className="flex flex-col items-center gap-2 relative -top-2">
            <p className="text-[9px] font-semibold">For HCPs</p>
            <button onClick={toggleMenu} className="hover:cursor-pointer">
              {isMenuOpen ? <CloseIcon /> : <BarsIcon />}
              <span className="sr-only">Toggle navigation</span>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <PrimaryAccordion onNavigate={() => setIsMenuOpen(false)} />
      )}
    </header>
  );
}