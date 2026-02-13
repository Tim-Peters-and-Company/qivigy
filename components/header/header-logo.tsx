import Image from "next/image";
import Link from "next/link";
import qivigyLogo from "@/assets/images/qivigy-logo.png";

export default function HeaderLogo() {
  return (
    <h1 className="text-4xl font-bold mb-3 mt-4 md:mt-1 md:mb-3 ml-2 md:ml-0">
      <Link href="/">
        <Image src={qivigyLogo} alt="QIVIGY Logo" width={200} height={100} className="w-[150px] md:w-[200px]" />
        <span className="sr-only">QIVIGY</span>
      </Link>
    </h1>
  );
}