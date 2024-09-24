"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useLenis } from "lenis/react";

import StickyHeader, { sections } from "./components/StickyHeader";
import ProjectDesktop from "./components/ProjectSections/ProjectDesktop";
import Introduce from "./components/Introduce";
import AboutMe from "./components/AboutMe";
import NoiseFilterSVG from "@/app/components/NoiseFilterSVG";
import HeroTest from "@/app/components/HeroTest";
import LegacyContact from "@/app/components/Lagacy-Contact";
import Preloader from "@/app/components/Preloader";
import useScreen from "@/app/hooks/useScreen";
import ProjectMobile from "@/app/components/ProjectSections/ProjectMobile";
import { cn, repeat, sleep } from "@/lib/utils";
import { X } from "lucide-react";
import AnimatedText from "@/app/components/AnimatedText";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [activeSection, setActiveSection] = useState(sections[0]);
  const modalMenuRef = useRef<HTMLDivElement>(null);

  const lenis = useLenis();
  const { isMobile, screen } = useScreen();

  const scrollToTarget = async (target: string) => {
    const targetSection = document.querySelector(target!.replace(" ", "-"));

    if (target !== "#home" && target !== "#contacts") {
      const targetY =
        targetSection!.getBoundingClientRect().top + window.scrollY;
      lenis!.scrollTo(targetY, { duration: 3 });
    } else {
      if (target === "#home") {
        lenis!.scrollTo(0, { duration: 3 });
      }

      if (target === "#contacts") {
        lenis!.scrollTo(document.body.scrollHeight, { duration: 3 });
      }
    }

    return (window.location.hash = target!);
  };

  const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    let isFreeze = false;

    if (isOpenMenu) {
      closeMenu();
      isFreeze = true;
    }

    const target = e.currentTarget.getAttribute("href");

    if (target) {
      if (isFreeze) {
        sleep(1500).then(() => scrollToTarget(target));
      } else {
        scrollToTarget(target);
      }
    }
  };

  const openMenu = () => {
    setIsOpenMenu(true);

    lenis?.stop();
    document.body.style.overflow = "hidden";

    const divChildren = modalMenuRef.current?.querySelectorAll(
      ":scope > div:not(:last-child)",
    );

    if (divChildren) {
      gsap.to(divChildren, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.5,
        ease: "power4.inOut",
      });

      const lastChild = modalMenuRef.current?.querySelector(
        ":scope > div:last-child",
      );

      gsap.to(lastChild!, {
        delay: 1,
        opacity: 1,
        duration: 1,
        ease: "power4.inOut",
      });
    }
  };

  const closeMenu = () => {
    lenis?.start();
    document.body.style.overflow = "auto";

    const divChildren = modalMenuRef!.current?.querySelectorAll(
      ":scope > div:not(:last-child)",
    );

    if (divChildren) {
      const lastChild = modalMenuRef.current?.querySelector(
        ":scope > div:last-child",
      );

      console.log(lastChild);

      gsap.to(lastChild!, {
        opacity: 0,
        duration: 1,
        ease: "power4.inOut",
      });

      divChildren.forEach((child, index) => {
        gsap.to(child, {
          clipPath:
            index % 2 === 0 ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)",
          duration: 1.5,
          ease: "power4.inOut",
        });
      });

      setTimeout(() => {
        setIsOpenMenu(false);
        gsap.to("#mobile-menu", {
          duration: 0.5,
          scale: 1,
          opacity: 1,
          ease: "power4.inOut",
        });
      }, 1500);
    }
  };

  useEffect(() => {
    // detect and update active section
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sectionPositions = sections.map((section) => {
        const sectionElement = document.getElementById(
          section.replace(" ", "-"),
        );
        return sectionElement ? sectionElement.offsetTop - 100 : 0;
      });

      for (let i = 0; i < sectionPositions.length; i++) {
        if (
          scrollPosition >= sectionPositions[i] &&
          scrollPosition < sectionPositions[i + 1]
        ) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      <main className="realative">
        {isLoading && <Preloader setIsLoading={setIsLoading} />}

        <StickyHeader openMenu={openMenu} onLinkClick={onLinkClick} />
        <HeroTest />
        <Introduce />
        {isMobile ? <ProjectMobile /> : <ProjectDesktop />}
        <AboutMe />
        <LegacyContact />
        <NoiseFilterSVG />

        <div
          className={cn("fixed inset-0 z-[9999]", {
            hidden: !isOpenMenu,
          })}
        >
          <div ref={modalMenuRef} className="flex h-full w-full -space-x-1">
            {screen.width > 0 &&
              repeat(isMobile ? 3 : 6).map((index) => (
                <div
                  data-index={index}
                  style={{
                    width: Math.ceil(screen.width / (isMobile ? 3 : 6)) + "px",
                    clipPath:
                      index % 2 === 0
                        ? "inset(0% 0% 100% 0%)"
                        : "inset(100% 0% 0% 0%)",
                  }}
                  key={index}
                  className={cn("h-full bg-white")}
                ></div>
              ))}
            <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-4 p-4 text-center opacity-0 lg:grid lg:justify-items-start lg:gap-0 lg:p-16 lg:text-left">
              <div className="absolute right-6 top-6 cursor-pointer transition-all duration-200 ease-in-out hover:rotate-90 lg:right-24 lg:top-14">
                <X
                  size={isMobile ? 24 : 48}
                  onClick={closeMenu}
                  className="text-foreground"
                />
              </div>
              {sections.map((section, index) => (
                <a
                  key={index}
                  href={`#${section}`}
                  onClick={onLinkClick}
                  className={cn("text-6xl font-bold lg:text-[10vw]", {
                    italic: activeSection === section,
                    "opacity-50": activeSection !== section,
                  })}
                >
                  <div>{section}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
