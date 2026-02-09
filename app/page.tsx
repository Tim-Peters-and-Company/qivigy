import { HomeData } from "@/content/home";
import Image from "next/image";
import BGImage from "@/assets/images/bg.svg";

export default function Home() {
  return (
    <div className="bg-deep-orange-light flex-1 text-center py-8 pt-48 relative">
      <Image src={BGImage} alt="" fill className="object-cover" />
      <HomeData />
    </div>
  );
}
