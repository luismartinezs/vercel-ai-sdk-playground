import type { Metadata } from "next";
import { Inter, Teko, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "./header";

const fontSans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const teko = Teko({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-pixel",
});

export const metadata: Metadata = {
  title: "Katas AI Workflow",
  description: "Katas AI Workfow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={cn(
          fontSans.variable,
          teko.variable,
          pressStart2P.variable,
          "font-sans dark flex min-h-screen flex-col p-24 md:max-w-5xl mx-auto md:p-24"
        )}
      >
        <Header />
        <main className="w-full mt-6">{children}</main>
      </body>
    </html>
  );
}
