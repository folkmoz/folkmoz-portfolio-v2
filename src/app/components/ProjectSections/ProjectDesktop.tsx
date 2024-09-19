import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { ScrollTrigger, Flip } from "gsap/all";
import { DATA } from "@/data/resume";

import SectionDescribe from "../SectionDescribe";
import { cn } from "@/lib/utils";
import { splitLetters } from "@/app/helpers/splitText";
import ProjectDetail from "@/app/components/ProjectSections/ProjectDetail";

gsap.registerPlugin(Flip);

export default function ProjectDesktop() {
  const [disableCursor, setDisableCursor] = useState(true);
  const [isEntered, setIsEntered] = useState(false);
  const [isViewed, setIsViewed] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const pinned = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const projectDetailRef = useRef<HTMLDivElement>(null);

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
      x: x + 70,
      y: y + cursor.clientHeight * 0.4,
      duration: 0.5,
    });
  };

  const onProjectClick = () => {
    if (isClosing || !isEntered) return;
    const titles = titleRef.current?.children;

    if (!titles) return;

    const currentTitle = titles[currentProject] as HTMLDivElement;
    const letters = currentTitle.querySelectorAll("span");

    const tl = gsap.timeline({
      paused: true,
      onStart: () => {
        document.body.style.overflow = "hidden";
        document.body.style.marginRight = "-17px";
        document.body.style.paddingRight = "17px";
      },
    });

    tl.to(cursorRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      ease: "power3.inOut",
    }).to(
      letters,
      {
        yPercent: -100 * currentProject - 100,
        ease: "power3.inOut",
        stagger: 0.02,
        onComplete: () => setIsViewed(true),
      },
      "-=0.2",
    );
    tl.to(
      imagesRef.current,
      {
        clipPath: "inset(0% 0% 100% 0%)",
        opacity: 0,
        duration: 1,
        ease: "power3.inOut",
      },
      "-=0.5",
    );

    tl.play();
  };

  const onProjectClose = () => {
    const titles = titleRef.current?.children;

    if (!titles) return;

    setIsClosing(true);

    const currentTitle = titles[currentProject] as HTMLDivElement;
    const letters = currentTitle.querySelectorAll("span");

    const tl = gsap.timeline({
      paused: true,
      onStart: () => {
        document.body.style.overflow = "visible";
        document.body.style.marginRight = "0";
        document.body.style.paddingRight = "0";
      },
      onComplete: () => {
        setIsViewed(false);
        if (projectDetailRef.current) {
          projectDetailRef.current.style.clipPath = "inset(0% 0% 0% 0%)";
          setTimeout(() => {
            projectDetailRef.current!.style.display = "block";
            setIsClosing(false);
          }, 500);
        }
      },
    });
    gsap.to("#mobile-menu", {
      scale: 1,
      duration: 0.5,
      delay: 0.5,
    });

    tl.to(projectDetailRef.current, {
      clipPath: "inset(100% 0% 0% 0%)",
      ease: "power2",
      duration: 0.7,
    }).to(imagesRef.current, {
      clipPath: "inset(0% 0% 0% 0%)",
      opacity: 1,
      duration: 1,
      ease: "power3.inOut",
      onComplete: () => {
        if (projectDetailRef.current) {
          projectDetailRef.current.style.display = "none";
        }
      },
    });
    tl.to(
      letters,
      {
        yPercent: -100 * currentProject,
        ease: "power3.inOut",
        stagger: 0.02,
      },
      "-=0.5",
    ).to(cursorRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: "power3.inOut",
    });

    tl.play();
  };

  useLenis(
    (lenis) => {
      if (isViewed) {
        lenis.stop();
      } else {
        lenis.start();
      }
    },
    [isViewed],
  );

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
          // invalidateOnRefresh: true,
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

  const project = DATA.projects.fullDev[currentProject];

  return (
    <>
      <section
        id="project"
        className="relative min-h-svh overflow-hidden bg-foreground pb-[20vh]"
      >
        <div className="px-8 lg:px-16">
          <SectionDescribe title="selected works" />
        </div>

        <div
          ref={pinned}
          className={cn("relative grid min-h-screen place-items-center", {
            "cursor-pointer": isEntered && !isViewed,
          })}
        >
          <div
            ref={projectDetailRef}
            data-lenis-prevent="true"
            className={cn(
              "fixed inset-0 z-[999] mr-[-17px] bg-foreground/20 px-4 pt-24 backdrop-blur-lg transition-all lg:bg-foreground/40 lg:px-16 lg:pt-32 xl:px-20",
              isViewed ? "opacity-100" : "opacity-0",
              isClosing
                ? "overflow-hidden"
                : "overflow-x-hidden overflow-y-scroll",
              {
                "pointer-events-none": !isViewed,
              },
            )}
          >
            {isViewed && (
              <ProjectDetail project={project} onClose={onProjectClose} />
            )}
          </div>

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
            onClick={onProjectClick}
            onMouseLeave={() => setDisableCursor(true)}
            onMouseEnter={() => setDisableCursor(false)}
            ref={imagesRef}
            data-cursor="project"
            className="absolute inset-0 mx-auto grid w-full max-w-screen-2xl grid-cols-1 place-items-center gap-y-20"
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
