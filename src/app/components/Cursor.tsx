import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import React, { useRef, useState, useEffect } from "react";

export default function Cursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [hoverOn, setHoverOn] = useState<string | null>(null);
  const xTo = useRef<gsap.QuickToFunc>();
  const yTo = useRef<gsap.QuickToFunc>();
  const cursor = useRef<HTMLDivElement | null>(null);
  const cursorProject = useRef<SVGSVGElement | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      xTo.current = gsap.quickTo(cursor.current, "x", {
        duration: 0.3,
        ease: "power3.out",
      });
      yTo.current = gsap.quickTo(cursor.current, "y", {
        duration: 0.3,
        ease: "power3.out",
      });
    },
    { scope: cursor },
  );

  const moveCursor = contextSafe((e: MouseEvent) => {
    if (!xTo.current || !yTo.current) return;

    const isTarget = (e.target as HTMLElement).matches("a, button");
    //check if target has a parent with a data-cursor attribute

    yTo.current(e.clientY);
    xTo.current(e.clientX);

    if (isTarget) {
      setIsHovering(true);

      const target = (e.target as HTMLElement).closest("[data-cursor]");

      if (target) {
        setHoverOn(target.getAttribute("data-cursor"));
      } else {
        setHoverOn(null);
      }
    } else {
      setIsHovering(false);
      setHoverOn(null);
    }
  });

  const moveOutOfScreen = contextSafe(() => {
    gsap.to(cursor.current, {
      opacity: 0,
    });
  });

  const moveIntoScreen = contextSafe(() => {
    gsap.to(cursor.current, {
      opacity: 1,
    });
  });

  useEffect(() => {
    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", moveOutOfScreen);
    document.addEventListener("mouseenter", moveIntoScreen);
    return () => {
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", moveOutOfScreen);
      document.removeEventListener("mouseenter", moveIntoScreen);
    };
  }, []);

  return (
    <div
      ref={cursor}
      className="opacity-1 pointer-events-none fixed left-0 top-0 z-[9999] hidden size-[70px] -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full lg:flex"
    >
      <Image src="/images/non-cursor.svg" alt="mouse" fill priority />
      {isHovering && hoverOn === "project" && (
        <svg
          ref={cursorProject}
          width="200"
          height="200"
          viewBox="0 0 200 200"
          className="absolute scale-0 animate-spin-slow overflow-visible opacity-0"
        >
          <defs>
            <path
              id="circlePath"
              d="M 100, 100
               m -75, 0
               a 75,75 0 1,1 150,0
               a 75,75 0 1,1 -150,0"
            />
          </defs>
          <text className="font-body text-white">
            <textPath href="#circlePath" className="fill-current">
              VIEW PROJECTS VIEW PROJECTS VIEW PROJECTS VIEW PROJECTS VIEW
            </textPath>
          </text>
        </svg>
      )}
    </div>
  );
}
