import Image from "next/image";
import qivigyLogo from "@/app/assets/images/qivigy-logo.png"
import HeaderUtility from "@/components/header/header-utility";

export default function Header() {
  return (
    <header
      className="flex flex-col items-center justify-start text-white"
      style={{ background: "var(--Linear)" }}
    >
      <HeaderUtility />

      <div className="max-width pt-6 pb-1">
        <h1 className="text-4xl font-bold mb-4">
          <Image src={qivigyLogo} alt="QIVIGY Logo" width={233} height={100} />
          <span className="sr-only">QIVIGY</span>
        </h1>
      </div>
    </header>
  );
}