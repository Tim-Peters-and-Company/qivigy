export default function PageLayout({ children, pageTitle }: { children: React.ReactNode, pageTitle: string }) {
  return (
    <div>
      <div className="page-title bg-deep-orange text-white pt-16 pb-20 z-20 relative">
        <h1 className="font-bold page-width text-5xl">{pageTitle}</h1>
      </div>

      <main className="relative -mt-5 pt-10">
        <div className="bg-linear-to-b from-deep-orange-light to-white absolute top-0 left-0 h-[300px] w-full"></div>

        <div className="page-width relative z-10">
          {children}
        </div>
      </main>
    </div>
  )
}