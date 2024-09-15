"use client";

import dynamic from "next/dynamic";
import { Suspense, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { cn } from "@/lib/utils";

import Hero from "./components/Hero";
import StickyHeader from "./components/StickyHeader";
import ProjectDesktop from "./components/ProjectSections/ProjectDesktop";
import Cursor from "./components/Cursor";
import Introduce from "./components/Introduce";
import AboutMe from "./components/AboutMe";
import NoiseFilterSVG from "@/app/components/NoiseFilterSVG";
import useScreen from "@/app/hooks/useScreen";
import HeroTest from "@/app/components/HeroTest";
import Contact from "@/app/components/Contact";

const Preloader = dynamic(() => import("./components/Preloader"), {
  ssr: false,
});

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef(null);

  return (
    <main ref={ref} className={cn("relative", isLoading && "overflow-hidden")}>
      {isLoading ? (
        <Suspense
          fallback={<div className="fixed inset-0 z-20 flex bg-black"></div>}
        >
          <Preloader setIsLoading={setIsLoading} />
        </Suspense>
      ) : (
        <>
          <Cursor />
        </>
      )}
      <StickyHeader />

      {/*<Hero isFinishLoading={!isLoading} />*/}
      <HeroTest />
      <Introduce />
      <ProjectDesktop isFinishLoading={!isLoading} />
      <AboutMe />
      <Contact />

      <NoiseFilterSVG />
    </main>
  );
}
