import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "@/assets/stylesheets/globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import SafetyInformation from "@/components/safety-information/safety-information";
import { DialogUSOnly } from "@/components/dialog/dialog-us-only";
import { DialogLeavingSite } from "@/components/dialog/dialog-leaving-site";

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
    <html lang="en" className={`${openSans.variable} scroll-smooth`}>
      <body className="antialiased font-sans min-h-screen flex flex-col relative" id="top">
        <Header />
        {children}
        <SafetyInformation />
        <Footer />
        <DialogUSOnly />
        <DialogLeavingSite />
      </body>
    </html>
  );
}
