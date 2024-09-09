"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useEffect } from "react";

export default function Hero({ isFinishLoading = false }) {
  const container = useRef(null);
  const scrollIndicator = useRef(null);
  const textPath1 = useRef(null);
  const textPath2 = useRef(null);
  const textPath3 = useRef(null);

  useGSAP(
    () => {
      gsap.to([textPath1.current, textPath3.current], {
        attr: {
          x: -900,
        },
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(textPath2.current, {
        attr: {
          x: 900,
        },
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Hero animation
      // gsap
      //   .timeline({
      // delay: 4.2,
      //   })
      //   .to(textPath.current, {
      //     attr: {
      //       x: 100,
      //     },
      //     duration: 3,
      //     ease: "power3.inOut",
      //     onComplete: () => {
      //       gsap.to(textPath.current, {
      //         attr: {
      //           x: -900,
      //         },
      //         ease: "power3.inOut",
      //         scrollTrigger: {
      //           trigger: container.current,
      //           start: "top top",
      //           end: "bottom top",
      //           scrub: true,
      //         },
      //       });
      //     },
      //   });
      // Scroll indicator
    },
    {
      //   scope: container,
    },
  );

  return (
    <>
      <section
        id="hero"
        ref={container}
        className="sticky top-0 grid min-h-screen place-items-center bg-[#f5f8fa] text-white"
      >
        <svg
          viewBox="0 0 425 300"
          className="absolute top-[30vh] lg:top-[50px]"
        >
          <path
            id="curve"
            fill="none"
            d="M6,150C49.63,93,105.79,36.65,156.2,47.55,207.89,58.74,213,131.91,264,150c40.67,14.43,108.57-6.91,229-145"
          />
          <text ref={textPath1} x="-100" className="text-5xl lg:text-3xl">
            <textPath xlinkHref="#curve" className="fill-red-800 font-heading">
              FOLKMOZ — FOLKMOZ — FOLKMOZ — FOLKMOZ — FOLKMOZ — FOLKMOZ —
            </textPath>
          </text>
        </svg>

        <svg
          viewBox="0 0 425 300"
          className="absolute -left-14 top-[30vh] lg:top-[150px]"
        >
          <path
            id="curve2"
            fill="none"
            d="M6,150C49.63,93,105.79,36.65,156.2,47.55,207.89,58.74,213,131.91,264,150c40.67,14.43,108.57-6.91,229-145"
          />
          <text ref={textPath2} x="-400" className="text-5xl lg:text-3xl">
            <textPath
              xlinkHref="#curve2"
              className="fill-[#217396] font-heading"
            >
              FOLKMOZ — FOLKMOZ — FOLKMOZ — FOLKMOZ — FOLKMOZ — FOLKMOZ —
            </textPath>
          </text>
        </svg>

        <svg
          viewBox="0 0 425 300"
          className="absolute -left-40 top-[30vh] lg:top-[200px]"
        >
          <path
            id="curve2"
            fill="none"
            d="M6,150C49.63,93,105.79,36.65,156.2,47.55,207.89,58.74,213,131.91,264,150c40.67,14.43,108.57-6.91,229-145"
          />
          <text ref={textPath3} x="100" className="text-5xl lg:text-3xl">
            <textPath xlinkHref="#curve2" className="fill-[#444] font-heading">
              FOLKMOZ — FOLKMOZ — FOLKMOZ — FOLKMOZ — FOLKMOZ — FOLKMOZ —
            </textPath>
          </text>
        </svg>

        {/* <div>
          <div className="flex flex-col items-center text-black">
            <div className="-mt-4 w-full font-body">
              <div className="text-center text-4xl font-bold lg:space-y-20 lg:text-[8vw] xl:space-y-10 xl:text-9xl">
                <div className="block">
                  Curious{" "}
                  <span className="text-[#8C2029] underline decoration-wavy">
                    developer
                  </span>
                </div>
                <div className="block">
                  <span className="text-[#504bf3]">Designer</span> wannabe
                </div>

                <div className="block">
                  <span className="text-[#D98841]">Artist</span> at heart
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* Scroll indicator */}
        <div
          ref={scrollIndicator}
          className="absolute -bottom-20 left-1/2 flex -translate-x-1/2 transform flex-col items-center font-body text-black"
        >
          <ScrollIndicator />
        </div>
      </section>
    </>
  );
}
const ScrollIndicator = () => {
  const svgRef = useRef(null);

  useGSAP(
    () => {
      gsap.to(svgRef.current, {
        rotation: 360,
        repeat: -1,
        duration: 10,
        ease: "linear",
        transformOrigin: "center center",
      });
    },
    { scope: svgRef },
  );

  return (
    <svg
      ref={svgRef}
      width="200"
      height="200"
      viewBox="0 0 200 200"
      className="relative overflow-visible"
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
      <text className="font-body text-black">
        <textPath href="#circlePath" className="fill-current">
          SCROLL SCROLL SCROLL SCROLL SCROLL SCROLL SCROLL SCROLL
        </textPath>
      </text>
    </svg>
  );
};
