"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Preloader({
  setIsLoading,
}: {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const container = useRef(null);
  const pathRef = useRef(null);
  const nonhowkRef = useRef<HTMLImageElement>(null);
  const balloonRef = useRef(null);

  const [dimension, setDimension] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

  useEffect(() => {
    const handleResize = () => {
      setDimension({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useGSAP(
    () => {
      if (!container.current || !nonhowkRef.current) return;

      const isMobile = dimension.width < 768;

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
          onComplete: () => setIsLoading(false),
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
              const x = rect.left + rect.width / 3 + 120;
              const y = rect.top + rect.height / 3 - 180;

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

  return (
    <div ref={container} className="fixed inset-0 z-50 min-h-screen bg-black">
      {dimension.width > 0 && (
        <>
          <div
            ref={balloonRef}
            className="absolute z-10 rounded-2xl bg-white p-4 font-body text-2xl font-bold opacity-0"
          >
            Hi There! 👋🏼
            <div className="absolute left-[-3%] top-[75%] h-0 w-0 rotate-[30deg] transform border-l-[2vh] border-r-[2vh] border-t-[6vh] border-l-transparent border-r-transparent border-t-white"></div>
          </div>
          <Image
            ref={nonhowkRef}
            className="absolute z-10"
            priority
            src="/images/nonhowk.svg"
            alt="logo"
            width={300}
            height={300}
          />
          <svg className="absolute top-0 h-[calc(100%+300px)] w-full">
            <path ref={pathRef} d={initialPath} fill="black" />
          </svg>
        </>
      )}
    </div>
  );
}
