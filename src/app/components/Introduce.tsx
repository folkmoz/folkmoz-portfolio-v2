import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { splitLetters } from "../helpers/splitText";
import { DATA } from "@/data/resume";
import useScreen from "@/app/hooks/useScreen";

export default function Introduce() {
  const container = useRef<HTMLDivElement | null>(null);
  const intro = useRef<HTMLDivElement | null>(null);

  const { isMobile } = useScreen();

  useGSAP(
    () => {
      // Text Intro animation
      const textIntroLines = document.querySelectorAll(".line");
      textIntroLines.forEach((line, index) => {
        const letters = line.querySelectorAll("span");

        gsap.to(letters, {
          autoAlpha: 1,
          opacity: 1,
          fontStyle: "normal",
          fontWeight: "700",
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: isMobile ? "top 80%" : `top 60%-=${index * 100}`,
            end: `+=${window.innerHeight / 2 - index * 10}`,
            scrub: 1,
          },
        });
      });

      // Scale container animation
      if (!isMobile) {
        gsap.to(container.current, {
          scale: 1,
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom",
            end: "top 30%",
            scrub: 1,
          },
        });
      }
    },
    {
      scope: container,
      dependencies: [isMobile],
    },
  );

  return (
    <section
      id="introduce"
      ref={container}
      className="relative -mb-1 flex h-[50svh] flex-col rounded-t-[1rem] bg-foreground md:min-h-screen md:pb-[20vh] lg:scale-[0.95] lg:rounded-t-[2rem]"
    >
      <div className="mx-auto w-full px-4 py-16 pt-[200px] md:px-16 md:pt-[300px] lg:px-32">
        <div
          ref={intro}
          className="font-body text-3xl text-white md:text-6xl lg:text-7xl xl:text-[80px]"
        >
          {DATA.description.split("\n").map((line, index) => (
            <div key={index} className="line lg:mb-2 xl:mb-4">
              {splitLetters(line, "opacity-20 ")}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
