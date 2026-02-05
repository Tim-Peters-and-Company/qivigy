import Link from "next/link";
import classNames from "classnames";
import { headerUtilityLinksData } from "@/app/content/header";

const headerUtilityLink = ({ label, href }: { label: string; href: string }) => {
  return (
    <li className="px-5 hover:underline whitespace-nowrap">
      <Link href={href}>{label}</Link>
    </li>
  );
};

const headerUtilityLinks = headerUtilityLinksData.map((link) => headerUtilityLink(link));

export default function HeaderUtility() {
  return (
    <div className={classNames(
      "bg-navy text-white py-2.5 w-full text-xs",
      "header-shadow"
    )}>
      <div className="max-width flex flex-row items-center justify-between">
        <p className="w-full text-center">For Healthcare Professionals</p>
        <ul className="flex divide-x divide-white/50 px-4">
          {headerUtilityLinks}
        </ul>
      </div>
    </div>
  );
}