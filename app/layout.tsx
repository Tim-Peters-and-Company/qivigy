import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./assets/stylesheets/globals.css";
import Header from "@/components/header/header";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "QIVIGY Infusion Time Calculator",
  description: "Calculate QIVIGY infusion time and rate schedule for first infusion (PI, 300-800 mg/kg).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={openSans.variable}>
      <body className="antialiased font-sans">
        <Header />
        {children}
      </body>
    </html>
  );
}
