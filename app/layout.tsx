import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
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
      <body className={cn(fontSans.className, "dark flex min-h-screen flex-col items-center justify-between p-24 md:max-w-5xl mx-auto p-4 md:p-24")}>{children}</body>
    </html>
  );
}
