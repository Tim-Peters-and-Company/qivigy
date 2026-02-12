import { PrimaryNav } from "@/content/header";
import Link from "next/link";
import { cn } from "@/lib/utils";

const DownCaret = () => {
  return (
    <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M8 1.02464L4 4.83467L4 2.87902L6.95007 -4.16105e-08L8 1.02464ZM-4.94448e-08 1.02559L1.04993 0.000885557L4 2.87991L4 4.83556L-4.94448e-08 1.02559Z" fill="white" />
    </svg>
  );
};

export default function PrimaryDropdown() {
  return (
    <ul className="flex flex-row items-center justify-center divide-x divide-white text-[15px] font-medium pb-3">
      {PrimaryNav.map((nav) => (
        <li key={nav.label} className="px-3 transition-all last:pr-0">
          {nav.children?.length ? (
            <div className="relative group">
              <span className={cn(
                "flex flex-row items-center gap-1 font-open-sans relative",
              )}>{nav.label} <DownCaret /></span>

              {/* Invisible bridge so hover survives the gap to the bar bottom */}
              <span className="absolute top-full left-0 right-0 h-4 pointer-events-none group-hover:pointer-events-auto" aria-hidden />

              <ul className={cn(
                "hidden group-hover:flex",
                "flex-col gap-3 p-3",
                "absolute top-full left-[-17px] right-[-17px] mt-[12px]",
                "bg-deep-orange-light text-foreground",
                "border border-deep-orange",
                "rounded-b-xl",
                "text-[15px]"
              )}>
                {nav.children.map((child) => (
                  <li key={child.label} className="leading-none">
                    <Link href={child.href} className="hover:underline py-0.5">
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <Link href={nav.href ?? "/"} className="font-open-sans hover:underline">{nav.label}</Link>
          )}
        </li>
      ))}
    </ul>
  );
}