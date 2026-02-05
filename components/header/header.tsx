"use client"

import HeaderDesktop from "./header-desktop";
import HeaderMobile from "./header-mobile";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Header() {
  const isMobile = useIsMobile();

  return (
    isMobile ? <HeaderMobile /> : <HeaderDesktop />
  );
}