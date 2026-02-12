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

      <div className="bg-deep-orange-light flex-1 text-center py-8 pt-[125px] md:pt-[155px] xl:pt-[155px] relative">
        <p className={cn(
          "absolute top-3 md:top-4 left-0 w-full text-center z-50 text-deep-orange font-bold text-xl md:text-2xl tracking-widest"
        )}>NOW AVAILABLE</p>
        <Image src={BGImage} alt="" fill className="object-cover hidden md:block relative" />
        <Image src={BGImageMobile} alt="" className="block absolute top-0 left-0 w-full md:hidden" />
        <Headline className="absolute top-[5%] sm:top-[6%] md:top-[7.5%] left-0 right-0 w-full max-w-[650px] mx-auto z-40 text-navy px-4" />
        <HomeData />
      </div>
    </>
  );
}
