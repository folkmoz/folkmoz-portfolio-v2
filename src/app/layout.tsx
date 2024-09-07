import "./globals.css";

import type { Metadata } from "next";
import { Rubik_Doodle_Shadow } from "next/font/google";
import localFont from "next/font/local";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";

const font = Rubik_Doodle_Shadow({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontHeading = localFont({
  src: "./fonts/Bileha.otf",
  weight: "normal",
  variable: "--font-heading",
});

const fontBody = localFont({
  src: "./fonts/Avenis.otf",
  variable: "--font-body",
  weight: "normal",
});

export const metadata: Metadata = {
  title: `${DATA.name} - Portfolio`,
  description: "folkmoz is a personal portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("bg-black antialiased", font.variable, fontBody.variable)}
      >
        {children}
      </body>
    </html>
  );
}
