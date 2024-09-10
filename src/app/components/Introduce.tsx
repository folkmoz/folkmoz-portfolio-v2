import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { splitLetters } from "../helpers/splitText";
import { DATA } from "@/data/resume";

export default function Introduce() {
  const container = useRef<HTMLDivElement | null>(null);
  const intro = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      // Text Intro animation
      const textIntroLines = document.querySelectorAll(".line");
      textIntroLines.forEach((line, index) => {
        const letters = line.querySelectorAll("span");

        gsap.to(letters, {
          opacity: 1,
          fontStyle: "normal",
          fontWeight: "700",
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: `top 60%-=${index * 100}`,
            end: `+=${window.innerHeight / 2 - index * 10}`,
            scrub: 1,
          },
        });
      });

      // Scale container animation
      gsap.to(container.current, {
        scale: 1,
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "top 20%",
          scrub: 1,
        },
      });
    },
    {
      scope: container,
    },
  );

  return (
    <section
      id="introduce"
      ref={container}
      style={{ scale: 0.95 }}
      className="relative flex min-h-screen flex-col rounded-t-[2rem] bg-foreground pb-[20vh]"
    >
      <div className="mx-auto w-full px-10 py-16 pt-[300px] md:px-16 lg:px-32">
        <div
          ref={intro}
          className="font-body text-[5vw] text-white xl:text-[80px]"
        >
          {DATA.description.split("\n").map((line, index) => (
            <div key={index} className="line lg:-mb-4">
              {splitLetters(line, "opacity-20 ")}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
