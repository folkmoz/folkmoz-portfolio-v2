import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import React, { useRef, useState, useEffect } from "react";

export default function Cursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [hoverOn, setHoverOn] = useState<string | null>(null);
  const [text, setText] = useState("Click");
  const xTo = useRef<gsap.QuickToFunc>();
  const yTo = useRef<gsap.QuickToFunc>();
  const cursor = useRef<HTMLDivElement | null>(null);
  const cursorProject = useRef<SVGSVGElement | null>(null);
  const tooltip = useRef<HTMLSpanElement | null>(null);

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

    const isLink = (e.target as HTMLElement).matches("a, button");
    //check if target has a parent with a data-cursor attribute
    const isTarget =
      (e.target as HTMLElement).closest("[data-cursor=project]") !== null;
    if (isTarget) setText("Visit");
    else setText("Click");

    if (isLink) {
      setHoverOn("link");
    } else if (isTarget) {
      setHoverOn("project");
      gsap.to(cursorProject.current, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
      });
    }

    // xTo.current(e.clientX + (isTarget ? 0 : 10));
    // yTo.current(e.clientY + (isTarget ? 0 : 20));

    xTo.current(e.clientX);
    yTo.current(e.clientY);

    gsap.to(cursor.current, {
      // mixBlendMode: isTarget ? "normal" : "difference",
      // width: isTarget ? 120 : 20,
      // height: isTarget ? 120 : 20,
      rotate: e.movementX < 0 ? -10 : 20,
      // duration: 0.4,
      ease: "power1",
    });

    if (tooltip.current) {
      gsap.to(tooltip.current, {
        opacity: isTarget ? 1 : 0,
        duration: 0.8,
      });
    }

    if (isTarget) setIsHovering(true);
    else {
      setIsHovering(false);
    }
  });

  const moveOutOfScreen = contextSafe(() => {
    if (!xTo.current || !yTo.current) return;

    gsap.to(cursor.current, {
      opacity: 0,
    });
  });

  const moveIntoScreen = contextSafe(() => {
    if (!xTo.current || !yTo.current) return;

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
      className="opacity-1 pointer-events-none fixed left-0 top-0 z-[9999] flex size-[70px] -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full"
    >
      <Image src="/images/non-cursor.svg" alt="mouse" fill priority />
      {isHovering && hoverOn === "project" && (
        <svg
          ref={cursorProject}
          width="200"
          height="200"
          viewBox="0 0 200 200"
          className="duration-[10s] animate-spin-slow absolute scale-0 overflow-visible opacity-0"
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
