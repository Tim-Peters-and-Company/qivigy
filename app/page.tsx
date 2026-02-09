import Link from "next/link";
import { HomeData } from "@/content/home";

export default function Home() {
  return (
    <div className="bg-deep-orange-light flex-1 text-center py-8">
      <HomeData />
    </div>
  );
}
