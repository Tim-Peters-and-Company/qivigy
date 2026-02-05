import Link from "next/link";
import { cn } from "@/lib/utils";
import { headerUtilityLinksData } from "@/content/header";

const headerUtilityLink = ({ label, href }: { label: string; href: string }) => {
  return (
    <li className="px-3 md:px-5 hover:underline whitespace-nowrap last:pr-0" key={label}>
      <Link href={href}>{label}</Link>
    </li>
  );
};

const headerUtilityLinks = headerUtilityLinksData.map((link) => headerUtilityLink(link));

export default function HeaderUtility() {
  return (
    <div className={cn(
      "bg-navy text-white py-2.5 w-full",
      "font-open-sans text-[9px] md:text-xs",
      "header-shadow"
    )}>
      <div className="max-width flex flex-row items-center justify-center md:justify-between">
        <p className="hidden md:block w-full text-center">For Healthcare Professionals</p>
        <ul className="flex divide-x divide-white/50">
          {headerUtilityLinks}
        </ul>
      </div>
    </div>
  );
}