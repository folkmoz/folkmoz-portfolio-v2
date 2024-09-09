"use client";

import dynamic from "next/dynamic";
import { Suspense, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import Hero from "./components/Hero";
import StickyHeader from "./components/StickyHeader";
import Project from "./components/Project";
import Cursor from "./components/Cursor";
import { cn } from "@/lib/utils";
import Introduce from "./components/Introduce";

const Preloader = dynamic(() => import("./components/Preloader"), {
  ssr: false,
});

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
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

      <Hero isFinishLoading={!isLoading} />
      <Introduce />
      <Project isFinishLoading={!isLoading} />
      <section className="relative grid h-screen w-full place-items-center bg-white">
        <h1 className="font-body text-5xl">
          <span className="text-8xl">Contacts section is here!</span>
        </h1>
      </section>

      {/* <div className="absolute -right-60 top-[40vh] rotate-12">
          <Image
            src="/images/monster.png"
            alt="Monster"
            width={700}
            height={700}
            quality={100}
            priority
          />
        </div> */}
    </main>
  );
}
