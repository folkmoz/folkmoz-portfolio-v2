"use client";

import { ReactLenis } from "lenis/react";
import { useEffect } from "react";

export default function RootTemplate({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return <ReactLenis root>{children}</ReactLenis>;
}
