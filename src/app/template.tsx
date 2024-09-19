"use client";
import { ReactLenis } from "lenis/react";

export default function RootTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ReactLenis root>{children}</ReactLenis>;
}
