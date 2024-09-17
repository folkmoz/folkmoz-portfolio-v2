"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { cn } from "@/lib/utils";

import StickyHeader from "./components/StickyHeader";
import ProjectDesktop from "./components/ProjectSections/ProjectDesktop";
import Cursor from "./components/Cursor";
import Introduce from "./components/Introduce";
import AboutMe from "./components/AboutMe";
import NoiseFilterSVG from "@/app/components/NoiseFilterSVG";
import HeroTest from "@/app/components/HeroTest";
import Contact from "@/app/components/Contact";
import { ReactLenis } from "lenis/react";

const Preloader = dynamic(() => import("./components/Preloader"), {
  ssr: false,
});

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.clearScrollMemory("manual");

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isLoading]);

  return (
    <ReactLenis root>
      <main className={cn("relative")}>
        {isLoading ? (
          <Suspense
            fallback={<div className="fixed inset-0 z-20 flex bg-black"></div>}
          >
            <Preloader setIsLoading={setIsLoading} />
          </Suspense>
        ) : (
          <>{/*<Cursor />*/}</>
        )}
        <StickyHeader />

        <HeroTest />
        <Introduce />
        <ProjectDesktop />
        <AboutMe />
        <Contact />
        <NoiseFilterSVG />
      </main>
    </ReactLenis>
  );
}
