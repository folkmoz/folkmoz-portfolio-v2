import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { splitLetters } from "../helpers/splitText";
import { DATA } from "@/data/resume";
import AnimatedButton from "./AnimatedButton";

export default function Introduce() {
  const container = useRef(null);
  const intro = useRef(null);

  useGSAP(
    () => {
      gsap.to(container.current, {
        scale: 1,
        borderTopLeftRadius: "0",
        borderTopRightRadius: "0",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "top 20%",
          scrub: 1,
        },
      });

      const lines = document.querySelectorAll(".line");

      lines.forEach((line, index) => {
        const letters = line.querySelectorAll("span");

        gsap.to(letters, {
          opacity: 1,
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
      <div className="mx-auto mt-[300px] w-full px-10 py-16 md:px-16 lg:px-32">
        <div
          ref={intro}
          className="font-body text-[5vw] font-bold text-white xl:text-[80px]"
        >
          {DATA.description.split("\n").map((line, index) => (
            <div key={index} className="line lg:-mb-4">
              {splitLetters(line, "opacity-20")}
            </div>
          ))}
        </div>

        <div className="relative mb-12 mt-20 flex justify-end text-white lg:mb-20 lg:mt-48">
          <div className="font-body text-2xl font-bold italic text-white/80 xl:text-5xl">
            about me
          </div>
          <div className="absolute -bottom-4 left-0 h-1 w-full bg-white/60"></div>
        </div>

        <div className="flex w-full grid-cols-3 justify-end">
          <div className="col-span-full ml-20 flex flex-col justify-center text-[5vw] italic text-white/40 md:col-start-2 md:grid-cols-1 md:text-3xl lg:ml-20 lg:space-y-4 lg:text-4xl xl:ml-[16rem] xl:text-5xl">
            <p>
              I&apos;m <span className="text-[#D98841]">Folk</span>, from
              Thailand
            </p>
            <p>currently 22 years old,</p>
            <p>coffee addict, and — </p>
            <p>I&apos;m fine thank you sit down</p>
            <div className="pt-8">
              <AnimatedButton href="/#projects" text="Get in Touch" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
