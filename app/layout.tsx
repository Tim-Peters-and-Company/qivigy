import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/header";

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
    <html lang="en">
      <body
        className="antialiased"
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
