import { cn } from "@/lib/utils";

export default function PageLayout({ children, pageTitle }: { children: React.ReactNode, pageTitle: string }) {
  return (
    <div>
      <div className={cn(
        "page-title",
        "bg-deep-orange text-white",
        "pt-10 md:pt-16 pb-10 md:pb-20",
        "z-20 relative",
        "text-center md:text-left"
      )}>
        <h1 className="font-bold page-width text-4xl md:text-5xl">{pageTitle}</h1>
      </div>

      <main className="relative -mt-5 pt-10">
        <div className="bg-linear-to-b from-deep-orange-light to-white absolute top-0 left-0 h-[300px] w-full"></div>

        <div className="relative z-10">
          {children}
        </div>
      </main>
    </div>
  )
}