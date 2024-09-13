import "./globals.css";

import type { Metadata } from "next";
import { Rubik_Doodle_Shadow } from "next/font/google";
import localFont from "next/font/local";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import TailwindcssIndicator from "./components/TailwindcssIndicator";

const fontBody = localFont({
  src: [
    {
      path: "./fonts/Satoshi-Bold.otf",
      weight: "bold",
    },
    {
      path: "./fonts/Satoshi-Regular.otf",
      weight: "normal",
    },
    {
      path: "./fonts/Satoshi-Medium.otf",
      weight: "500",
    },
  ],
  variable: "--font-body",
});

const fontHeading = localFont({
  src: [
    {
      path: "./fonts/Alpino-Bold.otf",
      weight: "bold",
    },
    {
      path: "./fonts/Alpino-Regular.otf",
      weight: "normal",
    },
  ],
  variable: "--font-heading",
});

// const font = Rubik_Doodle_Shadow({
//   weight: ["400"],
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-heading",
// });

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
        className={cn(
          "bg-[#f5f8fa] antialiased",
          fontHeading.variable,
          fontBody.variable,
        )}
      >
        {children}
        <TailwindcssIndicator />
      </body>
    </html>
  );
}
