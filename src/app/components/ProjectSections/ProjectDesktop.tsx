import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { DATA } from "@/data/resume";

import SectionDescribe from "../SectionDescribe";
import { cn } from "@/lib/utils";
import { splitLetters } from "@/app/helpers/splitText";

export default function ProjectDesktop() {
  const [disableCursor, setDisableCursor] = useState(true);
  const [isEntered, setIsEntered] = useState(false);

  const pinned = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  const [currentProject, setCurrentProject] = useState(0);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isEntered) return;

    const { clientX, clientY } = e;

    const cursor = cursorRef.current!;

    const x = clientX - cursor.clientWidth / 2;
    const y = clientY - cursor.clientHeight / 2;

    gsap.to(cursor, {
      scale: 1.2,
      top: 0,
      left: 0,
      xPercent: -50,
      yPercent: -50,
      x: x + 10,
      y: y + cursor.clientHeight * 0.4,
      duration: 0.5,
    });
  };

  useGSAP(
    () => {
      const titles = titleRef.current!.querySelectorAll("div");

      titles.forEach((title, i) => {
        const letters = title.querySelectorAll("span");
        const genAnimationProps = (yPercent: number) => ({
          yPercent,
          ease: "power3.inOut",
          stagger: 0.02,
        });

        ScrollTrigger.create({
          trigger: pinned.current,
          start: () => "top -" + window.innerHeight * i,
          end: () => "+=" + window.innerHeight,
          toggleActions: "play none reverse none",
          invalidateOnRefresh: true,
          onEnter: () => {
            setCurrentProject(i);
            gsap.to(letters, {
              ...genAnimationProps(-100 * i),
            });
          },
          onLeave: () => {
            gsap.to(letters, {
              ...genAnimationProps(-100 * (i + 1)),
            });
          },
          onToggle: () => {
            setCurrentProject(i);
            gsap.to(letters, {
              ...genAnimationProps(-100 * i),
            });
          },
          onLeaveBack: () => {
            setCurrentProject(i);
            gsap.to(letters, {
              ...genAnimationProps(100 * i),
            });
          },
        });
      });

      const images = imagesRef.current!.querySelectorAll(
        "div:not(:last-child)",
      );
      images.forEach((image, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinned.current,
            start: () => "top -" + window.innerHeight * (i + 0.5),
            end: () => "+=" + window.innerHeight,
            scrub: true,
            toggleActions: "play none reverse none",
            invalidateOnRefresh: true,
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
        onToggle: ({ isActive }) => {
          setIsEntered(isActive);
        },
      });
    },
    {
      scope: pinned,
    },
  );

  useEffect(() => {
    if (disableCursor || !isEntered) {
      gsap.to(cursorRef.current, {
        scale: 1.35,
        top: "50%",
        left: "50%",
        xPercent: "-50",
        yPercent: "-50",
        x: 0,
        y: 20,
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
  }, [disableCursor, isEntered]);

  return (
    <>
      <section
        id="project"
        className={cn(
          "relative min-h-screen overflow-hidden bg-foreground px-4 pb-[20vh] lg:px-16",
          {
            "cursor-pointer": isEntered,
          },
        )}
      >
        <SectionDescribe title="selected projects" />

        <div
          ref={pinned}
          className={cn("relative grid min-h-screen place-items-center", {
            "pointer-events-none": !isEntered,
          })}
        >
          <div className="relative flex h-full w-full items-center justify-center">
            <div
              ref={cursorRef}
              className={cn(
                "pointer-events-none absolute left-1/2 top-1/2 z-50 grid size-[150px] -translate-x-1/2 place-items-center rounded-full border border-white",
              )}
            >
              <div className="flex items-center text-white">View project</div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 z-[1] grid grid-cols-1 items-end justify-center px-16">
            <div
              ref={titleRef}
              className={"relative w-full overflow-hidden text-white"}
            >
              {DATA.projects.fullDev.map((project, index) => (
                <div
                  key={project.title + index}
                  style={{
                    opacity: currentProject === index ? 1 : 0.2,
                    width: "100%",
                    top: "0",
                    position: !index ? "relative" : "absolute",
                    transform: `translateY(${index * 100}%)`,
                  }}
                  className={cn(
                    "origin-bottom-right text-center font-body font-bold leading-none transition-opacity",
                    project.title.length > 10 ? "text-[9vw]" : "text-[10vw]",
                  )}
                >
                  {splitLetters(project.title)}
                </div>
              ))}
            </div>
          </div>

          <div
            onMouseMove={onMouseMove}
            onMouseLeave={() => setDisableCursor(true)}
            onMouseEnter={() => setDisableCursor(false)}
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
                className="pointer-events-none absolute top-1/2 block aspect-video w-full -translate-y-1/2 overflow-hidden rounded-[1rem] before:pointer-events-none before:absolute before:inset-0 before:z-[1] before:bg-black/60"
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
