import { footerLinksData, footerCopyrightData } from "@/content/footer";
import Link from "next/link";
import Image from "next/image";
import KedrionLogo from "@/assets/images/kedrion-logo.png";
import SafetyInformation from "@/components/safety-information/safety-information-disclosure";

const FooterLink = ({ label, href }: { label: string; href: string }) => {
  return (
    <li key={label} className="text-navy text-base font-bold uppercase hover:underline">
      <Link href={href}>{label}</Link>
    </li>
  );
};

const FooterLinks = () => {
  return (
    <ul className="flex flex-col md:flex-row items-start md:items-center justify-start gap-2 md:gap-8 font-sans">
      {footerLinksData.map((link) => FooterLink(link))}
    </ul>
  );
};

export default function Footer() {
  return (
    <div className="relative z-50 mt-auto">
      {/* <SafetyInformation /> */}
      <footer className="border-t border-b-36 border-navy py-8">
        <div className="page-width flex flex-col md:flex-row items-start justify-between gap-8 md:gap-0">
          <div className="space-y-6 flex flex-col items-start justify-center">
            <FooterLinks />
            <div className="font-open-sans text-sm">
              <p>{footerCopyrightData.copyright}</p>
              <p>{footerCopyrightData.trademark}</p>
              <p>{footerCopyrightData.version}</p>
            </div>
          </div>
          <a href="https://www.kedrion.us/" target="_blank" rel="noopener noreferrer">
            <Image src={KedrionLogo} alt="Kedrion Logo" width={212} height={80} className="mx-auto md:mx-0" />
          </a>
        </div>
      </footer>
    </div>
  );
}