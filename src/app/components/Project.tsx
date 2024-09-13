import Image from "next/image";
import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { DATA } from "@/data/resume";

import { Antic_Didone } from "next/font/google";
import SectionDescribe from "./SectionDescribe";
import { cn } from "@/lib/utils";

const font = Antic_Didone({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-body",
});

export default function Project({
  isFinishLoading = false,
}: {
  isFinishLoading: boolean;
}) {
  const container = useRef<HTMLDivElement | null>(null);
  const pinned = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);

  const [currentProject, setCurrentProject] = useState(0);

  useGSAP(() => {
    const titles = titleRef.current!.querySelectorAll("div");

    titles.forEach((title, i) => {
      ScrollTrigger.create({
        trigger: pinned.current,
        start: () => "top -" + window.innerHeight * i,
        end: () => "+=" + window.innerHeight,
        toggleActions: "play none reverse none",
        // invalidateOnRefresh: true,
        onEnter: () => {
          setCurrentProject(i);
          gsap.to(titleRef.current, {
            y: -100 * i + "vh",
            ease: "power2.inOut",
          });
        },
        onToggle: () => {
          setCurrentProject(i);
          gsap.to(titleRef.current, {
            y: -100 * i + "vh",
            ease: "power2.inOut",
          });
        },
        onLeaveBack: () => {
          setCurrentProject(i);
          gsap.to(titleRef.current, {
            y: -100 * i + "vh",
            ease: "power2.inOut",
          });
        },
      });
    });

    const images = imagesRef.current!.querySelectorAll("div:not(:last-child)");
    images.forEach((image, i) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinned.current,
          start: () => "top -" + window.innerHeight * (i + 0.5),
          end: () => "+=" + window.innerHeight,
          scrub: true,
          toggleActions: "play none reverse none",
          // invalidateOnRefresh: true,
        },
      });

      tl.to(image, {
        clipPath: "inset(0% 0% 100% 0%)",
      });
    });

    ScrollTrigger.create({
      trigger: pinned.current,
      start: "top top",
      end: `+=${DATA.projects.fullDev.length * window.innerHeight}`,
      scrub: true,
      pin: true,
    });
  }, []);

  return (
    <>
      <section
        id="project"
        className="relative min-h-screen overflow-hidden bg-foreground px-16 pb-[20vh]"
      >
        <SectionDescribe title="selected projects" />

        <div
          ref={pinned}
          className="relative grid min-h-screen place-items-center"
        >
          <div className="pointer-events-none absolute inset-0 z-[1] grid items-end justify-items-end px-16">
            <div ref={titleRef} className={"relative w-full text-white"}>
              {DATA.projects.fullDev.map((project, index) => (
                <div
                  key={project.title + index}
                  style={{
                    opacity: currentProject === index ? 1 : 0.2,
                    width: "100%",
                    top: "0",
                    position: !index ? "relative" : "absolute",
                    transform: `translateY(${index * 100}vh)`,
                  }}
                  className={cn(
                    "origin-bottom-right text-right font-body font-bold",
                    project.title.length > 10 ? "text-[8vw]" : "text-[10vw]",
                  )}
                >
                  {project.title}
                </div>
              ))}
            </div>
          </div>

          <div
            ref={imagesRef}
            data-cursor="project"
            className="absolute inset-0 w-full"
          >
            {DATA.projects.fullDev.map((project, index) => (
              <div
                key={project.title + index + "project"}
                style={{
                  zIndex: -index,
                  scale: 0.9,
                }}
                className="absolute top-1/2 block aspect-video w-full -translate-y-1/2 cursor-pointer overflow-hidden rounded-[1rem] before:pointer-events-none before:absolute before:inset-0 before:z-[1] before:bg-black/60"
              >
                <Image
                  src={project.image}
                  alt={`${project.title}'s image`}
                  fill
                  quality={100}
                  priority
                  className="w-full max-w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
