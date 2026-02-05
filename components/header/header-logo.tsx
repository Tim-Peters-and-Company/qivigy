import Image from "next/image";
import qivigyLogo from "@/app/assets/images/qivigy-logo.png";

export default function HeaderLogo() {
  return (
    <h1 className="text-4xl font-bold mb-4">
      <Image src={qivigyLogo} alt="QIVIGY Logo" width={233} height={100} />
      <span className="sr-only">QIVIGY</span>
    </h1>
  );
}