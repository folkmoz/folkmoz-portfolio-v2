"use client";

import { useEffect, useState } from "react";
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
import LegacyContact from "@/app/components/Lagacy-Contact";
import Preloader from "@/app/components/Preloader";
import { useLenis } from "lenis/react";
import useScreen from "@/app/hooks/useScreen";
import ProjectMobile from "@/app/components/ProjectSections/ProjectMobile";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const lenis = useLenis();

  const { isMobile } = useScreen();

  useEffect(() => {
    ScrollTrigger.clearScrollMemory("manual");

    if (isLoading) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      lenis?.start();
      document.body.style.overflow = "auto";
    }
  }, [isLoading, lenis]);

  return (
    <>
      <main className={cn("relative")}>
        {!isLoading ? (
          <Preloader setIsLoading={setIsLoading} />
        ) : (
          <>{/*<Cursor />*/}</>
        )}
        <StickyHeader />

        <HeroTest />
        <Introduce />
        {isMobile ? <ProjectMobile /> : <ProjectDesktop />}
        <AboutMe />
        {/*<Contact />*/}
        <LegacyContact />
        <NoiseFilterSVG />
      </main>
    </>
  );
}
