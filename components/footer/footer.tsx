import { footerLinksData, footerCopyrightData } from "@/content/footer";
import Link from "next/link";
import Image from "next/image";
import KedrionLogo from "@/assets/images/kedrion-logo.png";

const FooterLink = ({ label, href }: { label: string; href: string }) => {
  return (
    <li key={label} className="text-navy text-base font-bold uppercase hover:underline">
      <Link href={href}>{label}</Link>
    </li>
  );
};

const FooterLinks = () => {
  return (
    <ul className="flex flex-row items-center justify-start gap-4 md:gap-8 font-sans">
      {footerLinksData.map((link) => FooterLink(link))}
    </ul>
  );
};

export default function Footer() {
  return (
    <footer className="relative z-90 mt-auto border-t border-b-36 border-navy py-8">
      <div className="page-width flex flex-row items-start justify-between">
        <div className="space-y-6 flex flex-col items-start justify-center">
          <FooterLinks />
          <div className="font-open-sans text-sm">
            <p>{footerCopyrightData.copyright}</p>
            <p>{footerCopyrightData.trademark}</p>
            <p>{footerCopyrightData.version}</p>
          </div>
        </div>
        <Image src={KedrionLogo} alt="Kedrion Logo" width={212} height={80} />
      </div>
    </footer>
  );
}