"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import Hero from "./components/Hero";
import StickyHeader from "./components/StickyHeader";
import Project from "./components/Project";
import Cursor from "./components/Cursor";
import Preloader from "./components/Preloader";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef(null);

  return (
    <main ref={ref} className={cn("relative", isLoading && "overflow-hidden")}>
      {isLoading ? (
        <Preloader setIsLoading={setIsLoading} />
      ) : (
        <>
          <Cursor />
        </>
      )}
      <StickyHeader />
      <Hero />
      <Project />
    </main>
  );
}
