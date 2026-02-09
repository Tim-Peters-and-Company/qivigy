import { HomeData } from "@/content/home";
import Image from "next/image";
import BGImage from "@/assets/images/bg.svg";
import BGImageMobile from "@/assets/images/bg-mobile.svg";

export default function Home() {
  return (
    <div className="bg-deep-orange-light flex-1 text-center py-8 pt-[34.821428571%] md:pt-[24%] xl:pt-64 relative">
      <Image src={BGImage} alt="" fill className="object-cover hidden md:block" />
      <Image src={BGImageMobile} alt="" className="block absolute top-0 left-0 w-full md:hidden" />
      <HomeData />
    </div>
  );
}
