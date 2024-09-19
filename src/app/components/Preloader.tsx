"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import useScreen from "@/app/hooks/useScreen";

export default function Preloader({
  setIsLoading,
}: {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const container = useRef(null);
  const pathRef = useRef(null);
  const nonhowkRef = useRef<HTMLImageElement>(null);
  const balloonRef = useRef(null);

  const { isMobile } = useScreen();

  const [dimension, setDimension] = useState({
    height: 0,
    width: 0,
  });

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

  useEffect(() => {
    setDimension({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  }, []);

  useGSAP(
    () => {
      if (!container.current || !nonhowkRef.current) return;

      const non = nonhowkRef.current;

      gsap.set(non, {
        top: dimension.height,
        right: 0,
      });

      gsap.to(non, {
        top: dimension.height - 200,
      });
      gsap
        .timeline({
          delay: 1,
          onComplete: () => {
            setIsLoading(false);
            document.body.style.overflow = "auto";
          },
        })
        .to(non, {
          top: dimension.height / 3,
          duration: 1,
          ease: "power2.inOut",
        })
        .to(
          non,
          {
            right: dimension.width / 2,
            duration: 1,
            ease: "power2.inOut",
            onComplete: (self) => {
              gsap.to(non, {
                rotateY: 180,
                duration: 0.5,
              });

              // get the x and y position of the nonhowk in the viewport
              const rect = non.getBoundingClientRect() as DOMRect;
              const x = rect.left + rect.width / 3 + (isMobile ? 90 : 120);
              const y = rect.top + rect.height / 3 - (isMobile ? 100 : 180);

              gsap.set(balloonRef.current, {
                top: y,
                left: x,
              });

              gsap.to(balloonRef.current, {
                opacity: 1,
                duration: 0.5,
                delay: 0.5,
              });

              gsap.to(balloonRef.current, {
                opacity: 0,
                duration: 0.5,
                delay: 1.5,
                ease: "power2.inOut",
              });
            },
          },
          "-=0.9",
        )
        .to(non, {
          rotate: 20,
          top: -dimension.height,
          left: dimension.width - 200,
          duration: 1.5,
          delay: 1.5,
          ease: "power4.inOut",
        })

        .to(
          container.current,
          {
            yPercent: -100,
            ease: "power3.inOut",
            duration: 1.5,
          },
          "-=1",
        )
        .to(
          pathRef.current,
          {
            duration: 1.5,
            attr: { d: targetPath },
            ease: "power3.inOut",
          },
          "-=1.1",
        );
    },
    { scope: container, dependencies: [dimension] },
  );

  if (typeof window === "undefined")
    return <div className="fixed inset-0 z-50 min-h-svh bg-black"></div>;

  return (
    <div ref={container} className="fixed inset-0 z-50 min-h-svh bg-black">
      {dimension.width > 0 && (
        <>
          <div
            ref={balloonRef}
            className="absolute z-10 rounded-2xl bg-white p-2 font-body text-xl font-bold opacity-0 md:p-4 md:text-2xl"
          >
            Hi There! 👋🏼
            <div className="absolute left-[-3%] top-[75%] h-0 w-0 rotate-[30deg] transform border-r-[1vh] border-t-[4vh] border-l-transparent border-r-transparent border-t-white md:border-l-[2vh] md:border-r-[2vh] md:border-t-[6vh]"></div>
          </div>
          <div
            ref={nonhowkRef}
            className="absolute z-10 size-[200px] lg:size-[300px]"
          >
            <Image
              className=""
              priority
              src="/images/nonhowk.svg"
              alt="logo"
              width={300}
              height={300}
            />
          </div>
          <svg className="absolute top-0 h-[calc(100%+300px)] w-full">
            <path ref={pathRef} d={initialPath} fill="black" />
          </svg>
        </>
      )}
    </div>
  );
}
