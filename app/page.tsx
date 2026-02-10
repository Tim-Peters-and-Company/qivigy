import { HomeData } from "@/content/home";
import Image from "next/image";
import BGImage from "@/assets/images/bg.svg";
import BGImageMobile from "@/assets/images/bg-mobile.svg";
import { Headline } from "@/components/icons/headline";
import { cn } from "@/lib/utils";
import { StudyDesignContent } from "@/content/study-design";

export default function Home() {
  return (
    <>
      <StudyDesignContent />

      <div className="bg-deep-orange-light flex-1 text-center py-8 pt-[34.821428571%]  md:pt-64 relative">
        <p className={cn(
          "absolute top-4 md:top-10 left-0 w-full text-center z-50 text-deep-orange font-bold text-xl md:text-3xl tracking-widest"
        )}>NOW AVAILABLE</p>
        <Image src={BGImage} alt="" fill className="object-cover hidden md:block" />
        <Image src={BGImageMobile} alt="" className="block absolute top-0 left-0 w-full md:hidden" />
        <Headline className="absolute top-[7.5%] sm:top-[10%] md:top-[14.5%] left-0 right-0 w-full max-w-[850px] mx-auto z-40 text-navy px-4" />
        <HomeData />
      </div>
    </>
  );
}
