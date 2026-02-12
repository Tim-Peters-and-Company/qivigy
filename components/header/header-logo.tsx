import Image from "next/image";
import Link from "next/link";
import qivigyLogo from "@/assets/images/qivigy-logo.png";

export default function HeaderLogo() {
  return (
    <h1 className="text-4xl font-bold mb-4 mt-3 md:mt-0">
      <Link href="/">
        <Image src={qivigyLogo} alt="QIVIGY Logo" width={200} height={100} className="w-[150px] md:w-[200px]" />
        <span className="sr-only">QIVIGY</span>
      </Link>
    </h1>
  );
}